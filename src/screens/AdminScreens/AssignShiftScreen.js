import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Platform,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Dropdown } from 'react-native-element-dropdown';

const AssignShiftScreen = () => {
  const [guards, setGuards] = useState([]);
  const [selectedGuard, setSelectedGuard] = useState(null);

  const [shiftDate, setShiftDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  useEffect(() => {
    getGuards();
  }, []);

  const getGuards = async () => {
    try {
      const snapshot = await firestore()
        .collection('users')
        .where('role', '==', 'guard')
        .get();
      const guardsList = snapshot.docs.map(doc => ({
        label: doc.data().name || doc.data().email,
        value: doc.id,
        ...doc.data(),
      }));

      setGuards(guardsList);
    } catch (error) {
      console.log('Error fetching guards:', error);
      Alert.alert('Error', 'Failed to load guards');
    }
  };

  const formatDate = date => {
    return date.toISOString().split('T')[0];
  };

  const formatTime = date => {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleAssignShift = async () => {
    if (!selectedGuard) {
      Alert.alert('Error', 'Please select a guard');
      return;
    }

    if (!location.trim()) {
      Alert.alert('Error', 'Please enter location');
      return;
    }

    const guardData = guards.find(item => item.value === selectedGuard);

    try {
      setLoading(true);

      await firestore().collection('shifts').add({
        guardId: selectedGuard,
        guardName: guardData?.name || guardData?.email || 'Guard',
        date: formatDate(shiftDate),
        startTime: formatTime(startTime),
        endTime: formatTime(endTime),
        location: location.trim(),
        notes: notes.trim(),
        status: 'assigned',
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      Alert.alert('Success', 'Shift assigned successfully');

      setSelectedGuard(null);
      setShiftDate(new Date());
      setStartTime(new Date());
      setEndTime(new Date());
      setLocation('');
      setNotes('');
    } catch (error) {
      console.log('Error assigning shift:', error);
      Alert.alert('Error', 'Failed to assign shift');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Assign Shift</Text>

      <Text style={styles.label}>Select Guard</Text>
      <Dropdown
        style={styles.dropdown}
        data={guards}
        labelField="label"
        valueField="value"
        placeholder="Choose Guard"
        value={selectedGuard}
        onChange={item => setSelectedGuard(item.value)}
      />

      <Text style={styles.label}>Select Date</Text>
      <TouchableOpacity
        style={styles.inputButton}
        onPress={() => setShowDatePicker(true)}>
        <Text>{formatDate(shiftDate)}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={shiftDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(Platform.OS === 'ios');
            if (selectedDate) {
              setShiftDate(selectedDate);
            }
          }}
        />
      )}

      <Text style={styles.label}>Start Time</Text>
      <TouchableOpacity
        style={styles.inputButton}
        onPress={() => setShowStartPicker(true)}>
        <Text>{formatTime(startTime)}</Text>
      </TouchableOpacity>

      {showStartPicker && (
        <DateTimePicker
          value={startTime}
          mode="time"
          display="default"
          onChange={(event, selectedTime) => {
            setShowStartPicker(false);
            if (selectedTime) {
              setStartTime(selectedTime);
            }
          }}
        />
      )}

      <Text style={styles.label}>End Time</Text>
      <TouchableOpacity
        style={styles.inputButton}
        onPress={() => setShowEndPicker(true)}>
        <Text>{formatTime(endTime)}</Text>
      </TouchableOpacity>

      {showEndPicker && (
        <DateTimePicker
          value={endTime}
          mode="time"
          display="default"
          onChange={(event, selectedTime) => {
            setShowEndPicker(false);
            if (selectedTime) {
              setEndTime(selectedTime);
            }
          }}
        />
      )}

      <Text style={styles.label}>Location</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter shift location"
        value={location}
        onChangeText={setLocation}
      />

      <Text style={styles.label}>Notes (Optional)</Text>
      <TextInput
        style={[styles.input, styles.notesInput]}
        placeholder="Enter notes"
        value={notes}
        onChangeText={setNotes}
        multiline
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleAssignShift}
        disabled={loading}>
        <Text style={styles.buttonText}>
          {loading ? 'Assigning...' : 'Assign Shift'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AssignShiftScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    color: '#000',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 10,
    color: '#222',
  },
  dropdown: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  inputButton: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  notesInput: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  button: {
    backgroundColor: '#0A84FF',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});