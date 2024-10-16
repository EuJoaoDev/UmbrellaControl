import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';  // Importar sua tela de login
import HomeScreen from './src/screens/HomeScreen';    // Importar sua tela Home
import UserListScreen from './src/screens/UserListScreen';  // Importar a tela de listagem de usuários
import UserRegisterScreen from './screens/UserRegisterScreen';  // Importar a tela de cadastro de usuários (placeholder)

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Tela de Login */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}  // Remover o header nativo
        />
        
        {/* Tela Home */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}  // Remover o header nativo
        />
        
        {/* Tela de Listagem de Usuários */}
        <Stack.Screen
          name="UserList"
          component={UserListScreen}
          options={{ title: 'Usuários' }}  // Aqui você pode customizar o header se quiser
        />
        
        {/* Tela de Cadastro de Usuários */}
        <Stack.Screen
          name="UserRegister"
          component={UserRegisterScreen}
          options={{ title: 'Cadastrar Usuário' }}  // Aqui você pode customizar o header
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
