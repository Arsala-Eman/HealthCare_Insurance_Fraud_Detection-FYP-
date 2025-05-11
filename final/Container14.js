import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Svg, { Circle, Text as SvgText } from 'react-native-svg'; // Import SVG components
import { useNavigation } from '@react-navigation/native';


const Container14 = () => {
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
        <Image source={require('../assets/img.png')} style={styles.image} />
        <View style={styles.svgContainer}>
          <Svg height="200" width="200" viewBox="0 0 200 200" style={styles.svg}>
            <Circle cx="100" cy="100" r="100" fill="#f0c0c0" />
            <SvgText
              x="50%"
              y="50%"
              textAnchor="middle"
              alignmentBaseline="central"
              fontSize="20"
              fill="#000"
            >
              0 % Fraud Detected
            </SvgText>
          </Svg>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Approved</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Reply</Text>
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
    justifyContent: 'flex-start', // Align items at the top
    alignItems: 'center', // Align items to the start (left)
    position: 'relative',
  },
  
  image: {
    width: 100, // Reduced size
    height: 100, // Reduced size
    alignSelf: 'flex-start',
    marginBottom: 10,
    borderRadius: 10,
  },
  svgContainer: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20, // Adjust spacing as needed
  },
  svg: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center', // Center the button row horizontally
    marginTop: 20, // Adjust based on spacing needed
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end', // Align buttons to the right side of the buttonContainer
    width: '100%', // Ensure the row takes full width
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

export default Container14;
