import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Container11 = () => {
  const navigation = useNavigation();
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const hasAlertedRef = useRef(false); // Track if alert already shown
  const prevCountRef = useRef(0); // Track previous claim count

  useEffect(() => {
    fetchClaims(); // When screen opens

    const interval = setInterval(() => {
      fetchClaims(true); // Polling call
    }, 5000); // Every 20 seconds

    return () => clearInterval(interval); // Stop polling when screen unmounts
  }, []);

  const fetchClaims = async (isPolling = false) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('No token found. Please log in again.');

      const response = await fetch('http://localhost:5000/get-claims', {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to fetch claims');

      // Detect new claims only during polling
      if (isPolling) {
        const newCount = data.claims.length;
        if (newCount > prevCountRef.current && !hasAlertedRef.current) {
          alert('New Claim!', 'A new claim has arrived.');
          hasAlertedRef.current = true;
        }
        prevCountRef.current = newCount;
      } else {
        prevCountRef.current = data.claims.length;
        hasAlertedRef.current = false; // Reset alert flag
      }

      setClaims(data.claims || []);
    } catch (error) {
      if (!isPolling) {
        alert('Error', error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={() => navigation.navigate('Dashboard')}>
          <Icon name="home-outline" size={24} color="#fff" />
          <Text style={styles.headerButtonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.headerButton, styles.activeButton]}>
          <Icon name="document-text-outline" size={24} color="#fff" />
          <Text style={styles.headerButtonText}>Check Claims</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerButton} onPress={() => navigation.navigate('Login')}>
          <Icon name="log-out-outline" size={24} color="#fff" />
          <Text style={styles.headerButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.mainContent}>
        {loading ? (
          <ActivityIndicator size="large" color="#3498db" />
        ) : claims.length === 0 ? (
          <Text style={styles.noClaimsText}>No claims found</Text>
        ) : (
          claims.map((claim, index) => (
            <View key={index} style={styles.claimCard}>
              <Text style={styles.claimTitle}>Claim #{index + 1}</Text>
              <View style={styles.claimDetails}>
                <Text style={styles.detailText}>Policy: {claim.policyNo || 'N/A'}</Text>
                <Text style={styles.detailText}>Claim ID: {claim.claimId || 'N/A'}</Text>
                <Text style={styles.detailText}>Admission: {claim.admissionDt || 'Not specified'}</Text>
              </View>
              <TouchableOpacity
                style={styles.detailsButton}
                onPress={() => navigation.navigate('ClaimDetails', { claim })}
              >
                <Text style={styles.buttonText}>View Details</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Powered by Insurance App</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6f8' },
  header: {
    flexDirection: 'row',
    backgroundColor: '#003566',
    paddingVertical: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 5,
  },
  headerButton: {
    alignItems: 'center',
  },
  activeButton: {
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
  },
  headerButtonText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
  mainContent: {
    padding: 16,
  },
  claimCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  claimTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34495e',
    marginBottom: 8,
  },
  claimDetails: {
    marginBottom: 12,
  },
  detailText: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 4,
  },
  detailsButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  noClaimsText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#95a5a6',
    marginTop: 24,
  },
  footer: {
    backgroundColor: '#003566',
    padding: 12,
    alignItems: 'center',
  },
  footerText: {
    color: '#bdc3c7',
    fontSize: 12,
  },
});

export default Container11;
