import { View, Text, StyleSheet } from 'react-native';

const MessageBubble = ({ message, isMe }) => {
  return (
    <View style={[styles.container, isMe ? styles.sent : styles.received]}>
      {!isMe && <Text style={styles.sender}>{message.user}</Text>}
      <View style={[styles.bubble, isMe ? styles.sentBubble : styles.receivedBubble]}>
        <Text style={[styles.text, isMe ? styles.sentText : styles.receivedText]}>
          {message.text}
        </Text>
        <Text style={styles.timestamp}>{message.timestamp}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    maxWidth: '80%',
  },
  sent: {
    alignSelf: 'flex-end',
  },
  received: {
    alignSelf: 'flex-start',
  },
  sender: {
    fontSize: 12,
    color: '#f8c537',
    marginBottom: 4,
    alignSelf: 'flex-start',
  },
  bubble: {
    padding: 12,
    borderRadius: 12,
  },
  sentBubble: {
    backgroundColor: '#f8c537',
  },
  receivedBubble: {
    backgroundColor: '#3a3a4a',
  },
  text: {
    fontSize: 16,
    lineHeight: 20,
  },
  sentText: {
    color: '#1a1a2e',
  },
  receivedText: {
    color: '#e2e2e2',
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
});

export default MessageBubble;