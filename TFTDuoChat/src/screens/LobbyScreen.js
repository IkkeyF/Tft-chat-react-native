import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import Button from '../components/Button';
import { useAppContext } from '../context/AppContext';
import { useNavigation } from '@react-navigation/native';

export default function LobbyScreen () {
  const [roomCode, setRoomCode] = useState('');
  const { dispatch } = useAppContext();
  const navigation = useNavigation();

  const handleCreateRoom = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    dispatch({ type: 'CREATE_ROOM', payload: code });
    navigation.navigate('WaitingScreen');
  };

  const handleJoinRoom = () => {
    const code = roomCode.trim().toUpperCase();
    if (code.length !== 6) {
      Alert.alert('Erro', 'Código deve ter 6 caracteres');
      return;
    }
    dispatch({ type: 'JOIN_ROOM', payload: code, partner: 'Seu Duo' });
    navigation.navigate('ChatScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Olá, Invocador!</Text>

      <View style={styles.options}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Criar Sala</Text>
          <Text style={styles.cardSubtitle}>Crie uma nova sala e convide seu duo</Text>
          <Button title="Criar" onPress={handleCreateRoom} />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Entrar em Sala</Text>
          <Text style={styles.cardSubtitle}>Junte-se a uma sala existente</Text>
          <TextInput
            style={styles.codeInput}
            placeholder="Código da sala (6 caracteres)"
            value={roomCode}
            onChangeText={setRoomCode}
            maxLength={6}
            placeholderTextColor="#999"
            textTransform="uppercase"
          />
          <Button title="Entrar" onPress={handleJoinRoom} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f8c537'
  },
  options: {
    flexDirection: 'row',
    padding: 10
  },
  card: {
    flex: 1,
    backgroundColor: '#2d2d3a',
    padding: 20,
    borderRadius: 8,
    margin: 10,
    minWidth: 150,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f8c537',
    marginBottom: 8,
    textAlign: 'center',
  },
  cardSubtitle: {
    color: '#e2e2e2',
    marginBottom: 16,
    textAlign: 'center',
    fontSize: 14,
  },
  codeInput: {
    borderWidth: 1,
    borderColor: '#4a4a5a',
    backgroundColor: '#3a3a4a',
    color: '#e2e2e2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    textAlign: 'center',
    fontSize: 10,
    letterSpacing: 2,
  },
});
