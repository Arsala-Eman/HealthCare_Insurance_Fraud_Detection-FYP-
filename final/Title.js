import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Title = () => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);

  const submitRecommendation = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');

      const res = await fetch('http://172.29.176.1:5000/broadcast-recommendation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, body }),
      });

      const data = await res.json();
      if (res.ok) {
        Alert.alert('Success', 'Recommendation sent to all users!');
        setTitle('');
        setBody('');
        setShowForm(false);
      } else {
        Alert.alert('Error', data.error || 'Failed to send recommendation');
      }
    } catch (error) {
      Alert.alert('Error', 'Network error. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Broadcast Recommendation</Text>
      </View>

      {/* MAIN CONTENT */}
      <View style={styles.mainContent}>
        {!showForm ? (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setShowForm(true)}
          >
            <Text style={styles.addButtonText}>+ Add New Recommendation</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Add Recommendation</Text>

            <Text style={styles.label}>Title:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter title"
              placeholderTextColor="#C4C4C4"
              value={title}
              onChangeText={setTitle}
            />

            <Text style={styles.label}>Body:</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Enter details"
              placeholderTextColor="#C4C4C4"
              multiline
              value={body}
              onChangeText={setBody}
            />

            <TouchableOpacity
              style={styles.submitButton}
              onPress={submitRecommendation}
              disabled={loading}
            >
              <Text style={styles.submitButtonText}>
                {loading ? 'Submitting...' : 'Submit'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 My Insurance App</Text>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', 
  },
  header: {
    backgroundColor: '#003566', 
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
  },
  headerText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  mainContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    paddingVertical: 14,
    paddingHorizontal: 28,
    backgroundColor: '#b40707',
    borderRadius: 8,
    elevation: 4,
  },
  addButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  formContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ff6f61',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ff6f61',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
    color: '#000',
    marginBottom: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#b40707',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footer: {
    backgroundColor: '#003566',
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  footerText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default Title;
