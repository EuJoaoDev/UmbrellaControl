import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Alert, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'; // Importação do axios

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  MovementList: undefined; // Adicionei esta linha
  DriverMovementList: undefined; // Adicionei esta linha
};

type LoginScreenProp = StackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigation = useNavigation<LoginScreenProp>();

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const user = await AsyncStorage.getItem('user');

      if (user) {
        const userProfile = JSON.parse(user).profile; // 

        let route = '';

        if (userProfile === 'admin') {
          route = 'Home';
        } else if (userProfile === 'filial') {
          route = 'MovementList'; // Nome da tela para filial
        } else if (userProfile === 'motorista') { // Adicionei esta verificação
          route = 'DriverMovementList'; // Nome da tela para motorista
        }

        navigation.reset({
          index: 0,
          routes: [{ name: route }],
        });
      }
    };
    checkUserLoggedIn();
  }, [navigation]);

  const handleLogin = async () => {
    if (email === '' || password === '') {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    try {
      const response = await axios.post('http://192.168.0.10:3000/login', {
        email,
        password,
      });

      const data = response.data; // Captura a resposta dos dados

      if (response.status === 200) {
        await AsyncStorage.setItem('user', JSON.stringify(data));

        const userProfile = data.profile;

        let route = '';

        if (userProfile === 'admin') {
          route = 'Home';
        } else if (userProfile === 'filial') {
          route = 'MovementList'; 
        } else {
          route = 'DriverMovementList'; 
        }

        navigation.reset({
          index: 0,
          routes: [{ name: route }],
        });
      } else {
        Alert.alert('Erro', 'Credenciais inválidas.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível realizar o login.');
    }
  };

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/Animation - 1729039184843.json')}
        autoPlay
        loop
        style={styles.lottie}
      />

      <Text style={styles.title}>Guarda-Chuva Farmácias</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#A9A9A9"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#A9A9A9"
      />
      <Button
        mode="contained"
        onPress={handleLogin}
        style={styles.button}
        labelStyle={styles.buttonText}
      >
        Entrar
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F5F5',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  lottie: {
    width: 220,
    height: 220,
    alignSelf: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2C8C8C',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#000',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  button: {
    backgroundColor: '#2C8C8C',
    borderRadius: 20,
    paddingVertical: 10,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default LoginScreen;
