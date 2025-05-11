import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ContainerRecommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
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
    const fetchRecommendations = async () => {
      try {
        const res = await fetch('http://localhost:5000/recommendations', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setRecommendations(data.recommendations);
        }
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchRecommendations();
    }
  }, [token]);

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Recommendations</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Latest Recommendations</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : recommendations.length === 0 ? (
          <Text style={styles.noText}>No recommendations found.</Text>
        ) : (
          recommendations.map((rec, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.cardTitle}>{rec.title}</Text>
              <Text style={styles.body}>{rec.body}</Text>
              <Text style={styles.date}>
                {new Date(rec.createdAt).toLocaleDateString()}
              </Text>
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
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
    paddingBottom: 80, // space for footer
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
    backgroundColor: '#FCECEC',
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    borderColor: '#f0c0c0',
    borderWidth: 1,
  },
  cardTitle: {
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

export default ContainerRecommendations;
