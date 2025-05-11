import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { use } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Container9 = () => {
  const navigation= useNavigation();
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
          <Text style={[styles.selectedMenuText, { fontSize: 25 }]}>. Cancel Claims</Text> {/* Reduced font size */}
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.mainContent}>
        <Image
          source={require('../assets/img.png')}
          style={styles.image}
        />
        <Text style={styles.noteText}>Note: you can Cancel Claim in only 3 days.</Text>
        
        <View style={styles.inputGroupContainer}>
          <View style={styles.inputGroup}>
            <TextInput style={styles.input} placeholder="Enter Policy no:" />
            <TextInput style={styles.input} placeholder="Enter Claim no:" />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.searchButton]}>
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.cancelButton]}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.inputGroupContainer}>
          <View style={styles.inputGroup}>
            <TextInput style={styles.input} placeholder="Policy no:" />
            <TextInput style={styles.input} placeholder="Claim no:" />
            <TextInput style={styles.input} placeholder="Enter the reason" />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.cancelButton]}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Icon name="logo-facebook" size={18} color="#000" /> {/* Reduced size */}
          <Icon name="logo-instagram" size={18} color="#000" /> {/* Reduced size */}
          <Icon name="logo-twitter" size={18} color="#000" /> {/* Reduced size */}
        </View>
      </View>
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
    backgroundColor: '#f0c0c0',
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    height: 200,
    borderColor: '#000',
    position: 'absolute', // Set the container to absolute positioning
    top: 50,             // Distance from the top of the screen
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
    flex: 1,
    padding: 10, // Reduced padding
    backgroundColor: '#fff',
  },
  image: {
    width: 100, // Reduced width
    height: 100, // Reduced height
    alignSelf: 'flex-start',
    marginBottom: 8, // Reduced margin
    borderRadius: 6, // Reduced border radius
  },
  noteText: {
    color: 'red',
    marginBottom: 10, // Reduced margin
    textAlign: 'center',
    fontSize: 12, // Reduced font size
  },
  inputGroupContainer: {
    borderWidth: 2, // Reduced border width
    borderColor: 'black', // Changed color
    borderRadius: 4, // Reduced border radius
    padding: 6, // Reduced padding
    marginBottom: 12, // Reduced margin
    backgroundColor: '#f9f9f9',
  },
  inputGroup: {
    marginBottom: 8, // Reduced margin
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd', // Changed color
    borderRadius: 4, // Reduced border radius
    padding: 6, // Reduced padding
    marginBottom: 8, // Reduced margin
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 12, // Reduced margin
  },
  button: {
    backgroundColor: 'black',
    padding: 8, // Reduced padding
    borderRadius: 4, // Reduced border radius
    marginLeft: 8, // Reduced margin
  },
  searchButton: {
    backgroundColor: 'black',
  },
  cancelButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: 'white',
    fontSize: 12, // Reduced font size
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 'auto',
    marginBottom: 8, // Reduced margin
  },
});

export default Container9;
