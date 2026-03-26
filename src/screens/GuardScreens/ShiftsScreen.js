import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const dummyShifts = [
  {
    id: '1',
    siteName: 'London Mall',
    date: '27 Mar 2026',
    startTime: '09:00 AM',
    endTime: '05:00 PM',
    status: 'upcoming',
  },
  {
    id: '2',
    siteName: 'Canary Wharf',
    date: '28 Mar 2026',
    startTime: '10:00 AM',
    endTime: '06:00 PM',
    status: 'completed',
  },
  {
    id: '3',
    siteName: 'Westfield Mall',
    date: '29 Mar 2026',
    startTime: '12:00 PM',
    endTime: '08:00 PM',
    status: 'cancelled',
  },
];

const getStatusColor = status => {
  switch (status) {
    case 'upcoming':
      return 'green';
    case 'completed':
      return 'gray';
    case 'cancelled':
      return 'red';
    default:
      return 'black';
  }
};

const ShiftScreen = () => {
  const renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <Text style={styles.siteName}>{item.siteName}</Text>
        <Text style={styles.info}>Date: {item.date}</Text>
        <Text style={styles.info}>
          Time: {item.startTime} - {item.endTime}
        </Text>
        <Text style={[styles.status, { color: getStatusColor(item.status) }]}>
          {item.status}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>My Shifts</Text>

      <FlatList
        data={dummyShifts}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default ShiftScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    elevation: 3,
  },
  siteName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  info: {
    fontSize: 14,
    color: '#555',
    marginTop: 3,
  },
  status: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
});