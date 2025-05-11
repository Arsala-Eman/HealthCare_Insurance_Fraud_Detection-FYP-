import React from 'react';
import { View, Text, TextInput, Image, StyleSheet, SafeAreaView, ScrollView, Dimensions,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const Container1 = () => {
  const navigation = useNavigation(); 
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        {/* Header Container */}
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <View style={styles.iconTextContainer}>
              <Icon name="home-outline" size={18} color="#000" />
              <Text style={styles.menuText}>Home</Text>
            </View>
            <View>
              <Text style={styles.headerTitle}>Health care insurance</Text>
              <Text style={styles.headerSubtitle}>Inpatient/OutPatient Medical claim</Text>
            </View>
            <Image
              source={require('../assets/img.png')}
              style={styles.image}
            />
          </View>
        </View>

        {/* Notice */}
        <View style={styles.noticeContainer}>
          <Text style={styles.noticeText}>To be filled by patient/claimant</Text>
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

        {/* Signature Section */}
        <View style={styles.signatureContainer}>
          <View style={styles.signatureBox}>
            <Text style={styles.signatureText}>Patient Sign</Text>
            <Text style={styles.dottedLine}>---------------------------</Text>
          </View>
          <View style={styles.signatureBox}>
            <Text style={styles.signatureText}>Doctor Sign</Text>
            <Text style={styles.dottedLine}>---------------------------</Text>
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
        onPress={() => navigation.navigate('Container20')} 
      >
        <Icon name="arrow-forward" size={30} color="#000" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

// Form field data
const formFields = [
  { label: 'Doctor name:' },
  { label: 'ClmAdmitDiagnosisCode:' },
  { label: 'DeductibleAmtPaid:' },
  { label: 'DischargeDt:' },
  { label: 'DiagnosisGroupCode:' },
  { label: 'DiagnosisCode_1:' },
  { label: 'DiagnosisCode_2:' },
  { label: 'DiagnosisCode_3:' },
  { label: 'DiagnosisCode_4:' },
  { label: 'DiagnosisCode_5:' },
  { label: 'DiagnosisCode_6:' },
  { label: 'DiagnosisCode_7:' },
  { label: 'DiagnosisCode_8:' },
  { label: 'DiagnosisCode_9:' },
  { label: 'DiagnosisCode_10:' },

];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderWidth: 2,
    borderRadius: 8,
    padding: 4,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  headerContainer: {
    padding: 8, // Added padding to header container
    backgroundColor: '#fff', // Optional: background color for visual distinction
    borderBottomWidth: 0, // Optional: border to separate from other content
    borderColor: '#ddd', // Optional: border color
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16, // Increased padding for more vertical space
    paddingHorizontal: 12, // Increased horizontal padding
    marginBottom: 16, // Increased margin below the header
    backgroundColor: '#F9E7E7',
    height: 60,
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#000',
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#555',
  },
  image: {
    width: 70,
    height: 50,
    borderRadius:10,
  },
  noticeContainer: {
    backgroundColor: '#f0c0c0',
    padding: 6,
    marginBottom: 4,
    width: '90%', // Adjust width to be a percentage of the container width
    alignSelf: 'center', // Center the container horizontally
    borderRadius: 4, // Optional: add some border radius for rounded corners
  },
  noticeText: {
    color: '#721c24',
    fontSize: 12,
    textAlign: 'center',
  },
  formContainer: {
    paddingHorizontal: 4,
  },
  formRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    color: '#333',
    flex: 1,
    fontWeight: 'bold',
  },
  input: {
    height: 28,
    flex: 2,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 6,
  },
  signatureContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  signatureBox: {
    alignItems: 'center',
  },
  signatureText: {
    fontSize: 12,
    color: '#333',
    marginBottom: 8,
    fontWeight:'bold',
  },
  dottedLine: {
    fontSize: 12,
    color: '#333',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 6,
  },
  socialIcon: {
    marginHorizontal: 8,
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

export default Container1;
