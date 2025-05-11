import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const Container13 = () => {
  const navigation = useNavigation(); 
  const handleLogout = () => {
    // Navigate back to the Login screen
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
   <View style={styles.sidebar}>
  <TouchableOpacity
    style={styles.menuItem}
    onPress={() => navigation.navigate('Dashboard')} // Navigate to Dashboard
  >
    <Icon name="home-outline" size={24} color="#000" />
    <Text style={styles.menuText}>Home</Text>
  </TouchableOpacity>
  <View style={styles.checkClaimsContainer}>
    <Text style={[styles.selectedMenuText, { fontSize: 25 }]}>. Check Claims</Text>
  </View>
  <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
    <Text style={styles.logoutText}>Log Out</Text>
  </TouchableOpacity>
</View>

   
      <View style={styles.mainContent}>
        <Image
          source={require('../assets/img.png')}
          style={styles.image} // Corrected the style name from icon to image
        />
        <View style={styles.form}>
          {renderFormRow('Doctor name:')}
          {renderFormRow('Date:')}
          {renderFormRow('Date of Symptoms Occur:')}
          {renderFormRow('If any Independent Examination:')}
          {renderFormRow('Total Amount:')}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Check Fraud</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      
      <View style={styles.footer}>
        <Icon name="logo-facebook" size={24} color="#000" />
        <Icon name="logo-instagram" size={24} color="#000" />
        <Icon name="logo-twitter" size={24} color="#000" />
      </View>
      <TouchableOpacity
        style={styles.arrowButton}
        onPress={() => navigation.navigate('Container14')} 
      >
        <Icon name="arrow-forward" size={30} color="#000" />
      </TouchableOpacity>
      </View>
    
  );
};

const renderFormRow = (label) => {
  return (
    <View style={styles.formRow}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} />
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
    fontWeight:'bold',
  },
  checkClaimsContainer: {
    backgroundColor: '#f0c0c0',
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    height: 200,
    borderColor: '#000',
    position: 'absolute', // Set the container to absolute positioning
    top: 40,             // Distance from the top of the screen
    left: 10,            // Distance from the left of the screen
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
    paddingHorizontal: 20, // Optional for internal padding
    borderRadius: 5,
    width: '100%', // Adjust width to make the button longer
    alignSelf: 'center', // Center the button within the sidebar
  },
  
  logoutText: {
    color: 'white',
    fontSize: 16,
    textAlign:'center',
  },
  mainContent: {
    width: '60%',
    padding: 10,
  },
  image: {
    width: 80, // Reduced size
    height: 80, // Reduced size
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
    width: '50%',
    fontSize: 18,
  },
  input: {
    width: '50%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end', // Align buttons to the right
    marginTop: 20,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center', // Center icons horizontally
    marginTop: 'auto',
  },
  arrowButton: {
    position: 'absolute',
    bottom: 16, // Distance from the bottom of the page
    right: 16, // Distance from the right side of the page
    backgroundColor: '#f5f5f5', // Optional: background color for better visibility
    padding: 8, // Optional: padding for better touch area
    borderRadius: 30, // Optional: circular shape
    elevation: 5, // Optional: shadow for better visibility on Android
    shadowColor: '#000', // Shadow properties for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  
});


export default Container13;
