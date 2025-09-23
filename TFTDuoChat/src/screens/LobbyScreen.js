import { View, Text, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useAppContext } from '../context/AppContext';

const LobbyScreen = ({ navigation }) => {
  const { state, dispatch } = useAppContext();

  const initialState = {
    currentUser: null,
    currentRoom: null,
  };

  const handleCreateRoom = () => {
    const roomCode = 'ROOM' + Math.random().toString(36).substr(2, 4).toUpperCase();
    dispatch({ type: 'CREATE_ROOM', payload: roomCode });
    Alert.alert('Sala Criada!', `Seu código: ${roomCode}\nCompartilhe com seu duo!`);
    navigation.navigate('WaitingScreen');  // Navega para WaitingScreen
  };

  const handleJoinRoom = () => {
    Alert.prompt(
      'Entrar em Sala',
      'Digite o código da sala (ex: ROOM1234):',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Entrar',
          onPress: (code) => {
            if (code && code.length >= 4) {
              dispatch({ type: 'JOIN_ROOM', payload: code.toUpperCase(), partner: 'Seu Duo' });
              navigation.navigate('WaitingScreen');  // Navega para WaitingScreen
            } else {
              Alert.alert('Erro', 'Código inválido! Deve ter pelo menos 4 caracteres.');
            }
          },
        },
      ],
      'plain-text'
    );
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigation.navigate('Home');  // Volta para tela inicial
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Olá, {currentUser  || 'Invocador'}!</Text>
      <Text style={styles.subtitle}>Encontre seu duo perfeito para TFT</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleCreateRoom}>
          <Text style={styles.buttonText}>Criar Sala</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleJoinRoom}>
          <Text style={styles.buttonText}>Entrar em Sala</Text>
        </TouchableOpacity>

        {currentRoom && (
          <Text style={styles.roomInfo}>Sala Atual: {currentRoom}</Text>
        )}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    padding: 20,
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f8c537',  // Cor dourada TFT
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 40,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#f8c537',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#1a1a2e',
    fontSize: 18,
    fontWeight: 'bold',
  },
  roomInfo: {
    color: '#fff',
    fontSize: 14,
    marginTop: 20,
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: '#ff4757',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default LobbyScreen;