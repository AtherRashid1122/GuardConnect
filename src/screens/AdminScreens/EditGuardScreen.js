import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const EditGuardScreen = ({ route, navigation }) => {
  const { guard } = route.params;

  const [fullName, setFullName] = useState(guard.fullName || '');
  const [email, setEmail] = useState(guard.email || '');
  const [status, setStatus] = useState(guard.status || '');

  const handleUpdate = async () => {
    if (!fullName.trim() || !email.trim()) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    try {
      await firestore().doc(`users/${guard.id}`).update({
        name: fullName,
        email: email,
        status: status,
      });

      Alert.alert('Success', 'Guard updated successfully');
      navigation.goBack();
    } catch (error) {
      console.log('update error:', error);
      Alert.alert('Error', error.message || 'Update failed');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
        style={styles.input}
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <TextInput
        placeholder="Status"
        value={status}
        onChangeText={setStatus}
        style={styles.input}
      />

      <TouchableOpacity style={styles.btn} onPress={handleUpdate}>
        <Text style={styles.btnText}>Update Guard</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditGuardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 14,
  },
  btn: {
    backgroundColor: '#111',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
  },
});