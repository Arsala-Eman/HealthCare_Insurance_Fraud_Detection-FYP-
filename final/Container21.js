import React from 'react';
import { View, Text, TextInput, Image, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const Container21 = () => {
  const navigation = useNavigation(); 
  const handleLogout = () => {
    // Navigate back to the Login screen
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Sidebar */}
        <View style={styles.sidebar}>
          <View style={styles.sidebarContent}>
          
          <View style={styles.iconTextContainer}>
  <TouchableOpacity onPress={() => navigation.navigate('Sidebar')}>
    <View style={styles.iconTextContainer}>
      <Icon name="home-outline" size={18} color="#000" />
      <Text style={styles.menuText}>Home</Text>
    </View>
  </TouchableOpacity>
</View>

            <View style={styles.EnquiryContainer}>
        <Text style={[styles.selectedMenuText, { fontSize: 25 }]}>. Enquiry about Claims</Text>
      </View>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Header */}
          <View style={styles.header}>
            <Image
              source={require('../assets/img.png')}
              style={styles.headerImage}
            />
          </View>

          {/* Notice */}
          <View style={styles.noticeContainer}>
            <Text style={styles.noticeText}>Note: You can Enquire Until the claim is in procedure:</Text>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
  <View style={styles.formWrapper}> {/* New wrapper container */}
    <View style={styles.formRow}>
      <Text style={styles.label}>Enter Policy no:</Text>
      <TextInput style={styles.input} />
    </View>
    <View style={styles.formRow}>
      <Text style={styles.label}>Enter Claim no:</Text>
      <TextInput style={styles.input} />
    </View>
  </View>
</View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.searchButton}>
              <Text style={styles.buttonText}>Search</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Icon name="logo-facebook" size={18} color="#000" style={styles.socialIcon} />
          <Icon name="logo-instagram" size={18} color="#000" style={styles.socialIcon} />
          <Icon name="logo-twitter" size={18} color="#000" style={styles.socialIcon} />
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.arrowButton}
        onPress={() => navigation.navigate('Container5')} 
      >
        <Icon name="arrow-forward" size={30} color="#000" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: '25%',
    backgroundColor: '#FDEAEA',
    padding: 8,
  },
  sidebarContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  iconTextContainer: {
    flexDirection: 'row', // Set items in a row
    alignItems: 'center', // Vertically align items
    marginBottom: 20,
  },
  menuText: {
    marginLeft: 4,
    fontSize: 20,
    color: '#000',
    fontWeight:'bold',
  },
  sidebarItem: {
    fontSize: 14,
    marginBottom: 12,
    color: '#333',
  },
  EnquiryContainer: {
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
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  
  },
  logoutText: {
    color: '#fff',
    fontSize: 12,
  },
  mainContent: {
    width: '75%',
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerImage: {
    width: 120,
    height: 80,
  },
  noticeContainer: {
    backgroundColor: '#fff',
    padding: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
  },
  noticeText: {
    color: '#000',
    fontSize: 12,
  },
  formContainer: {
    paddingHorizontal: 16,
  },

  formWrapper: {
    borderWidth: 2,        // Add border width to the wrapper
    borderColor: '#000',   // Set the border color
    borderRadius: 8,       // Optional: Add border radius for rounded corners
    padding: 12,           // Add padding inside the wrapper for spacing
    backgroundColor: '#fff', // Optional: Add a background color
    marginBottom: 12,      // Optional: Add margin below the formWrapper
  },

  formRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  label: {
    fontSize: 14,
    color: '#333',
    flex: 1,
    fontWeight: 'bold',
  },

  input: {
    height: 40,
    flex: 2,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  searchButton: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: '#999',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  socialIcon: {
    marginHorizontal: 10,
  },
  headerImage: {
    width: 70,
    height: 60,
    alignSelf: 'flex-start',
   
    borderRadius: 10, // Round corners
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

export default Container21;
