import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const ClaimStatusScreen = () => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchClaimStatus();
  };

  useEffect(() => {
    fetchClaimStatus();
  }, []);

  const fetchClaimStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const policyNo = await AsyncStorage.getItem('policyNo');
      
      const response = await axios.get(`http://172.29.176.1:5000/get-claim-status`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        const claims = response.data.claims.map(claim => ({
          ...claim,
          prediction: claim.prediction || null,
          probability: claim.probability || null,
          checkedAt: claim.checkedAt || null
        }));
        
        setClaims(claims);
        console.log('Claims with predictions:', claims);
      } else {
        console.error('Failed to fetch claims:', response.data.error);
      }
    } catch (error) {
      console.error('Error fetching status:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>My Claims</Text>
      </View>

      <ScrollView 
        style={styles.container}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        }
        contentContainerStyle={{ paddingBottom: 80 }} // So that last item isn't hidden under footer
      >
        <Text style={styles.title}>Your Claim Status</Text>

        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          claims.map((claim, index) => (
            <View key={index} style={styles.claimCard}>
              <Text style={styles.claimId}>Claim ID: {claim.claimId}</Text>
              
              {claim.prediction ? (
                <>
                  <Text style={claim.prediction === 'Fraud' ? styles.fraudAlert : styles.successAlert}>
                    {claim.prediction === 'Fraud' 
                      ? 'Fraud Detected! Please visit our office for further inquiry.'
                      : 'Claim Approved! Your payment will be processed within 5-7 working days.'}
                  </Text>
                  
                  <Text>Confidence: {claim.probability ? `${(claim.probability * 100).toFixed(1)}%` : 'N/A'}</Text>
                  
                  <Text>Checked on: {new Date(claim.checkedAt).toLocaleDateString()}</Text>
                </>
              ) : (
                <Text style={styles.pending}>Status: Under Review</Text>
              )}
            </View>
          ))
        )}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>© 2025 Insurance Co.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  headerContainer: {
    backgroundColor: '#B23B3B',
    paddingVertical: 15,
    alignItems: 'center',
    elevation: 4,
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  claimCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
  },
  fraudAlert: {
    color: 'red',
    fontWeight: 'bold',
    marginVertical: 5,
  },
  successAlert: {
    color: 'green',
    fontWeight: 'bold',
    marginVertical: 5,
  },
  pending: {
    color: 'orange',
    fontStyle: 'italic',
  },
  claimId: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  footerContainer: {
    backgroundColor: '#B23B3B',
    paddingVertical: 10,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    elevation: 4,
  },
  footerText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default ClaimStatusScreen;
