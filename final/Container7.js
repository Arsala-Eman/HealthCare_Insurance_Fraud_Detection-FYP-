import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Container7 = () => {
  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
        <View style={styles.menuItem}>
          <Icon name="home-outline" size={24} color="#000" />
          <Text style={styles.menuText}>Home</Text>
        </View>
        <View style={styles.checkClaimsContainer}>
          <Text style={styles.selectedMenuText}>. Amend Claims</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Image
            source={require('../assets/img.png')} // replace with your image path
            style={styles.image}
          />
          <Text style={styles.headerText}>. Amend Claims</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.formRow}>
            <Text style={styles.label}>Doctor name :</Text>
            <TextInput style={styles.input}  />
          </View>

          <View style={styles.formRow}>
            <Text style={styles.label}>Date :</Text>
            <TextInput style={styles.input}  />
          </View>

          <View style={styles.formRow}>
            <Text style={styles.label}>Date of Symptoms Occur :</Text>
            <TextInput style={styles.input}  />
          </View>

          <View style={styles.formRow}>
            <Text style={styles.label}>If any Independent Examination :</Text>
            <TextInput style={styles.input}  />
          </View>

          <View style={styles.formRow}>
            <Text style={styles.label}>Total Amount :</Text>
            <TextInput style={styles.input}  />
          </View>
        </View>
        
        <View style={styles.footer}>
          <Icon name="logo-facebook" size={24} color="#000" style={styles.footerIcon} />
          <Icon name="logo-instagram" size={24} color="#000" style={styles.footerIcon} />
          <Icon name="logo-twitter" size={24} color="#000" style={styles.footerIcon} />
        </View>
      </ScrollView>
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
  },
  checkClaimsContainer: {
    backgroundColor: '#f0c0c0',
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    justifyContent: 'center',
    height: 200,
  },
  selectedMenuText: {
    fontSize: 22,
  },
  logoutButton: {
    marginTop: 'auto',
    marginBottom: 20,
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 80, // Reduced size
    height: 80, // Reduced size
    
    marginBottom: 10,
    borderRadius: 10, // Rounded corners
  },
  headerText: {
    marginLeft: 10,
    fontSize: 24,
    fontWeight: 'bold',
  },
  form: {
    marginBottom: 20,
  },
  formRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    flex: 1,
    fontWeight: 'bold',
  },
  input: {
    flex: 2,
    padding: 10,
    backgroundColor: '#EAEDED',
    borderRadius: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 'auto',
  },
});

export default Container7;
