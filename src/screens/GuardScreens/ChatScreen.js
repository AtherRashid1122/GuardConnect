import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const ChatScreen = () => {
  const [messageText, setMessageText] = useState('');

  const [messages, setmessages] = useState([
    {
      id: 1,
      text: 'Hi what time my shift tomorrow',
      sender: 'guard',
      time: '09:30 AM'
    },
    {
      id: 2,
      text: 'Your Shift start tomorrow 08:00 AM',
      sender: 'admin',
      time: '09:32 AM'
    }, {
      id: 3,
      text: 'ok Thanks',
      sender: 'guard',
      time: '09:33 AM'
    }
  ])
  const renderItem = ({ item }) => {
    const isGuard = item.sender === 'guard';
    return (
      <View style={{ flexDirection: 'row', justifyContent: isGuard ? 'flex-end' : 'flex-start' }}>
        <View style={[styles.messageBubble, isGuard ? styles.guardBubble : styles.adminBubble]} >
          <Text style={styles.messageText}>{item.text}</Text>
          <Text style={styles.timeText}>{item.time}</Text>

        </View>
      </View >
    )

  }
  const handleSend = () => {
    if (!messageText.trim()) return;
    const newmessage = {
      id: Date.now.toString(),
      text: messageText,
      sender: 'guard',
      time: 'Now'

    }
    setmessages(item=>[...item,newmessage])
    setMessageText('')
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chat</Text>
        <Text style={styles.headerSubtitle}>Admin Support</Text>
      </View>
      <FlatList data={messages}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.chatList}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={messageText}
          onChangeText={setMessageText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
      <View />

    </SafeAreaView>
  )
}

export default ChatScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#0A84FF',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#EAF3FF',
    marginTop: 2,
  },
  chatList: {
    padding: 12,
  },
  messageWrapper: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  messageBubble: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 14,
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
  },
  sendText: {
    color: '#fff',
    fontWeight: '600',
  },
});