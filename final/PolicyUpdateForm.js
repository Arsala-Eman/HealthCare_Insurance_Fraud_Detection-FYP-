// PolicyUpdateForm.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PolicyUpdateForm = ({ onUpdateSuccess }) => {
  const [policyNo, setPolicyNo] = useState('');
  const [updateDetails, setUpdateDetails] = useState('');
  const [token, setToken] = useState('');

  const handleUpdate = async () => {
    if (!policyNo || !updateDetails.trim()) {
      Alert.alert('Error', 'Please fill in all fields.');
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
        Alert.alert('Success', 'Policy updated successfully!');
        onUpdateSuccess();
        setPolicyNo('');
        setUpdateDetails('');
      } else {
        Alert.alert('Error', data.error || 'Failed to update policy.');
      }
    } catch (error) {
      Alert.alert('Network Error', 'Failed to update policy.');
    }
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.label}>Policy Number:</Text>
      <TextInput
        style={styles.input}
        value={policyNo}
        onChangeText={setPolicyNo}
      />
      <Text style={styles.label}>Update Details:</Text>
      <TextInput
        style={styles.input}
        value={updateDetails}
        onChangeText={setUpdateDetails}
        multiline
      />
      <Button title="Update Policy" onPress={handleUpdate} />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: { padding: 20, backgroundColor: '#fff', borderRadius: 10 },
  label: { fontSize: 16, marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
});

export default PolicyUpdateForm;