import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Header({ title }) {
  const navigation = useNavigation();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token'); // or your token key
    navigation.replace('Login'); // navigate to login screen
  };

  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#0077b6',
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: 'center',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#023e8a',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
