import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';  // Importando a tela de Login
import HomeScreen from './src/screens/HomeScreen';    // Importando a tela de Home
import UserListScreen from './src/screens/UserListScreen';  // Importando a tela de Listagem de Usuários
import UserRegisterScreen from './src/screens/UserRegisterScreen';  // Importando a tela de Cadastro de Usuário

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="UserList">
        {/* Tela de Login */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }} // Sem cabeçalho na tela de login
        />
        
        {/* Tela Home */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Home' }}
        />
        
        {/* Tela de Listagem de Usuários */}
        <Stack.Screen
          name="UserList"
          component={UserListScreen}
          options={{ title: 'Usuários' }}
        />
        
        {/* Tela de Cadastro de Usuário */}
        <Stack.Screen
          name="UserRegister"
          component={UserRegisterScreen}
          options={{ title: 'Criar Usuário' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

