import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';

const getStatusColor = status => {
  switch (status) {
    case 'assigned':
      return 'orange';
    case 'accepted':
      return 'green';
    case 'onDuty':
      return 'blue';
    case 'completed':
      return 'gray';
    case 'cancelled':
      return 'red';
    case 'rejected':
      return 'red';
    default:
      return 'black';
  }
};

const ShiftScreen = ({ navigation }) => {
  const [shift, setshift] = useState([]);
  const user = useSelector(state => state.auth.user);

  useFocusEffect(
    useCallback(() => {
      if (user?.uid) {
        getshifts();
      }
    }, [user])
  );

  const getshifts = async () => {
    try {
      const data = await firestore()
        .collection('shifts')
        .where('guardId', '==', user?.uid)
        .get();

      const shiftsdata = data.docs.map(item => ({
        id: item.id,
        ...item.data(),
      }));

      setshift(shiftsdata);
      console.log('updated shifts:', shiftsdata);
    } catch (error) {
      console.log('shift data error', error);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('ShiftsDetailScreen', { shift: item })}
      >
        <Text style={styles.siteName}>{item.location}</Text>
        <Text style={styles.info}>Date: {item.date}</Text>
        <Text style={styles.info}>
          Time: {item.startTime} - {item.endTime}
        </Text>
        <Text style={[styles.status, { color: getStatusColor(item.status) }]}>
          {item.status}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>My Shifts</Text>

      <FlatList
        data={shift}
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