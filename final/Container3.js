import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet, Modal,
  TextInput, ActivityIndicator, LayoutAnimation, Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';


const UserClaimManagement = () => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedClaimId, setExpandedClaimId] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState(null);
  const navigation = useNavigation();


  const BASE_URL = 'http://localhost:5000'; 

  useEffect(() => {
    fetchUserClaims();
  }, []);

  const fetchUserClaims = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.warn('No token found');
        return;
      }

      const response = await fetch(`${BASE_URL}/get-my-claims`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server response not OK:', errorText);
        return;
      }

      const data = await response.json();
      setClaims(data.claims || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching claims:', error);
    }
  };

  const toggleExpansion = (claimId) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedClaimId(expandedClaimId === claimId ? null : claimId);
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `${BASE_URL}/update-claim/${selectedClaim._id}`,
        selectedClaim
      );
      alert('Success', 'Claim updated successfully');
      setEditModalVisible(false);
      fetchUserClaims();
    } catch (error) {
      console.error('Error updating claim:', error);
      alert('Error', 'Failed to update claim');
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => toggleExpansion(item._id)}
    >
      <View style={styles.mainInfo}>
        <Icon name="assignment" size={24} color="#fff" style={styles.icon} />
        <View style={styles.info}>
          <Text style={styles.title}>Claim: {item.claimId}</Text>
          <Text style={styles.subtitle}>Policy No: {item.policyNo}</Text>
          <Text style={styles.subtitle}>Submitted: {new Date(item.submissionDate).toLocaleDateString()}</Text>
        </View>
        <Icon
          name={expandedClaimId === item._id ? 'expand-less' : 'expand-more'}
          size={24}
          color="#95a5a6"
        />
      </View>

      {expandedClaimId === item._id && (
        <View style={styles.detailsSection}>
          <Text style={styles.label}>Patient Name: {item.patientName}</Text>
          <Text style={styles.label}>Father Name: {item.fatherName}</Text>
          <Text style={styles.label}>Policy No: {item.policyNo}</Text>
          <Text style={styles.label}>Beneficiary ID: {item.beneId}</Text>
          <Text style={styles.label}>Provider: {item.provider}</Text>
          <Text style={styles.label}>Reimbursed Amount: {item.inscClaimAmtReimbursed}</Text>
          <Text style={styles.label}>Attending Physician: {item.attendingPhysician}</Text>
          <Text style={styles.label}>Other Physician: {item.otherPhysician}</Text>
          <Text style={styles.label}>Admission Date: {item.admissionDt}</Text>
          <Text style={styles.label}>Discharge Date: {item.dischargeDt}</Text>
          <Text style={styles.label}>Doctor Name: {item.doctorName}</Text>
          <Text style={styles.label}>Deductible Paid: {item.deductibleAmtPaid}</Text>
          <Text style={styles.label}>Cause: {item.Cause}</Text>
           <Text style={styles.label}>Hospital Name: {item.hospitalName}</Text>
          <Text style={styles.label}>Claim ID: {item.claimId}</Text>
          <Text style={styles.label}>Submitted: {new Date(item.submissionDate).toLocaleDateString()}</Text>

          <TouchableOpacity
            style={[styles.button, styles.editButton]}
            onPress={() => {
              setSelectedClaim(item);
              setEditModalVisible(true);
            }}
          >
            <Icon name="edit" size={18} color="#fff" />
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Claims</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#3498db" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={claims}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 80 }} // leave space for footer
        />
      )}

  
      <View style={styles.footer}>
  <TouchableOpacity
    style={styles.footerButton}
    onPress={() => navigation.navigate('Sidebar')}
  >
    <Icon name="home" size={20} color="#fff" />
    <Text style={styles.footerButtonText}>Home</Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.footerButton}
    onPress={async () => {
      await AsyncStorage.removeItem('token');
      navigation.navigate('Login');
    }}
  >
    <Icon name="logout" size={20} color="#fff" />
    <Text style={styles.footerButtonText}>Logout</Text>
  </TouchableOpacity>
