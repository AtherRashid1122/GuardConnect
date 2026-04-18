import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import firestore from '@react-native-firebase/firestore'
const GuardsScreen = ({ navigation }) => {
  const [search, setSearch] = useState('');
  // const [guards, setGuards] = useState([
  //   {
  //     id: '1',
  //     name: 'Ali Khan',
  //     email: 'ali@gmail.com',
  //     role: 'Guard',
  //     status: 'Active',
  //   },
  //   {
  //     id: '2',
  //     name: 'Ahmed Raza',
  //     email: 'ahmed@gmail.com',
  //     role: 'Guard',
  //     status: 'Off Duty',
  //   },
  //   {
  //     id: '3',
  //     name: 'Usman Tariq',
  //     email: 'usman@gmail.com',
  //     role: 'Guard',
  //     status: 'Active',
  //   },
  // ]);
  const [guards, setGuards] = useState([])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('AddGuardScreen')}
          style={{ marginRight: 15 }}
        >
          <Text style={{ fontSize: 16, fontWeight: '600' }}>+ Add</Text>
        </TouchableOpacity>

      ),
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginRight: 15 }}
        >
          <Ionicons name="arrow-back" size={20} color="#000" />
        </TouchableOpacity>

      ),
    });
  }, [navigation]);
  useEffect(() => {
    const unsubscribe = firestore()
      .collection('users')
      .where('role', '==', 'guard')
      .onSnapshot(snapshot => {
        const guardList = snapshot.docs.map(doc => {
          const data = doc.data();

          return {
            id: doc.id,
            fullName: data.name || '',
            email: data.email || '',
            role: data.role || '',
            status: data.status || '',
          };
        });

        console.log('guardList:', guardList);
        setGuards(guardList);
      });

    return () => unsubscribe();
  }, [])
  const filteredata = guards.filter(item => item.fullName.toLowerCase().includes(search.toLowerCase()))
  const handleDelete = async (id) => {
    console.log('delete', id)
    try {

      // await firestore.collection('users').doc(id).delete();
      await firestore().doc(`users/${id}`).delete();
      console.log("Guard Deleted Seccessfully")

    } catch (error) {
      console.log('error', error)
      Alert.alert("Error", "Failed to delted guard")
    }
  }
  const renderItem = ({ item }) => (

    <View style={styles.card}>
      <View style={styles.rowBetween}>
        <View>
          <Text style={styles.name}>{item.fullName}</Text>
          <Text style={styles.email}>{item.email}</Text>
          <Text style={styles.role}>{item.status}</Text>
        </View>

        <View style={styles.statusBox}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.editBtn} onPress={() => navigation.navigate('EditGuardScreen', { guard: item })}>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteBtn} onPress={() => handleDelete(item.id)}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.editBtn}
          onPress={() =>
            navigation.navigate('Chat', {
              otherUserId: item.id, // 👈 guard id
            })
          }>
          <Text style={styles.editText}>Chat</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search guard..."
        value={search}
        onChangeText={setSearch}
        style={styles.searchInput}
      />

      <FlatList
        data={filteredata}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default GuardsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F8FB',
    padding: 16,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 16,
    fontSize: 15,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111',
  },
  email: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  role: {
    fontSize: 13,
    color: '#888',
    marginTop: 4,
  },
  statusBox: {
    alignSelf: 'flex-start',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: '#2E7D32',
    fontSize: 12,
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 14,
    gap: 10,
  },
  editBtn: {
    flex: 1,
    backgroundColor: '#111',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  deleteBtn: {
    flex: 1,
    backgroundColor: '#FDECEC',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  editText: {
    color: '#fff',
    fontWeight: '600',
  },
  deleteText: {
    color: '#D32F2F',
    fontWeight: '600',
  },
});