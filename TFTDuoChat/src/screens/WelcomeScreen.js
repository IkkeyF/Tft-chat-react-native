import { View, Text, StyleSheet, Image } from 'react-native';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {
  const navigation = useNavigation();

  const handleLogin = () => navigation.navigate('Login');
  const handleRegister = () => navigation.navigate('Register');

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://placehold.co/150x50/1a1a2e/ffffff?text=TFT+Duo+Chat' }}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Chat Overlay para TFT</Text>
      <Text style={styles.subtitle}>Converse com seu duo durante as partidas</Text>
      <View style={styles.buttonContainer}>
        <Button title="Entrar" onPress={handleLogin} />
        <Button title="Criar Conta" onPress={handleRegister} primary={false} />
      </View>
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
  logo: {
    width: 150,
    height: 50,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#f8c537',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#e2e2e2',
    marginBottom: 40,
    textAlign: 'center',
    lineHeight: 22,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
  },
});

export default WelcomeScreen;