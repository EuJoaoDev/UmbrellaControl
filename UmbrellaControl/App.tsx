// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import UserListScreen from './src/screens/UserListScreen';
import UserRegisterScreen from './src/screens/UserRegisterScreen';
import ProductListScreen from './src/screens/ProductListScreen';
import MovementListScreen from './src/screens/MovementListScreen';
import MovementScreen from './src/screens/MovementScreen';
import DriverMovementListScreen from './src/screens/DriverMovementListScreen'

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Tela de Login */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
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

        {/* Tela de Listagem de Produtos */}
        <Stack.Screen
          name="ProductList"
          component={ProductListScreen}
          options={{ title: 'Listagem de Produtos' }}
        />

        {/* Tela de Listagem de Movimentações */}
        <Stack.Screen
          name="MovementList"
          component={MovementListScreen}
          options={{ title: 'Movimentações' }}
        />

        {/* Tela de Cadastro de Movimentação */}
        <Stack.Screen
          name="Movement"
          component={MovementScreen}
          options={{ title: 'Cadastrar Movimentação' }}
        />

        {/* Tela de Listagem de Movimentações para Motorista */}
        <Stack.Screen
          name="DriverMovementList"
          component={DriverMovementListScreen}
          options={{ title: 'Movimentações para Motorista' }}
        />

      
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
