import React, { useState, useEffect } from 'react';
import { View, Text, Picker, Button, StyleSheet, Alert, TextInput, ActivityIndicator, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Container16 = ({ onUpdateSuccess }) => {
  const [policyNo, setPolicyNo] = useState('');
  const [updateDetails, setUpdateDetails] = useState('');
  const [token, setToken] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchToken = async () => {
      const token = await AsyncStorage.getItem('token');
      setToken(token);
    };
    fetchToken();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/get-users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setUsers(data.users);
        } else {
          alert('Error', data.error || 'Failed to fetch users');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        alert('Error', 'Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchUsers();
    }
  }, [token]);

  const handleUpdate = async () => {
    if (!policyNo || !updateDetails.trim()) {
      alert('Error', 'Please select a policy number and write update details.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/update-policy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ policyNo, updateDetails }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Success', 'Policy updated successfully!');
        onUpdateSuccess();
        setPolicyNo('');
        setUpdateDetails('');
      } else {
        alert('Error', data.error || 'Failed to update policy.');
      }
    } catch (error) {
      alert('Network Error', 'Failed to update policy.');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Update Policy Details</Text>
      </View>

      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Select Policy Number:</Text>
          {loading ? (
            <ActivityIndicator size="small" color="#007BFF" />
          ) : (
            <Picker
              selectedValue={policyNo}
              onValueChange={(itemValue) => setPolicyNo(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="-- Select Policy Number --" value="" />
              {users.map((user) => (
                <Picker.Item key={user._id} label={user.policyNo} value={user.policyNo} />
              ))}
            </Picker>
          )}

          <Text style={styles.label}>Update Details:</Text>
          <TextInput
            style={styles.input}
            value={updateDetails}
            onChangeText={setUpdateDetails}
            multiline
            placeholder="Enter update details here..."
            placeholderTextColor="#888"
          />

          <Button title="Update Policy" onPress={handleUpdate} color="#28A745" />
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 All rights reserved.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#003566',
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
  },
  formContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#343a40',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    minHeight: 80,
    textAlignVertical: 'top', // Align text to top
  },
  picker: {
    height: 50,
    width: '100%',
    borderColor: '#ced4da',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  footer: {
    backgroundColor: '#003566',
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderColor: '#dcdcdc',
  },
  footerText: {
    fontSize: 13,
    color: '#7f8c8d',
  },
});

export default Container16;
