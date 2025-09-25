import { useState } from 'react';
import { View, Text, StyleSheet, Clipboard } from 'react-native';
import Button from '../components/Button';
import { useAppContext } from '../context/AppContext';
import { useNavigation } from '@react-navigation/native';

const WaitingScreen = () => {
  const { state, dispatch } = useAppContext();
  const [copied, setCopied] = useState(false);
  const navigation = useNavigation();

  const handleCopyCode = async () => {
    if (state.currentRoom) {
      await Clipboard.setString(state.currentRoom);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleStartChat = () => {
    navigation.navigate('ChatScreen');
  };

  const handleBack = () => {
    dispatch({ type: 'CREATE_ROOM', payload: null });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Text style={styles.iconText}>⏳</Text>
      </View>
      <Text style={styles.title}>Sala Criada!</Text>
      <Text style={styles.subtitle}>Aguardando seu duo entrar na sala...</Text>

      <View style={styles.codeContainer}>
        <Text style={styles.codeLabel}>Código da Sala:</Text>
        <Text style={styles.code}>{state.currentRoom || 'Gerando...'}</Text>
        <Button
          title={copied ? 'Copiado!' : 'Copiar Código'}
          onPress={handleCopyCode}
          primary={false}
          style={{ width: '80%' }}
        />
      </View>

      <View style={styles.usersContainer}>
        <View style={[styles.userCard, styles.host]}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>H</Text>
          </View>
          <View>
            <Text style={styles.username}>Você</Text>
            <Text style={styles.role}>Host</Text>
          </View>
        </View>

        <View style={[styles.userCard, styles.guest]}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>D</Text>
          </View>
          <View>
            <Text style={styles.username}>Aguardando duo</Text>
            <Text style={styles.role}>Vazio</Text>
          </View>
        </View>
      </View>


      <Button title="Iniciar Chat Overlay" onPress={handleStartChat} />

      <Button title="Voltar" onPress={handleBack} primary={false} style={{ marginTop: 10 }} />
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
  icon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#3a3a4a',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconText: {
    fontSize: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f8c537',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#e2e2e2',
    marginBottom: 30,
    textAlign: 'center',
    lineHeight: 22,
  },
  codeContainer: {
    backgroundColor: '#2d2d3a',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 30,
  },
  codeLabel: {
    color: '#999',
    marginBottom: 10,
  },
  code: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#f8c537',
    letterSpacing: 4,
    marginBottom: 15,
  },
  usersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 30,
  },
  userCard: {
    backgroundColor: '#3a3a4a',
    padding: 15,
    borderRadius: 8,
    flex: 0.45,
    flexDirection: 'row',
    alignItems: 'center',
  },
  host: {
    borderColor: '#f8c537',
    borderWidth: 2,
  },
  guest: {
    borderColor: '#4a4a5a',
    borderWidth: 2,
    backgroundColor: '#202029ff',
  },
  empty: {
    opacity: 0.5,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8c537',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: {
    color: '#1a1a2e',
    fontWeight: 'bold',
    fontSize: 16,
  },
  username: {
    fontWeight: '600',
    color: '#e2e2e2',
    marginBottom: 4,
  },
  role: {
    fontSize: 12,
    color: '#999',
  },
});

export default WaitingScreen;