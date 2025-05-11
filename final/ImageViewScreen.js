// ImageViewScreen.js
import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ImageViewScreen = ({ route }) => {
  const navigation = useNavigation();
  const { imageBase64, title } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Image
        source={{ uri: `data:image/jpeg;base64,${imageBase64}` }}
        style={styles.image}
        resizeMode="contain"
      />
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
  title: { color: '#fff', fontSize: 20, marginBottom: 20 },
  image: { width: '100%', height: '80%' },
  button: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#5FC983',
    borderRadius: 8,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});

export default ImageViewScreen;
