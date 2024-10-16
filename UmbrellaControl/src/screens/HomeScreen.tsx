import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
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

  return (
    <View style={styles.container}>
      {user && <Header userName={user.name} userProfileImage={user.profile} />}

      <View style={styles.buttonsContainer}>
        {/* Botão de Listagem de Produtos */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Products')}
        >
          <Icon name="list" size={24} color="#fff" style={styles.icon} />
          <Text style={styles.buttonText}>Listagem de Produtos</Text>
        </TouchableOpacity>

        {/* Botão de Gerenciamento de Usuários */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Users')}
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
