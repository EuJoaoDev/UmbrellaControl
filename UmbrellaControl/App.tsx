import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../UmbrellaControl/src/screens/LoginScreen';
import HomeScreen from '../UmbrellaControl/src/screens/HomeScreen'; // Crie essa tela Home posteriormente

// Definimos os parâmetros da pilha de navegação
type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }} // Esconde o header
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }} // Esconde o header na tela Home também
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
