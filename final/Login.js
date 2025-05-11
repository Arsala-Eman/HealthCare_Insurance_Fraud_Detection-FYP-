import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      alert('Please enter both username and password.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
      console.log('Login response:', response.status, data);
  
      if (!response.ok || !data.success) {
        alert(data.error || 'Login failed. Please check your credentials.');
        return;
      }
  
      // Store token and user data
      await AsyncStorage.setItem('token', data.token);
      
      // Store user details including username
      await AsyncStorage.setItem('user', JSON.stringify({
        username: data.username,
        role: data.role,
        policyNo: data.policyNo || ''
      }));
      if (data.policyNo) {
        await AsyncStorage.setItem('policyNo', data.policyNo);
      }
  
      // Navigate based on role
      if (data.role === 'admin') {
        navigation.navigate('Dashboard');
      } else if (data.role === 'hospital') {
        navigation.navigate('HospitalDashboard');
      } else {
        navigation.navigate('Sidebar'); // or SubmitClaimScreen if preferred
      }
  
    } catch (error) {
      console.error('Login error:', error);
      alert('Something went wrong. Please try again.');
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/img.png')}
          style={styles.logo}
          resizeMode="cover"
        />
      </View>
      <View style={styles.loginContainer}>
        <Text style={styles.title}>Welcome to Our Healthcare Platform</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Username"
            placeholderTextColor="#000"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            placeholderTextColor="#000"
            secureTextEntry
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F0F4F8',
    borderRadius: 10,
    margin: 10,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0F7FA',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    padding: 30,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#003B5C',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  inputContainer: {
    width: '90%',
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#B2EBF2',
    elevation: 2,
  },
  input: {
    height: 50,
    paddingLeft: 15,
    fontSize: 16,
    color: '#000',
  },
  button: {
    backgroundColor: '#00796B',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logo: {
    width: '90%',
    height: '90%',
    borderRadius: 20,
    borderColor: '#B2EBF2',
    borderWidth: 3,
  },
});

export default Login;
