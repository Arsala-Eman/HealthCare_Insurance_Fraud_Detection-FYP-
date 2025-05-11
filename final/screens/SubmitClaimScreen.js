import React, { useState } from 'react';
import { View, TextInput, Button, Alert, ScrollView, StyleSheet, Text, Image } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';

export default function SubmitClaimScreen() {
  const [formData, setFormData] = useState({
    patientName: '',
    fatherName: '',
    policyNo: '',
    beneId: '',
    provider: '',
    inscClaimAmtReimbursed: '',
    attendingPhysician: '',
    otherPhysician: '',
    admissionDt: '',
    doctorName: '',
    deductibleAmtPaid: '',
    dischargeDt: '',
    Cause: '',
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [imageData, setImageData] = useState({
    prescriptionImage: '',
    billImage: '',
    admissionSlipImage: '',
    dischargeSlipImage: '',
  });

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
      case 'attendingPhysician':
      case 'otherPhysician':
        if (!/^PHY\d{6}$/.test(value)) {
          isValid = false;
          errorMessage = 'Format: PHY390922';
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
      default:
        break;
    }

    setFormData((prev) => ({ ...prev, [key]: value }));
    setValidationErrors((prev) => ({ ...prev, [key]: isValid ? null : errorMessage }));
  };

  const handleImageUpload = async (key) => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: true,
      quality: 0.5,
    });

    if (result.assets && result.assets.length > 0) {
      const base64 = result.assets[0].base64;
      setImageData((prev) => ({ ...prev, [key]: base64 }));
    }
  };

  const handleSubmit = async () => {
    const mandatoryFields = [
      'patientName',
      'fatherName',
      'policyNo',
      'beneId',
      'provider',
      'inscClaimAmtReimbursed',
      'attendingPhysician',
      'admissionDt',
      'doctorName',
      'deductibleAmtPaid',
      'dischargeDt',
    ];

    const errors = {};
    mandatoryFields.forEach((field) => {
      if (!formData[field]?.trim() || validationErrors[field]) {
        errors[field] = validationErrors[field] || 'This field is required.';
      }
    });

    const imageFields = ['prescriptionImage', 'billImage', 'admissionSlipImage', 'dischargeSlipImage'];
    imageFields.forEach((field) => {
      if (!imageData[field]) {
        errors[field] = 'This image is required.';
      }
    });

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      Alert.alert('Validation Error', 'Please correct the errors in the form.');
      return;
    }

    const token = await AsyncStorage.getItem('token');
    const userData = await AsyncStorage.getItem('user');

    if (!userData) {
      alert('Error', 'User data not found. Please log in again.');
      return;
    }

    const user = JSON.parse(userData);
    if (!user || !user.username) {
      alert('Error', 'User information is incomplete. Please log in again.');
      return;
    }

    try {
      const hospitalUsername = user.username;

      const response = await fetch('http://172.29.176.1:5000/submit-claim', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          ...imageData,
          hospitalUsername,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        alert('Success', 'Claim submitted successfully!');
        setFormData({
          patientName: '',
          fatherName: '',
          policyNo: '',
          beneId: '',
          provider: '',
          inscClaimAmtReimbursed: '',
          attendingPhysician: '',
          otherPhysician: '',
          admissionDt: '',
          doctorName: '',
          deductibleAmtPaid: '',
          dischargeDt: '',
          Cause: '',
        });
        setImageData({
          prescriptionImage: '',
          billImage: '',
          admissionSlipImage: '',
          dischargeSlipImage: '',
        });
        setValidationErrors({});
      } else {
        alert('Error', result.error || 'Failed to submit claim.');
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Error', error.message || 'Network error.');
    }
  };

  const fields = [
    { label: 'Patient name:', key: 'patientName', placeholder: 'Enter Your Name' },
    { label: 'Father name:', key: 'fatherName', placeholder: 'Enter Your Father Name' },
    { label: 'Policy no:', key: 'policyNo', placeholder: 'Enter Your Policy Number e.g POL123456789' },
    { label: 'Beneficiary ID:', key: 'beneId', placeholder: 'An identifier for the beneficiary of the insurance policy e.g BENE11001' },
    { label: 'Medical Provider:', key: 'provider', placeholder: 'e.g PRV55912' },
    { label: 'Insurance Claim Amount Reimbursed:', key: 'inscClaimAmtReimbursed', placeholder: 'The amount reimbursed by the insurance company for the medical claim.' },
    { label: 'Attending Physician:', key: 'attendingPhysician', placeholder: 'The physician who attended to the patient e.g PHY390922' },
    { label: 'Other Physician:', key: 'otherPhysician', placeholder: 'If other physician was involved in the treatment of the patient e.g PHY390923' },
    { label: 'Admission Date:', key: 'admissionDt', placeholder: 'month/date/Year' },
    { label: 'Doctor Name:', key: 'doctorName', placeholder: 'Enter your Doctor name' },
    { label: 'Deductible Amount Paid:', key: 'deductibleAmtPaid', placeholder: 'The amount the patient must pay out-of-pocket before insurance coverage begins.' },
    { label: 'Discharge Date:', key: 'dischargeDt', placeholder: 'Month/Date/Year' },
    { label: 'Cause', key: 'Cause', placeholder: 'please Enter the Cause' },
  ];

  return (
    <View style={styles.screen}>
      <Header title="Submit a Claim" />
      <ScrollView contentContainerStyle={styles.container}>
        {fields.map((field) => (
          <View key={field.key}>
            <Text style={styles.label}>{field.label}</Text>
            <TextInput
              placeholder={field.placeholder}
              value={formData[field.key]}
              onChangeText={(text) => handleInputChange(field.key, text)}
              style={[
                styles.input,
                validationErrors[field.key] ? { borderColor: 'red' } : null,
              ]}
            />
            {validationErrors[field.key] && (
              <Text style={styles.errorText}>{validationErrors[field.key]}</Text>
            )}
          </View>
        ))}

        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20 }}>Upload Required Images</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {[
            { key: 'prescriptionImage', label: 'Doctor Prescription' },
            { key: 'billImage', label: 'Bill' },
            { key: 'admissionSlipImage', label: 'Admission Slip' },
            { key: 'dischargeSlipImage', label: 'Discharge Slip' },
          ].map(({ key, label }) => (
            <View key={key} style={{ width: '48%', marginVertical: 10 }}>
              <Button title={label} onPress={() => handleImageUpload(key)} color="#7AE1DB" />
              {imageData[key] && (
                <Image
                  source={{ uri: `data:image/jpeg;base64,${imageData[key]}` }}
                  style={{ width: '100%', height: 100, marginTop: 10, borderRadius: 8 }}
                  resizeMode="contain"
                />
              )}
              {validationErrors[key] && (
                <Text style={{ color: 'red', marginTop: 5 }}>{validationErrors[key]}</Text>
              )}
            </View>
          ))}
        </View>

        <Button title="Submit Claim" onPress={handleSubmit} color="#0077b6" />
      </ScrollView>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#e0f7fa',
  },
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    marginVertical: 10,
    padding: 10,
    borderColor: '#0077b6',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    color: '#000',
    flex: 1,
    marginRight: 8,
  },
  errorText: {
    color: 'red',
    marginTop: -8,
    marginBottom: 8,
    marginLeft: 5,
  },
});
