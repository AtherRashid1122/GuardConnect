import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';

const ChatScreen = ({ route }) => {

  const otherUserId = route?.params?.otherUserId;

  const currentUser = useSelector(state => state.auth.user);

  const [chatId, setChatId] = useState(null);
  const [messages, setmessages] = useState([]);
  const [messageText, setMessageText] = useState('');
console.log("currentUser:", currentUser?.uid);
console.log("otherUserId:", otherUserId);
console.log("chatId:", chatId);
  
  const getOrCreateChat = async (user1, user2) => {
    const participants = [user1, user2].sort();
    const chatKey = participants.join('_');

    const snapshot = await firestore()
      .collection('chats')
      .where('chatKey', '==', chatKey)
      .get();

    if (!snapshot.empty) {
      return snapshot.docs[0].id;
    }

    const newChat = await firestore().collection('chats').add({
      participants,
      chatKey, 
      createdAt: firestore.FieldValue.serverTimestamp(),
    });

    return newChat.id;
  };

  
  useEffect(() => {
    if (!currentUser?.uid || !otherUserId) return;

    const init = async () => {
      const id = await getOrCreateChat(currentUser.uid, otherUserId);
      console.log("CHAT ID:", id);
      setChatId(id);
    };

    init();
  }, [currentUser, otherUserId]);

  
  useEffect(() => {
    if (!chatId) return;

    const unsubscribe = firestore()
      .collection('messages')
      .where('chatId', '==', chatId)
      .onSnapshot(snapshot => {
            if (!snapshot || !snapshot.docs) {
          console.log(" snapshot null");
          return;
        }
        const msgs = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  console.log("MESSAGES:", msgs); 

  setmessages(msgs);
});

    return () => unsubscribe();
  }, [chatId]);


  const handleSend = async () => {
    if (!messageText.trim() || !chatId) return;

    await firestore().collection('messages').add({
      chatId,
      text: messageText,
      senderId: currentUser.uid,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });

    setMessageText('');
  };


  const renderItem = ({ item }) => {
    const isMe = item.senderId === currentUser.uid;

    return (
      <View style={{ flexDirection: 'row', justifyContent: isMe ? 'flex-end' : 'flex-start' }}>
        <View style={[
          styles.messageBubble,
          isMe ? styles.guardBubble : styles.adminBubble
        ]}>
          <Text style={styles.messageText}>{item.text}</Text>

          <Text style={styles.timeText}>
            {item.createdAt?.toDate().toLocaleTimeString() || ''}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>

      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.chatList}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type message..."
          value={messageText}
          onChangeText={setMessageText}
        />

        <TouchableOpacity
          style={styles.sendButton}
          onPress={handleSend}
          disabled={!chatId}
        >
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },

  chatList: {
    padding: 12,
    paddingBottom: 10,
  },


  messageBubble: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 14,
    marginBottom: 8,
  },


  guardBubble: {
    backgroundColor: '#0A84FF',
    borderBottomRightRadius: 4,
  },


  adminBubble: {
    backgroundColor: '#E4E7EB',
    borderBottomLeftRadius: 4,
  },

  messageText: {
    fontSize: 15,
    color: '#111',
  },

  timeText: {
    fontSize: 11,
    color: '#555',
    marginTop: 6,
    alignSelf: 'flex-end',
  },

 
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },

  input: {
    flex: 1,
    backgroundColor: '#F1F3F5',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 15,
  },

  sendButton: {
    marginLeft: 10,
    backgroundColor: '#0A84FF',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  sendText: {
    color: '#fff',
    fontWeight: '600',
  },
});
export default ChatScreen;