import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import MessageBubble from '../components/MessageBubble';
import { useAppContext } from '../context/AppContext';
import { useNavigation } from '@react-navigation/native';

const ChatScreen = () => {
  const [messageText, setMessageText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { state, dispatch } = useAppContext();
  const navigation = useNavigation();
  const flatListRef = useRef();

  useEffect(() => {
    // Mensagem de boas-vindas
    const welcomeMsg = {
      id: Date.now().toString(),
      text: `Bem-vindo à sala ${state.currentRoom}! Converse sobre TFT com seu duo.`,
      user: 'Sistema',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: false,
    };
    dispatch({ type: 'ADD_MESSAGE', payload: welcomeMsg });

    // Simula mensagem do duo se for host
    if (state.isHost) {
      setTimeout(() => {
        const duoMsg = {
          id: (Date.now() + 1).toString(),
          text: 'Oi! Pronto pra ranked? Qual comp vamos fazer?',
          user: state.partner,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isMe: false,
        };
        dispatch({ type: 'ADD_MESSAGE', payload: duoMsg });
      }, 1000);
    }
  }, []);

  const sendMessage = () => {
    if (!messageText.trim()) return;

    const myMsg = {
      id: Date.now().toString(),
      text: messageText,
      user: state.currentUser ,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
    };
    dispatch({ type: 'ADD_MESSAGE', payload: myMsg });
    setMessageText('');

    // Simula resposta do duo (baseado em palavras-chave TFT)
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const response = getTFTResponse(messageText.toLowerCase());
        const duoMsg = {
          id: (Date.now() + 1).toString(),
          text: response,
          user: state.partner || 'Seu Duo',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isMe: false,
        };
        dispatch({ type: 'ADD_MESSAGE', payload: duoMsg });
      }, 1500 + Math.random() * 1000);
    }, 500);
  };

  const getTFTResponse = (text) => {
    const responses = {
      oi: ['Oi! Vamos de fast 8?', 'E aí! Qual patch estamos jogando?'],
      time: ['KogMaw + Blitzcrank é broken esse patch!', 'Prefiro reroll no nível 4 com Warwick.'],
      comp: ['Mystic com Zoe e Syndra tá forte no meta atual.', 'Dark Star full damage ou tank frontline?'],
      item: ['Guinsoo no carry é essencial!', 'Rabadon + Archangel no mage.'],
      econ: ['Econ até stage 3-2 e depois roll.', 'Hyper roll no early game pra snowball.'],
    };

    for (const [key, msgs] of Object.entries(responses)) {
      if (text.includes(key)) {
        return msgs[Math.floor(Math.random() * msgs.length)];
      }
    }

    // Resposta genérica
    const defaults = ['Concordo! Bora focar late game.', 'Entendi, vou de frontline tank.', 'Vamos nessa!'];
    return defaults[Math.floor(Math.random() * defaults.length)];
  };

  const renderMessage = ({ item }) => (
    <MessageBubble message={item} isMe={item.isMe} />
  );

  const keyExtractor = (item) => item.id;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <View style={styles.header}>
        <Text style={styles.roomTitle}>Sala: {state.currentRoom}</Text>
        {isTyping && <Text style={styles.typing}>Seu duo está digitando...</Text>}
      </View>

      <FlatList
        ref={flatListRef}
        data={state.messages}
        renderItem={renderMessage}
        keyExtractor={keyExtractor}
        style={styles.messagesList}
        contentContainerStyle={styles.messagesContainer}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={messageText}
          onChangeText={setMessageText}
          placeholder="Digite sua mensagem sobre TFT..."
          placeholderTextColor="#999"
          multiline
          onSubmitEditing={sendMessage}
        />
        <Button title="Enviar" onPress={sendMessage} style={styles.sendButton} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  header: {
    backgroundColor: '#2d2d3a',
    padding: 15,
    alignItems: 'center',
  },
  roomTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f8c537',
  },
  typing: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
  },
  messagesList: {
    flex: 1,
    padding: 10,
  },
  messagesContainer: {
    paddingBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#2d2d3a',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#4a4a5a',
    backgroundColor: '#3a3a4a',
    color: '#e2e2e2',
    padding: 12,
    borderRadius: 20,
    marginRight: 10,
    maxHeight: 100,
    fontSize: 16,
  },
  sendButton: {
    width: 80,
    height: 44,
  },
});

export default ChatScreen;