import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const Container12 = () => {
  const navigation = useNavigation();
  const handleLogout = () => {
    // Navigate back to the Login screen
    navigation.navigate('Login');
  };


  const renderFormRow = (label) => (
    <View style={styles.formRow}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Sidebar */}
      <View style={styles.sidebar}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('Dashboard')} // Navigate to Dashboard
        >
          <Icon name="home-outline" size={24} color="#000" />
          <Text style={styles.menuText}>Home</Text>
        </TouchableOpacity>
        <View style={styles.checkClaimsContainer}>
          <Text style={[styles.selectedMenuText, { fontSize: 25 }]}>Check Claims</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        <Image
          source={require('../assets/img.png')}
          style={styles.image}
        />
        <View style={styles.form}>
          {renderFormRow('Patient name:')}
          {renderFormRow('Father name:')}
          {renderFormRow('Policy no:')}
          {renderFormRow('CNIC no:')}
          {renderFormRow('Patient Relationship with the:')}
          {renderFormRow('Claimant:')}
          {renderFormRow('State of nature:')}
          {renderFormRow('Hospital name:')}
          {renderFormRow('Hospital address:')}
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Icon name="logo-facebook" size={24} color="#000" />
        <Icon name="logo-instagram" size={24} color="#000" />
        <Icon name="logo-twitter" size={24} color="#000" />
      </View>

      {/* Navigation Arrow */}
      <TouchableOpacity
        style={styles.arrowButton}
        onPress={() => navigation.navigate('Container13')}
      >
        <Icon name="arrow-forward" size={30} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 10,
    overflow: 'hidden',
  },
  sidebar: {
    width: '20%',
    backgroundColor: '#F9E7E7',
    padding: 10,
    alignItems: 'flex-start',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  menuText: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  checkClaimsContainer: {
    backgroundColor: '#f0c0c0',
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    height: 200,
    borderColor: '#000',
    position: 'absolute',
    top: 40,
    left: 10,
    right: 10,
  },
  selectedMenuText: {
    fontSize: 22,
  },
  logoutButton: {
    marginTop: 'auto',
    marginBottom: 20,
    backgroundColor: '#000',
    paddingVertical: 10,
    borderRadius: 5,
    width: '100%',
    alignSelf: 'center',
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  mainContent: {
    width: '60%',
    padding: 10,
  },
  image: {
    width: 80,
    height: 80,
    alignSelf: 'flex-start',
    marginBottom: 10,
    borderRadius: 10,
  },
  form: {
    flexDirection: 'column',
  },
  formRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  label: {
    width: '40%',
    fontSize: 18,
  },
  input: {
    width: '60%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 'auto',
  },
  arrowButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#f5f5f5',
    padding: 8,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default Container12;
