import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function HospitalDashboard({ navigation }) {
  return (
    <View style={styles.screen}>
      <Header title="Hospital Dashboard" />

      <View style={styles.container}>
        {/* First Row: Submit & Permission */}
        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.card, { backgroundColor: '#023e8a' }]}
            onPress={() => navigation.navigate('SubmitClaim')}
          >
            <FontAwesome5 name="file-medical" size={30} color="#fff" />
            <Text style={styles.cardTitle}>Submit a Claim</Text>
            <Text style={styles.learnMore}>Learn More</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.card, { backgroundColor: '#ffb703' }]}
            onPress={() => navigation.navigate('PermissionRequest')}
          >
            <MaterialIcons name="vpn-key" size={30} color="#000" />
            <Text style={[styles.cardTitle, { color: '#000' }]}>Check PolicyHolder</Text>
            <Text style={[styles.learnMore, { color: '#000' }]}>Learn More</Text>
          </TouchableOpacity>
        </View>

        {/* Second Row: Centered Check Status */}
        <View style={styles.centerRow}>
          <TouchableOpacity
            style={[styles.card, styles.centerCard, { backgroundColor: '#6c757d' }]}
            onPress={() => navigation.navigate('ClaimStatusHospital')}
          >
            <FontAwesome5 name="clipboard-check" size={30} color="#fff" />
            <Text style={styles.cardTitle}>Check Claim Status</Text>
            <Text style={styles.learnMore}>Learn More</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#caf0f8',
  },
  container: {
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  centerRow: {
    alignItems: 'center',
    marginTop: 20,
  },
  card: {
    width: '48%',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
  },
  centerCard: {
    width: '60%',
  },
  cardTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
  learnMore: {
    marginTop: 5,
    fontSize: 12,
    color: '#fff',
    textDecorationLine: 'underline',
  },
});
