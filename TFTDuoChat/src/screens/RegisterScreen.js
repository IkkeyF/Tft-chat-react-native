import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, ScrollView, Switch } from 'react-native';
import Button from '../components/Button';
import { useAppContext } from '../context/AppContext';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
  const [summonerName, setSummonerName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const { dispatch } = useAppContext();
  const navigation = useNavigation();

  const handleRegister = () => {
    if (!summonerName || !email || !password || !confirmPassword) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }
    if (!termsAccepted) {
      Alert.alert('Erro', 'Você deve aceitar os termos de serviço');
      return;
    }
    // Simulação de registro
    dispatch({ type: 'LOGIN', payload: summonerName });
    Alert.alert('Sucesso', 'Conta criada! Faça login.');
    navigation.navigate('Main');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Criar Conta</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome de Invocador"
          value={summonerName}
          onChangeText={setSummonerName}
          placeholderTextColor="#999"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholderTextColor="#999"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#999"
        />
        <TextInput
          style={styles.input}
          placeholder="Confirmar Senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          placeholderTextColor="#999"
        />
        <View style={styles.termsContainer}>
          <Switch value={termsAccepted} onValueChange={setTermsAccepted} trackColor={{ true: '#f8c537' }} />
          <Text style={styles.termsText}>
            Eu concordo com os{' '}
            <Text style={styles.link}>Termos de Serviço</Text>
          </Text>
        </View>
        <Button title="Criar Conta" onPress={handleRegister} />
        <Text style={styles.footer}>
          Já tem conta?{' '}
          <Text onPress={() => navigation.navigate('Login')} style={styles.link}>
            Faça login
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  innerContainer: {
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f8c537',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#4a4a5a',
    backgroundColor: '#2d2d3a',
    color: '#e2e2e2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  termsText: {
    color: '#e2e2e2',
    marginLeft: 8,
    flex: 1,
  },
  link: {
    color: '#f8c537',
    fontWeight: '600',
  },
  footer: {
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default RegisterScreen;