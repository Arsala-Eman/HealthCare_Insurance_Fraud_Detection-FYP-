import React, { useEffect, useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  LayoutAnimation, Alert, ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Container4 = () => {
  const [claimData, setClaimData] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const BASE_URL = 'http://localhost:5000';

  useEffect(() => {
    fetchClaimAutomatically();
  }, []);

  const fetchClaimAutomatically = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const policyNo = await AsyncStorage.getItem('policyNo');

      const response = await fetch(`${BASE_URL}/get-my-claims`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();

      if (response.ok && data.claims.length > 0) {
        setClaimData(data.claims[0]);
        setExpanded(true);
      } else {
        alert('No Claims Found', 'You have no submitted claims.');
      }
    } catch (error) {
      console.error('Error fetching claim:', error);
      alert('Error', 'Failed to fetch claim');
    }
  };

  const deleteClaim = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${BASE_URL}/delete-claim`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          claimId: claimData.claimId,
          policyNo: claimData.policyNo,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Success', 'Claim deleted successfully');
        setClaimData(null);
        setExpanded(false);
      } else {
      alert('Error', data.error || 'Failed to delete claim');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Error', 'Failed to delete claim');
    }
  };

  // --------- RENDER START ---------
  return (
    <View style={styles.fullContainer}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>My Claims</Text>
      </View>

      <ScrollView style={styles.container}>
        <Text style={styles.heading}>Delete Your Claim</Text>

        {claimData ? (
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
              setExpanded(!expanded);
            }}
          >
            <View style={styles.mainInfo}>
              <Icon name="assignment" size={24} color="#fff" style={styles.icon} />
              <View style={styles.info}>
                <Text style={styles.title}>Claim: {claimData.claimId}</Text>
                <Text style={styles.subtitle}>Policy No: {claimData.policyNo}</Text>
                <Text style={styles.subtitle}>Submitted: {new Date(claimData.submissionDate).toLocaleDateString()}</Text>
              </View>
              <Icon
                name={expanded ? 'expand-less' : 'expand-more'}
                size={24}
                color="#95a5a6"
              />
            </View>

            {expanded && (
              <View style={styles.detailsSection}>
                <Text style={styles.labelText}>Patient Name: {claimData.patientName}</Text>
                <Text style={styles.labelText}>Father Name: {claimData.fatherName}</Text>
                <Text style={styles.labelText}>Beneficiary ID: {claimData.beneId}</Text>
                <Text style={styles.labelText}>Provider: {claimData.provider}</Text>
                <Text style={styles.labelText}>Reimbursed Amount: {claimData.inscClaimAmtReimbursed}</Text>
                <Text style={styles.labelText}>Attending Physician: {claimData.attendingPhysician}</Text>
                <Text style={styles.labelText}>Other Physician: {claimData.otherPhysician}</Text>
                <Text style={styles.labelText}>Admission Date: {claimData.admissionDt}</Text>
                <Text style={styles.labelText}>Discharge Date: {claimData.dischargeDt}</Text>
                <Text style={styles.labelText}>Doctor Name: {claimData.doctorName}</Text>
                <Text style={styles.labelText}>Deductible Paid: {claimData.deductibleAmtPaid}</Text>
                <Text style={styles.labelText}>Cause: {claimData.Cause}</Text>

                <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={deleteClaim}>
                  <Icon name="delete" size={18} color="#fff" />
                  <Text style={styles.buttonText}>Cancel Claim</Text>
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
        ) : (
          <Text style={{ marginTop: 30, fontSize: 16, color: '#555' }}>
            No claim to display.
          </Text>
        )}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
       <Text>Insurance Company</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  header: {
    backgroundColor: '#B23B3B',
    padding: 15,
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2c3e50',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    elevation: 3,
  },
  mainInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  info: { flex: 1 },
  title: { fontSize: 16, fontWeight: 'bold', color: '#2c3e50' },
  subtitle: { fontSize: 14, color: '#7f8c8d' },
  detailsSection: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
    paddingTop: 10,
  },
  labelText: { fontSize: 14, color: '#34495e', marginBottom: 5 },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    justifyContent: 'center',
  },
  deleteButton: { backgroundColor: '#e74c3c' },
  buttonText: { color: '#fff', fontWeight: 'bold', marginLeft: 5 },
  footer: {
    backgroundColor: '#B23B3B',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  footerText: {
    color: '#3498db',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Container4;