</View>

      {/* Modal for Editing */}
      <Modal visible={editModalVisible} animationType="slide" transparent>
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Update Claim</Text>

            <TextInput
              placeholder="Patient Name"
              value={selectedClaim?.patientName}
              onChangeText={(text) => setSelectedClaim({ ...selectedClaim, patientName: text })}
              style={styles.input}
            />
            {/* (other TextInputs same as before) */}
            <TextInput
              placeholder="Father Name"
              value={selectedClaim?.fatherName}
              onChangeText={(text) => setSelectedClaim({ ...selectedClaim, fatherName: text })}
              style={styles.input}
            />
            {/* (Repeat for all fields as before...) */}
            <TextInput
              placeholder="Policy No"
              value={selectedClaim?.policyNo}
              onChangeText={(text) => setSelectedClaim({ ...selectedClaim, policyNo: text })}
              style={styles.input}
            />
            <TextInput
              placeholder="Beneficiary ID"
              value={selectedClaim?.beneId}
              onChangeText={(text) => setSelectedClaim({ ...selectedClaim, beneId: text })}
              style={styles.input}
            />
            <TextInput
              placeholder="Provider"
              value={selectedClaim?.provider}
              onChangeText={(text) => setSelectedClaim({ ...selectedClaim, provider: text })}
              style={styles.input}
            />
            <TextInput
              placeholder="Reimbursed Amount"
              keyboardType="numeric"
              value={selectedClaim?.inscClaimAmtReimbursed?.toString()}
              onChangeText={(text) =>
                setSelectedClaim({ ...selectedClaim, inscClaimAmtReimbursed: parseFloat(text) || 0 })
              }
              style={styles.input}
            />
            <TextInput
              placeholder="Attending Physician"
              value={selectedClaim?.attendingPhysician}
              onChangeText={(text) => setSelectedClaim({ ...selectedClaim, attendingPhysician: text })}
              style={styles.input}
            />
            <TextInput
              placeholder="Other Physician"
              value={selectedClaim?.otherPhysician}
              onChangeText={(text) => setSelectedClaim({ ...selectedClaim, otherPhysician: text })}
              style={styles.input}
            />
            <TextInput
              placeholder="Admission Date (MM/DD/YYYY)"
              value={selectedClaim?.admissionDt}
              onChangeText={(text) => setSelectedClaim({ ...selectedClaim, admissionDt: text })}
              style={styles.input}
            />
            <TextInput
              placeholder="Discharge Date (MM/DD/YYYY)"
              value={selectedClaim?.dischargeDt}
              onChangeText={(text) => setSelectedClaim({ ...selectedClaim, dischargeDt: text })}
              style={styles.input}
            />
            <TextInput
              placeholder="Doctor Name"
              value={selectedClaim?.doctorName}
              onChangeText={(text) => setSelectedClaim({ ...selectedClaim, doctorName: text })}
              style={styles.input}
            />
            <TextInput
              placeholder="Deductible Paid"
              keyboardType="numeric"
              value={selectedClaim?.deductibleAmtPaid?.toString()}
              onChangeText={(text) =>
                setSelectedClaim({ ...selectedClaim, deductibleAmtPaid: parseFloat(text) || 0 })
              }
              style={styles.input}
            />
             <TextInput
              placeholder="Cause"
              value={selectedClaim?.Cause}
              onChangeText={(text) => setSelectedClaim({ ...selectedClaim, Cause: text })}
              style={styles.input}
            />
             <TextInput
              placeholder="Hospital name"
              value={selectedClaim?.hospitalName}
              onChangeText={(text) => setSelectedClaim({ ...selectedClaim, hospitalName: text })}
              style={styles.input}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, styles.editButton]}
                onPress={handleUpdate}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.deleteButton]}
                onPress={() => setEditModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
             
            </View>
          </View>
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f2f5' },
  header: {
    backgroundColor: '#B23B3B',
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  footer: {
    flexDirection: 'row',
    backgroundColor: '#B23B3B',
    padding: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  footerButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    margin: 10,
    elevation: 3,
  },
  mainInfo: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  icon: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  info: { flex: 1 },
  title: { fontSize: 16, fontWeight: 'bold', color: '#2c3e50' },
  subtitle: { fontSize: 14, color: '#7f8c8d' },
  detailsSection: { marginTop: 10, borderTopWidth: 1, borderTopColor: '#ecf0f1', paddingTop: 10 },
  label: { fontSize: 14, color: '#34495e', marginBottom: 5 },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    justifyContent: 'center',
  },
  editButton: { backgroundColor: '#2980b9' },
  deleteButton: { backgroundColor: '#e74c3c' },
  buttonText: { color: '#fff', fontWeight: 'bold', marginLeft: 5 },
  modalBackground: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: '#fff', borderRadius: 10, padding: 20, width: '90%' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  input: { borderBottomWidth: 1, marginBottom: 10 },
  modalButtons: { flexDirection: 'row', justifyContent: 'flex-end', gap: 10, marginTop: 10 },
});

export default UserClaimManagement;
