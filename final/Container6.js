import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const Container6 = () => {
  const navigation = useNavigation();
  const handleLogout = () => {
    // Navigate back to the Login screen
    navigation.navigate('Login');
  };
 

  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
      <View style={styles.menuItem}>
  <TouchableOpacity 
    style={styles.menuButton} 
    onPress={() => navigation.navigate('Sidebar')}
  >
    <Icon name="home-outline" size={18} color="#000" />
    <Text style={styles.menuText}>Home</Text>
  </TouchableOpacity>
</View>

        <View style={styles.checkClaimsContainer}>
          <Text style={[styles.selectedMenuText, { fontSize: 20 }]}>. Amend Claims</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Image and "Amend Claims" */}
        <View style={styles.imageRow}>
          <Image source={require('../assets/img.png')} style={styles.image} />
          <View style={styles.amendClaimsContainer}>
            <Text style={styles.amendClaimsText}>. Amend Claims</Text>
          </View>
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          {formFields.map((field, index) => (
            <View key={index} style={styles.formRow}>
              <Text style={styles.label}>{field.label}</Text>
              <TextInput style={styles.input} placeholder={field.placeholder} />
            </View>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Icon name="logo-facebook" size={16} color="#000" style={styles.socialIcon} />
          <Icon name="logo-instagram" size={16} color="#000" style={styles.socialIcon} />
          <Icon name="logo-twitter" size={16} color="#000" style={styles.socialIcon} />
        </View>
      </View>
      <TouchableOpacity
        style={styles.arrowButton}
        onPress={() => navigation.navigate('Container8')} // Navigate to Container1
      >
        <Icon name="arrow-forward" size={30} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

// Form field data
const formFields = [
  { label: 'Doctor name:' },
  { label: 'Date:' },
  { label: 'Date of Symptoms Occur:' },
  { label: 'If any Independent Examination:' },
  { label: 'Total Amount:' },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    overflow: 'hidden',
    
  },
  sidebar: {
    width: '18%', // Reduced width for sidebar
    backgroundColor: '#F9E7E7',
    padding: 8, // Reduced padding
    alignItems: 'flex-start',
  },
  menuItem: {
    marginBottom: 15, // Space between menu items
  },
  menuButton: {
    flexDirection: 'row', // Align items in a row
    alignItems: 'center', // Center vertically
  },
  menuText: {
    marginLeft: 8, // Space between icon and text
    fontSize: 18, // Font size for the text
    fontWeight: 'bold',
  },
  
  checkClaimsContainer: {
    position: 'absolute', // Set the container to absolute positioning
    top: 60,             // Distance from the top of the screen
    left: 10,            // Distance from the left of the screen
    right: 10,           // Optional: Distance from the right of the screen
    backgroundColor: '#f0c0c0',
    padding: 10,
    borderRadius: 10,
    height: 200,
    borderColor: '#000',
    zIndex: 1,           // Ensure it appears above other elements
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
  content: {
    flex: 2,
    padding: 10, // Reduced padding
  },
  imageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Adjusted for proper spacing
    marginBottom: 0, // Remove or reduce margin
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    resizeMode: 'contain',
    marginRight: 10, // Add a small margin between image and text if needed
  },
  amendClaimsContainer: {
    flex: 1, // Allow the container to take available space
    backgroundColor: '#f0c0c0',
    paddingVertical: 10, // Adjust padding for consistency
    paddingHorizontal: 15,
    borderRadius: 20,
    borderColor: '#000',
    borderWidth: 1, // Add border for clarity
    justifyContent: 'center', // Center the text vertically
    alignItems: 'center', // Center the text horizontally
    height: 50, // Ensure consistent height
  },
  amendClaimsText: {
    fontSize: 16, // Reduced font size
    
  },
  formContainer: {
    marginBottom: 15, // Reduced margin
  },
  formRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10, // Reduced margin
  },
  label: {
    fontSize: 16, // Reduced font size
    color: '#333',
    flex: 1,
    fontWeight: 'bold',
  },
  input: {
    height: 24, // Reduced height
    flex: 2,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    paddingHorizontal: 5, // Reduced padding
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10, // Positions the footer at the bottom
    left: 0,
    right: 0,
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

export default Container6;
