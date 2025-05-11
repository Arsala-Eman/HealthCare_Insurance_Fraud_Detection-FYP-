import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, Alert, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const ClaimDetails = ({ route }) => {
  const navigation = useNavigation();
  const { claim } = route.params || {};

  const [prediction, setPrediction] = useState(claim?.prediction || null);

  useEffect(() => {
    console.log('Received Claim Data:', claim);
  }, [claim]);

  if (!claim) {
    return (
      <View style={styles.container}> 
        <Text style={styles.errorText}>No claim data available.</Text>
      </View>
    );
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const [month, day, year] = dateStr.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  };

  const checkFraud = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const isoAdmissionDt = formatDate(claim.admissionDt);
      const isoDischargeDt = formatDate(claim.dischargeDt);

      const response = await axios.post(
        'http://localhost:5000/check-fraud',
        {
          features: {
            BeneID: claim.beneId || '',
            ClaimID: claim.claimId || '',
            Provider: claim.provider || '',
            InscClaimAmtReimbursed: Number(claim.inscClaimAmtReimbursed) || 0,
            AttendingPhysician: claim.attendingPhysician || '',
            OperatingPhysician: claim.doctorName || '',
            OtherPhysician: claim.otherPhysician || '',
            DeductibleAmtPaid: Number(claim.deductibleAmtPaid) || 0,
            AdmissionDt: isoAdmissionDt,
            DischargeDt: isoDischargeDt,
          
          },
          claimId: claim.claimId,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const result = response.data.prediction;
      setPrediction(result);

      alert(
        'Fraud Check Result',
        result === 'Fraudulent'
          ? 'Potential fraud detected. This claim requires further investigation.'
          : 'No fraud detected. Claim approved for processing.'
      );
    } catch (error) {
      console.error('Error checking fraud:', error);
      alert('Error', 'Failed to check fraud status. Please try again later.');
    }
  };

  return (
    <SafeAreaView style={styles.pageContainer}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Claim Details</Text>
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeading}>Patient Information</Text>
          <Text style={styles.detail}>Patient Name: {claim.patientName || 'N/A'}</Text>
          <Text style={styles.detail}>Father Name: {claim.fatherName || 'N/A'}</Text>
        </View>

        <View style={styles.sectionCardBlue}>
          <Text style={styles.sectionHeading}>Policy Details</Text>
          <Text style={styles.detail}>Policy No: {claim.policyNo || 'N/A'}</Text>
          <Text style={styles.detail}>Claim No: {claim.claimId || 'N/A'}</Text>
          <Text style={styles.detail}>Provider: {claim.provider || 'N/A'}</Text>
        </View>

        <View style={styles.sectionCardGreen}>
          <Text style={styles.sectionHeading}>Admission Details</Text>
          <Text style={styles.detail}>Admission Date: {claim.admissionDt || 'N/A'}</Text>
          <Text style={styles.detail}>Discharge Date: {claim.dischargeDt || 'N/A'}</Text>
          <Text style={styles.detail}>Cause: {claim.Cause || 'N/A'}</Text>
        </View>

        <View style={styles.sectionCardYellow}>
          <Text style={styles.sectionHeading}>Financial Details</Text>
          <Text style={styles.detail}>Reimbursed Amount: {claim.inscClaimAmtReimbursed || 'N/A'}</Text>
          <Text style={styles.detail}>Deductible Amount Paid: {claim.deductibleAmtPaid || 'N/A'}</Text>
          <Text style={styles.detail}>Attending Physician: {claim.attendingPhysician || 'N/A'}</Text>
          <Text style={styles.detail}>Hospital Name: {claim.hospitalName || 'N/A'}</Text>

        </View>

        <Text style={styles.imageSectionTitle}>Uploaded Documents</Text>

        <View style={styles.imageSection}>
          {[{ label: 'Doctor Prescription', key: 'prescriptionImage' }, { label: 'Bill', key: 'billImage' }, { label: 'Admission Slip', key: 'admissionSlipImage' }, { label: 'Discharge Slip', key: 'dischargeSlipImage' }].map(({ label, key }) => (
            <View key={key} style={styles.imageContainer}>
              <Text style={styles.imageLabel}>{label}</Text>
              <TouchableOpacity onPress={() => navigation.navigate('ImageViewScreen', { imageBase64: claim[key], title: label })}>
                <Image source={{ uri: `data:image/jpeg;base64,${claim[key]}` }} style={styles.image} />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Check Fraud Status" onPress={checkFraud} color="#3498db" />
        </View>

        {prediction && (
          <View style={styles.statusContainer}>
            <Text style={[styles.statusText, prediction === 'Fraudulent' ? styles.fraud : styles.legit]}>
              {prediction}
            </Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Powered by Your Insurance App</Text>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pageContainer: { flex: 1, backgroundColor: '#eef7ff' },
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 20 },
  header: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#003566', padding: 16 },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginLeft: 12 },
  sectionCard: { backgroundColor: '#ffffff', borderRadius: 10, padding: 15, marginBottom: 15, elevation: 2 },
  sectionCardBlue: { backgroundColor: '#d0ebff', borderRadius: 10, padding: 15, marginBottom: 15, elevation: 2 },
  sectionCardGreen: { backgroundColor: '#d3f9d8', borderRadius: 10, padding: 15, marginBottom: 15, elevation: 2 },
  sectionCardYellow: { backgroundColor: '#fff3bf', borderRadius: 10, padding: 15, marginBottom: 15, elevation: 2 },
  sectionHeading: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#2c3e50' },
  detail: { fontSize: 16, color: '#34495e', marginBottom: 6 },
  imageSectionTitle: { fontSize: 22, fontWeight: 'bold', color: '#2c3e50', marginBottom: 10 },
  imageSection: { backgroundColor: '#ffffff', padding: 15, borderRadius: 10, marginBottom: 15 },
  imageContainer: { marginBottom: 15 },
  imageLabel: { fontSize: 16, fontWeight: '600', marginBottom: 5 },
  image: { width: '100%', height: 200, borderRadius: 8, resizeMode: 'contain' },
  buttonContainer: { marginVertical: 20 },
  statusContainer: { alignItems: 'center', marginTop: 20 },
  statusText: { fontSize: 20, fontWeight: 'bold', padding: 10, borderRadius: 5, width: '70%', textAlign: 'center' },
  fraud: { backgroundColor: '#e74c3c', color: '#fff' },
  legit: { backgroundColor: '#2ecc71', color: '#fff' },
  footer: { backgroundColor: '#2c3e50', padding: 15, alignItems: 'center' },
  footerText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  errorText: { fontSize: 18, color: '#e74c3c', textAlign: 'center', marginTop: 20 },
});

export default ClaimDetails;