import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Footer() {
  return (
    <View style={styles.footer}>
      <Text style={styles.text}>© 2025 Hospital Insurance Claims</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#0077b6',
    padding: 10,
    alignItems: 'center',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  text: {
    color: '#fff',
    fontSize: 12,
  },
});
