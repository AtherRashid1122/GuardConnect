import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

const HomeScreen = ({ navigation }) => {
  const user = useSelector(state => state.auth.user);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Good Morning</Text>
        <Text style={styles.name}>{user?.email || 'Guard User'}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Today's Status</Text>
        <Text style={styles.status}>Off Duty</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Next Shift</Text>
        <Text style={styles.site}>London Site A</Text>
        <Text style={styles.info}>27 Mar 2026</Text>
        <Text style={styles.info}>9:00 AM - 5:00 PM</Text>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => navigation.navigate('Shift')}
        >
          <Text style={styles.actionText}>View Shifts</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => navigation.navigate('Chat')}
        >
          <Text style={styles.actionText}>Open Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.actionText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  greeting: {
    fontSize: 18,
    color: '#666',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
   elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  status: {
    fontSize: 18,
    fontWeight: '600',
    color: 'green',
  },
  site: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
    marginBottom: 6,
  },
  info: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
  },
  actionsContainer: {
    marginTop: 10,
  },
  actionBtn: {
    backgroundColor: '#000',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  actionText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});