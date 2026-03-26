import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/slices/authSlice';

const ProfileScreen = () => {
  const dispatch = useDispatch();

  const user = useSelector(state => state.auth.user);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
           onPress: () => {
          setTimeout(() => {
            dispatch(logoutUser());
          }, 100);
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.topSection}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
            }}
            style={styles.avatar}
          />
          <Text style={styles.name}>{user?.name || 'Guard User'}</Text>
          <Text style={styles.email}>{user?.email || 'guard@email.com'}</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.cardTitle}>Profile Information</Text>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Full Name</Text>
            <Text style={styles.value}>{user?.name || 'Guard User'}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{user?.email || 'guard@email.com'}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Role</Text>
            <Text style={styles.value}>{user?.role || 'Guard'}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Phone</Text>
            <Text style={styles.value}>{user?.phone || '+44 0000000000'}</Text>
          </View>
        </View>

        <View style={styles.buttonSection}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionText}>Change Password</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.logoutButton]}
            onPress={handleLogout}>
            <Text style={[styles.actionText, styles.logoutText]}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  topSection: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#0A84FF',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  avatar: {
    width: 95,
    height: 95,
    borderRadius: 50,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
  },
  email: {
    fontSize: 14,
    color: '#EAF3FF',
    marginTop: 4,
  },
  infoCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 16,
    padding: 16,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
    marginBottom: 16,
  },
  infoRow: {
    marginBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  label: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  value: {
    fontSize: 15,
    color: '#111',
    fontWeight: '500',
  },
  buttonSection: {
    marginTop: 22,
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  actionButton: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
  },
  actionText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111',
  },
  logoutButton: {
    backgroundColor: '#FFEAEA',
  },
  logoutText: {
    color: '#D11A2A',
  },
});