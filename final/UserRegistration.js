import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const UserRegistration = () => {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    fullName: '',
    policyNo: '',
    cnic: '',
    phone: '',
    email: '',
    beneficiaryId: '',
    address: '',
    city: '',
    postalCode: '',
    username: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = '';
    switch(name) {
      case 'fullName':
        if (!value.match(/^[a-zA-Z ]{3,30}$/)) error = 'Invalid name';
        break;
      case 'policyNo':
        if (!value.match(/^POL\d{9}$/)) error = 'Format: POL123456789';
        break;
      case 'cnic':
        if (!value.match(/^\d{13}$/)) error = '13 digits required';
        break;
      case 'phone':
        if (!value.match(/^\d{11}$/)) error = '11 digits required';
        break;
      case 'email':
        if (!value.match(/^\S+@\S+\.\S+$/)) error = 'Invalid email';
        break;
      case 'beneficiaryId':
        if (!value.match(/^BENE\d{5}$/)) error = 'Format: BENE12345';
        break;
      case 'postalCode':
        if (!value.match(/^\d{5}$/)) error = '5 digits required';
        break;
      case 'username':
        if (!value.match(/^[a-z0-9_]{4,20}$/)) error = '4-20 lowercase alphanumeric';
        break;
      case 'password':
        if (value.length < 8) error = 'Minimum 8 characters';
        break;
    }
    setErrors(prev => ({ ...prev, [name]: error }));
    return !error;
  };

  const handleSubmit = async () => {
    const validations = Object.entries(formData).map(([name, value]) =>
      validateField(name, value)
    );
    if (validations.every(v => v)) {
      try {
        const response = await fetch('http://localhost:5000/register-user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (response.ok) {
          alert('Success', 'User registered successfully');
          console.log(data);
          setFormData({
            fullName: '',
            policyNo: '',
            cnic: '',
            phone: '',
            email: '',
            beneficiaryId: '',
            address: '',
            city: '',
            postalCode: '',
            username: '',
            password: '',
          });
        } else {
          alert('Error', data.message || 'Registration failed');
        }
      } catch (error) {
        alert('Error', 'Network error. Please try again.');
      }
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>User Registration</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Form */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>

          <InputField
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={setFormData}
            error={errors.fullName}
            icon="person"
            onBlur={() => validateField('fullName', formData.fullName)}
          />

          <InputField
            label="CNIC"
            name="cnic"
            value={formData.cnic}
            onChange={setFormData}
            error={errors.cnic}
            keyboardType="numeric"
            maxLength={13}
            icon="credit-card"
            onBlur={() => validateField('cnic', formData.cnic)}
          />

          <InputField
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={setFormData}
            error={errors.phone}
            keyboardType="phone-pad"
            maxLength={11}
            icon="phone"
            onBlur={() => validateField('phone', formData.phone)}
          />

          <InputField
            label="Email"
            name="email"
            value={formData.email}
            onChange={setFormData}
            error={errors.email}
            keyboardType="email-address"
            icon="email"
            onBlur={() => validateField('email', formData.email)}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Address Information</Text>

          <InputField
            label="Street Address"
            name="address"
            value={formData.address}
            onChange={setFormData}
            icon="home"
          />

          <InputField
            label="City"
            name="city"
            value={formData.city}
            onChange={setFormData}
            icon="location-city"
          />

          <InputField
            label="Postal Code"
            name="postalCode"
            value={formData.postalCode}
            onChange={setFormData}
            error={errors.postalCode}
            keyboardType="numeric"
            maxLength={5}
            icon="markunread-mailbox"
            onBlur={() => validateField('postalCode', formData.postalCode)}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Policy Information</Text>

          <InputField
            label="Policy Number"
            name="policyNo"
            value={formData.policyNo}
            onChange={setFormData}
            error={errors.policyNo}
            icon="assignment"
            onBlur={() => validateField('policyNo', formData.policyNo)}
          />

          <InputField
            label="Beneficiary ID"
            name="beneficiaryId"
            value={formData.beneficiaryId}
            onChange={setFormData}
            error={errors.beneficiaryId}
            icon="people"
            onBlur={() => validateField('beneficiaryId', formData.beneficiaryId)}
          />

          <InputField
            label="Username"
            name="username"
            value={formData.username}
            onChange={setFormData}
            error={errors.username}
            icon="person-outline"
            onBlur={() => validateField('username', formData.username)}
          />

          <InputField
            label="Password"
            name="password"
            secureTextEntry
            value={formData.password}
            onChange={setFormData}
            error={errors.password}
            icon="lock-outline"
            onBlur={() => validateField('password', formData.password)}
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Register User</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 Your Company Name. All rights reserved.</Text>
      </View>
    </View>
  );
};

const InputField = ({ label, name, value, onChange, error, icon, ...props }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.inputWrapper}>
      <Icon name={icon} size={20} color="#666" style={styles.inputIcon} />
      <TextInput
        style={[styles.input, error && styles.inputError]}
        value={value}
        onChangeText={text => {
          onChange(prev => ({ ...prev, [name]: text }));
        }}
        {...props}
      />
    </View>
    {error && <Text style={styles.errorText}>{error}</Text>}
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  headerContainer: {
    backgroundColor: '#003566',
    paddingTop: 30,
    paddingBottom: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#bdc3c7',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    color: '#2c3e50',
  },
  inputError: {
    borderColor: '#e74c3c',
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 12,
    marginTop: 5,
  },
  submitButton: {
    backgroundColor: '#27ae60',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 20,
    width: 'auto',
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    backgroundColor: '#003566',
    padding: 15,
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#dcdcdc',
  },
  footerText: {
    fontSize: 13,
    color: '#7f8c8d',
  },
});

export default UserRegistration;
