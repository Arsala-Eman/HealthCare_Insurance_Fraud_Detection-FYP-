import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';

const formFields = [
  { label: 'Patient Name', key: 'patientName', icon: 'person-outline', placeholder: 'Enter patient name' },
  { label: 'Father Name', key: 'fatherName', icon: 'man-outline', placeholder: 'Enter father name' },
  { label: 'Policy No.', key: 'policyNo', icon: 'document-text-outline', placeholder: 'POL123456789' },
  { label: 'Beneficiary ID', key: 'beneId', icon: 'id-card-outline', placeholder: 'BENE11001' },
  { label: 'Provider', key: 'provider', icon: 'medkit-outline', placeholder: 'PRV55912' },
  { label: 'Claim Amount', key: 'inscClaimAmtReimbursed', icon: 'cash-outline', placeholder: 'Enter amount' },
  { label: 'Attending Physician', key: 'attendingPhysician', icon: 'person-circle-outline', placeholder: 'PHY390922' },
  { label: 'Other Physician', key: 'otherPhysician', icon: 'person-outline', placeholder: 'Optional' },
  { label: 'Admission Date', key: 'admissionDt', icon: 'calendar-outline', placeholder: 'MM/DD/YYYY' },
  { label: 'Doctor Name', key: 'doctorName', icon: 'medkit-outline', placeholder: 'Enter doctor name' },
  { label: 'Hospital Name', key: 'hospitalName', icon: 'business-outline', placeholder: 'Enter hospital name' },
  { label: 'Deductible Paid', key: 'deductibleAmtPaid', icon: 'wallet-outline', placeholder: 'Enter amount' },
  { label: 'Discharge Date', key: 'dischargeDt', icon: 'calendar-outline', placeholder: 'MM/DD/YYYY' },
  { label: 'Cause', key: 'Cause', icon: 'alert-circle-outline', placeholder: 'Enter cause' },
];

const imageFields = [
  { label: 'Doctor Prescription', key: 'prescriptionImage' },
  { label: 'Bill', key: 'billImage' },
  { label: 'Admission Slip', key: 'admissionSlipImage' },
  { label: 'Discharge Slip', key: 'dischargeSlipImage' },
];

