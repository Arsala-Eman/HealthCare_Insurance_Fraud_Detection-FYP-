import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';


const Container8 = () => {
  const [emergency, setEmergency] = useState(false);
  const [elective, setElective] = useState(false);
  const [others, setOthers] = useState(false);
  const [inpatient, setInpatient] = useState(false);
  const [outpatient, setOutpatient] = useState(false);

  const toggleCheckbox = (setter, current) => {
    setter(!current);
  };
    const navigation = useNavigation(); 
  
  const handleLogout = () => {
    // Navigate back to the Login screen
    navigation.navigate('Login');
  };


  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
      <View style={styles.menuItem}>
  <TouchableOpacity onPress={() => navigation.navigate('Sidebar')} style={styles.menuItemTouchable}>
    <Icon name="home-outline" size={18} color="#000" />
    <Text style={styles.menuText}>Home</Text>
  </TouchableOpacity>
</View>

        <View style={styles.checkClaimsContainer}>
          <Text style={styles.selectedMenuText}>. Amend Claims</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Image
            source={require('../assets/img.png')} // replace with your image path
            style={styles.image}
          />
          <Text style={styles.headerText}>. Amend Claims</Text>
        </View>

        <View style={styles.subHeader}>
          <Text style={styles.subHeaderText}>To be filled by Doctor</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.formRow}>
            <Text style={styles.label}>Doctor name :</Text>
            <TextInput style={styles.input} />
          </View>

          <View style={styles.formRow}>
            <Text style={styles.label}>Patient name :</Text>
            <TextInput style={styles.input} />
          </View>

          <View style={styles.formRow}>
            <Text style={styles.label}>How long patient Doctor :</Text>
            <TextInput style={styles.input} />
          </View>

          <View style={styles.formRow}>
            <Text style={styles.label}>CNIC no :</Text>
            <TextInput style={styles.input} />
          </View>

          <View style={styles.formRow}>
            <Text style={styles.label}>Source of Admission :</Text>
            <View style={styles.checkboxRow}>
              <TouchableOpacity onPress={() => toggleCheckbox(setEmergency, emergency)}>
                <View style={[styles.checkbox, emergency && styles.checkedCheckbox]}>
                  {emergency && <Icon name="checkmark" size={14} color="#fff" />}
                </View>
              </TouchableOpacity>
              <Text style={styles.checkboxLabel}>Emergency</Text>

              <TouchableOpacity onPress={() => toggleCheckbox(setElective, elective)}>
                <View style={[styles.checkbox, elective && styles.checkedCheckbox]}>
                  {elective && <Icon name="checkmark" size={14} color="#fff" />}
                </View>
              </TouchableOpacity>
              <Text style={styles.checkboxLabel}>Elective/Plan</Text>

              <TouchableOpacity onPress={() => toggleCheckbox(setOthers, others)}>
                <View style={[styles.checkbox, others && styles.checkedCheckbox]}>
                  {others && <Icon name="checkmark" size={14} color="#fff" />}
                </View>
              </TouchableOpacity>
              <Text style={styles.checkboxLabel}>Others</Text>
            </View>
          </View>

          <View style={styles.formRow}>
            <Text style={styles.label}>Patient Registered As :</Text>
            <View style={styles.checkboxRow}>
              <TouchableOpacity onPress={() => toggleCheckbox(setInpatient, inpatient)}>
                <View style={[styles.checkbox, inpatient && styles.checkedCheckbox]}>
                  {inpatient && <Icon name="checkmark" size={14} color="#fff" />}
                </View>
              </TouchableOpacity>
              <Text style={styles.checkboxLabel}>Inpatient</Text>

              <TouchableOpacity onPress={() => toggleCheckbox(setOutpatient, outpatient)}>
                <View style={[styles.checkbox, outpatient && styles.checkedCheckbox]}>
                  {outpatient && <Icon name="checkmark" size={14} color="#fff" />}
                </View>
              </TouchableOpacity>
              <Text style={styles.checkboxLabel}>Outpatient</Text>
            </View>
          </View>

          <View style={styles.formRow}>
            <Text style={styles.label}>Give The brief Detail of Patient :</Text>
            <TextInput style={styles.input} multiline={true} numberOfLines={3} />
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity><Icon name="logo-facebook" size={18} color="#000" /></TouchableOpacity>
          <TouchableOpacity><Icon name="logo-instagram" size={18} color="#000" /></TouchableOpacity>
          <TouchableOpacity><Icon name="logo-twitter" size={18} color="#000" /></TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    overflow: 'hidden',
    padding: 8, // Reduced padding
  },
  sidebar: {
    width: '18%', // Further reduced width
    backgroundColor: '#F9E7E7',
    padding: 6, // Further reduced padding
    alignItems: 'flex-start',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  menuItemTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    marginLeft: 6,
    fontSize: 20,
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
    flex: 1,
    padding: 10, // Further reduced padding
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10, // Further reduced margin
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
  headerText: {
    marginLeft: 6, // Further reduced margin
    fontSize: 20, // Further reduced font size
    fontWeight: 'bold',
  },
  subHeader: {
    backgroundColor: '#FADBD8',
    padding: 6, // Further reduced padding
    marginBottom: 10, // Further reduced margin
  },
  subHeaderText: {
    color: '#C0392B',
    fontWeight: 'bold',
    fontSize: 14, // Further reduced font size
  },
  form: {
    marginBottom: 10, // Further reduced margin
  },
  formRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6, // Further reduced margin
  },
  label: {
    width: '38%', // Further reduced width
    fontWeight: 'bold',
    marginBottom: 4, // Further reduced margin
    fontSize: 18, // Further reduced font size
  },
  input: {
    flex: 1,
    padding: 6, // Further reduced padding
    backgroundColor: '#EAEDED',
    borderRadius: 4, // Further reduced border radius
    fontSize: 12, // Further reduced font size
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 18, // Further reduced size
    height: 18, // Further reduced size
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4, // Further reduced margin
    borderRadius: 3,
  },
  checkedCheckbox: {
    backgroundColor: '#000',
  },
  checkboxLabel: {
    marginRight: 8, // Further reduced margin
    fontSize: 12, // Further reduced font size
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10, // Further reduced margin
  },
  socialIcon: {
    fontSize: 18, // Further reduced icon size
    marginHorizontal: 8, // Further reduced margin
  },
});

export default Container8;
