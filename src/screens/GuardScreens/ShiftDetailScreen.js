import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import firestore from '@react-native-firebase/firestore';

const ShiftDetailScreen = ({ route, navigation }) => {
  const { shift } = route?.params;
  const [loading, setLoading] = useState(false);

  const handleUpdateStatus = async (newStatus) => {
    try {
      setLoading(true);

      await firestore()
        .collection('shifts')
        .doc(shift.id)
        .update({
          status: newStatus,
        });
      Alert.alert('Success', `Shift ${newStatus} successfully`);
      navigation.goBack();
    } catch (error) {
      console.log('shift status update error', error);
      Alert.alert('Error', 'Failed to update shift status');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Shift Details</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Location</Text>
          <Text style={styles.value}>{shift.location || 'N/A'}</Text>

          <Text style={styles.label}>Date</Text>
          <Text style={styles.value}>{shift.date || 'N/A'}</Text>

          <Text style={styles.label}>Start Time</Text>
          <Text style={styles.value}>{shift.startTime || 'N/A'}</Text>

          <Text style={styles.label}>End Time</Text>
          <Text style={styles.value}>{shift.endTime || 'N/A'}</Text>

          <Text style={styles.label}>Status</Text>
          <Text style={styles.value}>{shift.status || 'N/A'}</Text>

          <Text style={styles.label}>Notes</Text>
          <Text style={styles.value}>{shift.notes ? shift.notes : 'No notes'}</Text>

          <Text style={styles.label}>Guard Name</Text>
          <Text style={styles.value}>{shift.guardName || 'N/A'}</Text>
        </View>

        {shift?.status === 'assigned' && (
          <>
            <TouchableOpacity
              style={[styles.button, styles.acceptButton]}
              onPress={() => handleUpdateStatus('accepted')}
              disabled={loading}>
              <Text style={styles.buttonText}>
                {loading ? 'Updating...' : 'Accept Shift'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.rejectButton]}
              onPress={() => handleUpdateStatus('rejected')}
              disabled={loading}>
              <Text style={styles.buttonText}>
                {loading ? 'Updating...' : 'Reject Shift'}
              </Text>
            </TouchableOpacity>
          </>
        )}

        {shift?.status === 'accepted' && (
          <TouchableOpacity
            style={[styles.button, styles.startButton]}
            onPress={() => handleUpdateStatus('onDuty')}
            disabled={loading}>
            <Text style={styles.buttonText}>
              {loading ? 'Updating...' : 'Start Duty'}
            </Text>
          </TouchableOpacity>
        )}

        {shift?.status === 'onDuty' && (
          <TouchableOpacity
            style={[styles.button, styles.completeButton]}
            onPress={() => handleUpdateStatus('completed')}
            disabled={loading}>
            <Text style={styles.buttonText}>
              {loading ? 'Updating...' : 'End Duty'}
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ShiftDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F8FB',
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    elevation: 3,
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
    marginTop: 12,
  },
  value: {
    fontSize: 15,
    color: '#555',
    marginTop: 4,
  },
  button: {
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  acceptButton: {
    backgroundColor: 'green',
  },
  rejectButton: {
    backgroundColor: 'red',
  },
  startButton: {
    backgroundColor: '#0A84FF',
  },
  completeButton: {
    backgroundColor: '#222',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});