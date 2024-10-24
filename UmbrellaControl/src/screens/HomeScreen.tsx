import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from './Header';

type RootStackParamList = {
  Products: undefined;
  Users: undefined;
  Home: undefined;
};

type HomeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const [user, setUser] = useState<{ name: string; profile: string } | null>(null);
  const navigation = useNavigation<HomeScreenProp>();

  useEffect(() => {
    const loadUserData = async () => {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    };
    loadUserData();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('user'); // Remove o usuário do AsyncStorage
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }], // Redireciona para a tela de login
    });
  };

  return (
    <View style={styles.container}>
      {user && <Header userName={user.name} onLogout={handleLogout} />}

      <View style={styles.buttonsContainer}>
        {/* Botão de Listagem de Produtos */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ProductList')}
        >
          <Icon name="list" size={24} color="#fff" style={styles.icon} />
          <Text style={styles.buttonText}>Listagem de Produtos</Text>
        </TouchableOpacity>

        {/* Botão de Gerenciamento de Usuários */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('UserList')}
        >
          <Icon name="group" size={24} color="#fff" style={styles.icon} />
          <Text style={styles.buttonText}>Gerenciar Usuários</Text>
        </TouchableOpacity>


      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 80, // Adicionei um paddingTop para acomodar o Header
  },
  buttonsContainer: {
    marginTop: 40,
    width: '80%',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 15,
    backgroundColor: '#2C8C8C',
    borderRadius: 20,
    marginBottom: 20,
    elevation: 5,
  },
  icon: {
    marginRight: 10, // Espaçamento entre ícone e texto
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
