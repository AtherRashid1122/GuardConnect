import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
const AddGuardScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('');

  const handleAddGuard = async () => {
    if (!fullName.trim() || !email.trim() || !phone.trim() || !status.trim()) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    try {
      await firestore().collection('users').add({
        name: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        status: status.trim(),
        role: 'guard',
        createdAt: firestore.FieldValue.serverTimestamp(),
      })

      Alert.alert('Success', 'Guard added successfully');
      navigation.goBack();
      setFullName('')
      setEmail('')
      setPhone('')
      setStatus('')
    } catch (error) {
      console.log('Add Guard Error', error)
      Alert.alert("Error", "Failed to add guard")
    }

  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Add New Guard</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <TextInput
        style={styles.input}
        placeholder="Status (Active / Off Duty)"
        value={status}
        onChangeText={setStatus}
      />

      <TouchableOpacity style={styles.button} onPress={handleAddGuard}>
        <Text style={styles.buttonText}>Add Guard</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddGuardScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F6F8FB',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 15,
    fontSize: 15,
  },
  button: {
    backgroundColor: '#111',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});