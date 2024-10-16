import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Alert, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importe o ícone

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
};

type LoginScreenProp = StackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [userType, setUserType] = useState<string>(''); // Estado para tipo de usuário
  const navigation = useNavigation<LoginScreenProp>();

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      }
    };
    checkUserLoggedIn();
  }, []);

  const handleLogin = async () => {
    if (email === '' || password === '' || userType === '') { // Adicione a verificação do tipo de usuário
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    try {
      const response = await fetch('http://192.168.0.10:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          userType, // Inclua o tipo de usuário na requisição
        }),
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem('user', JSON.stringify(data));
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
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
      {/* Animação Lottie */}
      <LottieView
        source={require('../../assets/Animation - 1729039184843.json')}
        autoPlay
        loop
        style={styles.lottie}
      />

      <Text style={styles.title}>Guarda-Chuva Farmácias</Text>

      <View style={styles.inputContainer}>
        <Icon name="person" size={20} color="#A9A9A9" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Tipo de Usuário"
          value={userType}
          onChangeText={setUserType}
          placeholderTextColor="#A9A9A9"
        />
      </View>

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
    width: 350,
    height: 350,
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#000',
    flex: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  icon: {
    position: 'absolute',
    left: 20,
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