const MainContainer = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({});
  const [validationErrors, setValidationErrors] = useState({});

  const handleInputChange = (key, value) => {
    let isValid = true;
    let errorMessage = '';

    switch (key) {
      case 'patientName':
      case 'fatherName':
      case 'doctorName':
        if (!/^[A-Za-z\s]+$/.test(value)) {
          isValid = false;
          errorMessage = 'Only letters are allowed.';
        }
        break;
      case 'policyNo':
        if (!/^POL\d{9}$/.test(value)) {
          isValid = false;
          errorMessage = 'Format: POL123456789';
        }
        break;
      case 'beneId':
        if (!/^BENE\d{5}$/.test(value)) {
          isValid = false;
          errorMessage = 'Format: BENE11001';
        }
        break;
      case 'provider':
        if (!/^PRV\d{5}$/.test(value)) {
          isValid = false;
          errorMessage = 'Format: PRV55912';
        }
        break;
      case 'inscClaimAmtReimbursed':
      case 'deductibleAmtPaid':
        if (!/^\d+$/.test(value)) {
          isValid = false;
          errorMessage = 'Only digits are allowed.';
        }
        break;
      case 'admissionDt':
      case 'dischargeDt':
        if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
          isValid = false;
          errorMessage = 'Format: MM/DD/YYYY';
        } else {
          const [month, day, year] = value.split('/');
          const date = new Date(`${year}-${month}-${day}`);
          if (isNaN(date.getTime())) {
            isValid = false;
            errorMessage = 'Invalid date.';
          }
        }
        break;
        case 'hospitalName':
  if (!/^[A-Za-z\s]+$/.test(value)) {
    isValid = false;
    errorMessage = 'Only letters are allowed.';
  }
  break;
      default:
        break;
    }

    setFormData(prev => ({ ...prev, [key]: value }));
    setValidationErrors(prev => ({ ...prev, [key]: isValid ? null : errorMessage }));
  };

  const handleImageUpload = async (key) => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: true,
      quality: 0.5,
    });

    if (result.assets && result.assets.length > 0) {
      const base64 = result.assets[0].base64;
      setFormData(prev => ({ ...prev, [key]: base64 }));
    }
  };

  const handleSubmit = async () => {
    const requiredKeys = formFields
      .filter(f => f.key !== 'otherPhysician') 
      .map(f => f.key)
      .concat(imageFields.map(i => i.key));
    const errors = {};

    requiredKeys.forEach((key) => {
      if (!formData[key]) {
        errors[key] = 'This field is required';
      }
    });

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      alert('Please fill all required fields.');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      const storedPolicyNo = await AsyncStorage.getItem('policyNo');
      if (!storedPolicyNo) {
        alert('Session error. Please login again.');
        return;
      }
  
      if (formData.policyNo !== storedPolicyNo) {
        alert('Policy No. mismatch! You are not allowed to submit claim under a different policy.');
        return;
      }
      const response = await fetch('http://172.29.176.1:5000/submit-claim', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      if (response.ok) {
        alert('Form submitted successfully!');
        navigation.navigate('Sidebar');
      } else {
        alert(result.error || 'Submission failed');
      }
    } catch (error) {
      alert('Error submitting form');
    }
  };

  const navigateToSidebar = () => {
    navigation.navigate('Sidebar');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={navigateToSidebar} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Health Insurance Claim</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Inpatient Claim Form</Text>

        {formFields.map(({ label, key, placeholder, icon }) => (
          <View key={key} style={styles.inputContainer}>
            <Icon name={icon} size={20} color="#666" style={styles.icon} />
            <View style={styles.fieldWrapper}>
              <Text style={styles.label}>{label}</Text>
              <TextInput
                style={[styles.input, validationErrors[key] && styles.inputError]}
                placeholder={placeholder}
                value={formData[key] || ''}
                onChangeText={val => handleInputChange(key, val)}
                placeholderTextColor="#999"
              />
              {validationErrors[key] && <Text style={styles.error}>{validationErrors[key]}</Text>}
            </View>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Upload Required Images</Text>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {[
            { key: 'prescriptionImage', label: 'Doctor Prescription' },
            { key: 'billImage', label: 'Bill' },
            { key: 'admissionSlipImage', label: 'Admission Slip' },
            { key: 'dischargeSlipImage', label: 'Discharge Slip' },
          ].map(({ key, label }) => (
            <View key={key} style={{ width: '48%', marginVertical: 10 }}>
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={() => handleImageUpload(key)}
              >
                <Text style={styles.uploadText}>Upload {label}</Text>
              </TouchableOpacity>
              {formData[key] && (
                <Image
                  source={{ uri: `data:image/jpeg;base64,${formData[key]}` }}
                  style={styles.preview}
                />
              )}
              {validationErrors[key] && (
                <Text style={{ color: 'red', marginTop: 5 }}>{validationErrors[key]}</Text>
              )}
            </View>
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.backToSidebarButton]} onPress={navigateToSidebar}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.submitButton]} onPress={handleSubmit}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 Health Insurance Inc.</Text>
      </View>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f9' },
  header: {
    backgroundColor: '#B23B3B',
    padding: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    flexDirection: 'row',
  },
  backButton: {
    marginRight: 10,
  },
  headerText: { fontSize: 24, fontWeight: 'bold', color: '#fff', flex: 1, textAlign: 'center' },
  scroll: { padding: 20, paddingBottom: 40 },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#222',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  icon: { marginRight: 10, marginTop: 5 },
  fieldWrapper: { flex: 1 },
  label: { fontSize: 18, color: '#444', marginBottom: 4, fontWeight: 'bold' },
  input: {
    fontSize: 16,
    padding: 8,
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    backgroundColor: '#fff',
  },
  inputError: { borderColor: '#f00' },
  error: { fontSize: 12, color: '#f00', marginTop: 4 },
  sectionTitle: {
    fontSize: 25,
    fontWeight: '600',
    marginTop: 30,
    marginBottom: 10,
    color: '#333',
    fontWeight: 'bold',
  },
  uploadButton: {
    backgroundColor: '#7AE1DB',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 5,
  },
  uploadText: { color: '#fff', fontWeight: 'bold' },
  preview: {
    marginTop: 10,
    width: width * 0.6,
    height: 120,
    borderRadius: 8,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    borderRadius: 30,
    paddingVertical: 20,
    alignItems: 'center',
    minWidth: '40%',
  },
  submitButton: {
    backgroundColor: '#8BD8A5',
  },
  backToSidebarButton: {
    backgroundColor: '#8BD8A5',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    backgroundColor: '#B23B3B',
    padding: 10,
    alignItems: 'center',
    marginTop: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  footerText: { color: '#fff', fontSize: 12 },
});

export default MainContainer;
