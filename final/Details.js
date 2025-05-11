import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Title } from 'react-native-paper';

const App = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <View style={styles.container}>
      {!showForm ? (
        // Main screen with "Add New Recommendation" button
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowForm(true)}
        >
          <Text style={styles.addButtonText}>Add Policy  Details</Text>
        </TouchableOpacity>
      ) : (
        // Form interface
        <View style={styles.formContainer}>
          <Text style={styles.label}>Title:</Text>
          <TextInput style={styles.input} placeholder="Enter title" />

          <Text style={styles.label}>Body:</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Enter body"
            multiline={true}
          />

          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  addButton: {
    padding: 16,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  formContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#000',
    padding: 16,
    borderRadius: 8,
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#000',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default App;
