import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ClaimStatusScreenHospital() {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchClaims = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const userData = await AsyncStorage.getItem('user');
      const user = JSON.parse(userData);

      if (!token || !user?.username) {
        alert('Error', 'User data not found. Please log in again.');
        return;
      }

      const response = await fetch(
        `http://172.29.176.1:5000/get-hospital-claims`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      if (response.ok) {
        setClaims(result.claims || []);
      } else {
      alert('Error', result.error || 'Failed to fetch claims.');
      }
    } catch (error) {
      alert('Error', error.message || 'Network error.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchClaims();
  }, []);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchClaims();
  }, []);

  return (
    <View style={styles.screen}>
      <Header title="Hospital Claim Status" />

      <View style={styles.content}>
        <ScrollView
          contentContainerStyle={styles.container}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        >
          {loading ? (
            <ActivityIndicator size="large" color="#0077b6" />
          ) : claims.length === 0 ? (
            <Text style={styles.noClaims}>No claims found.</Text>
          ) : (
            claims.map((claim, index) => (
              <View key={index} style={styles.claimCard}>
                <Text style={styles.claimId}>Claim ID: {claim.claimId}</Text>
                <Text>Patient: {claim.patientName}</Text>

                {claim.prediction ? (
                  <>
                    <Text
                      style={
                        claim.prediction === 'Fraud'
                          ? styles.fraudAlert
                          : styles.successAlert
                      }
                    >
                      {claim.prediction?.toLowerCase() === 'fraud'
                        ? '⚠️ Fraud alert: This claim may be suspicious.Plaese Contact Office as soon as possible '
                        : '✅ Cleared: This claim appears legitimate.Claim Approved! Your payment will be processed within 5-7 working days'}
                    </Text>
                    <Text style={styles.infoText}>
                      Confidence:{' '}
                      {claim.probability
                        ? `${(claim.probability * 100).toFixed(1)}%`
                        : 'N/A'}
                    </Text>
                    <Text style={styles.infoText}>
                      Reviewed on:{' '}
                      {claim.checkedAt
                        ? new Date(claim.checkedAt).toLocaleDateString()
                        : 'N/A'}
                    </Text>
                  </>
                ) : (
                  <Text style={styles.pending}>⏳ Status: Still being reviewed.</Text>
                )}
              </View>
            ))
          )}
        </ScrollView>
      </View>

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#e0f7fa',
  },
  content: {
    flex: 1,
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  claimCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderColor: '#0077b6',
    borderWidth: 1,
  },
  claimId: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  fraudAlert: {
    color: '#d00000',
    fontWeight: 'bold',
    marginTop: 8,
  },
  successAlert: {
    color: '#007f5f',
    fontWeight: 'bold',
    marginTop: 8,
  },
  pending: {
    color: '#ff8800',
    fontWeight: 'bold',
    marginTop: 8,
  },
  noClaims: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 50,
    color: '#333',
  },
  infoText: {
    marginTop: 2,
    fontSize: 14,
    color: '#333',
  },
});
