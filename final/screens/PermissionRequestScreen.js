import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet, SafeAreaView } from 'react-native';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function PermissionRequestScreen() {
  const [policyNo, setPolicyNo] = useState('');
  const [result, setResult] = useState('');

  const handleCheck = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/check-policy/${policyNo}`);
      setResult(res.data.exists ? '✅ Insurance exists for this user.' : '❌ No insurance found.');
    } catch (err) {
      alert('Error', 'Could not connect to server');
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Check PolicyHolder" />
      <View style={styles.container}>
        <TextInput
          placeholder="Enter Policy Number"
          value={policyNo}
          onChangeText={setPolicyNo}
          style={styles.input}
        />
        <Button title="Check" onPress={handleCheck} color="#0077b6" />
        {result !== '' && <Text style={styles.result}>{result}</Text>}
      </View>
      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: 'space-between', backgroundColor: '#e0f7fa' },
  container: { padding: 20 },
  input: {
    borderWidth: 1,
    padding: 12,
    borderColor: '#0077b6',
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    color: '#023e8a',
    textAlign: 'center',
  },
});
