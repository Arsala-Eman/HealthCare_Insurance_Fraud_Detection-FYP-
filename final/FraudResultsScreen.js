import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, SafeAreaView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FraudResultsScreen = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/get-fraud-results', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setResults(response.data.results);
    } catch (error) {
      console.error('Error fetching results:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.pageContainer}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Fraud Detection Results</Text>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#003566" />
        ) : results.length === 0 ? (
          <Text style={styles.noResults}>No results found.</Text>
        ) : (
          results.map((result, index) => (
            <View key={index} style={styles.resultCard}>
              <Text style={styles.claimId}>Claim ID: {result.claimId}</Text>
              <Text style={result.prediction === 'Fraudulent' ? styles.fraud : styles.legit}>
                Status: {result.prediction || 'Not Checked'}
              </Text>
              <Text style={styles.confidence}>
                Confidence: {result.probability ? `${(result.probability * 100).toFixed(1)}%` : 'N/A'}
              </Text>
              <Text style={styles.checkedAt}>Checked at: {new Date(result.checkedAt).toLocaleString()}</Text>
            </View>
          ))
        )}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Powered by Your Insurance App</Text>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: '#eef7ff'
  },
  header: {
    backgroundColor: '#003566',
    padding: 16,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  noResults: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: '#34495e',
  },
  resultCard: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 3,
  },
  claimId: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
    color: '#2c3e50',
  },
  fraud: {
    color: '#e74c3c',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  legit: {
    color: '#2ecc71',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  confidence: {
    color: '#34495e',
    marginBottom: 5,
  },
  checkedAt: {
    color: '#7f8c8d',
    fontSize: 12,
  },
  footer: {
    backgroundColor: '#2c3e50',
    padding: 15,
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default FraudResultsScreen;
