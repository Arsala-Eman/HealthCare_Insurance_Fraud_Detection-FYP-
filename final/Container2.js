import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Container2 = () => {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');

  useEffect(() => {
    const fetchToken = async () => {
      const token = await AsyncStorage.getItem('token');
      setToken(token);
    };
    fetchToken();
  }, []);

  useEffect(() => {
    const fetchPolicyUpdates = async () => {
      try {
        const res = await fetch('http://localhost:5000/get-my-policy-updates', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setUpdates(data.updates);
        }
      } catch (error) {
        console.error('Error fetching policy updates:', error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchPolicyUpdates();
    }
  }, [token]);

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Policies</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Your Policy Updates</Text>
        
        {loading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : updates.length === 0 ? (
          <Text style={styles.noText}>No policy updates found.</Text>
        ) : (
          <FlatList
            data={updates}
            keyExtractor={(item) => item.id?.toString() || Math.random().toString(36, 2)}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.policyNo}>{item.policyNo}</Text>
                <Text style={styles.body}>{item.updateDetails}</Text>
                <Text style={styles.date}>
                  {new Date(item.updatedAt).toLocaleDateString()}
                </Text>
              </View>
            )}
            contentContainerStyle={{ paddingBottom: 80 }} // avoid overlap with footer
          />
        )}
      </View>

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
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  noText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
    color: '#666',
  },
  card: {
    backgroundColor: '#E8F0FE',
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    borderColor: '#c0d0f0',
    borderWidth: 1,
  },
  policyNo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#000',
  },
  body: {
    fontSize: 16,
    color: '#333',
  },
  date: {
    marginTop: 10,
    fontSize: 12,
    color: '#999',
  },
  footerContainer: {
    backgroundColor: '#B23B3B',
    paddingVertical: 10,
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default Container2;
