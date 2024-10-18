import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Certifique-se de que esta biblioteca está instalada

interface HeaderProps {
  userName: string;
  userProfileImage?: string; // Se não for necessário, pode ser removido
}

const Header: React.FC<HeaderProps> = ({ userName }) => {
  return (
    <View style={styles.headerContainer}>
      <Icon name="person" size={40} color="#fff" style={styles.profileIcon} />
      <View style={styles.userNameContainer}>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.userName}>{userName}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#2C8C8C',
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  profileIcon: {
    marginRight: 10,
  },
  userNameContainer: {
    flex: 1,
    alignItems: 'flex-start', // Alinha o texto à esquerda
  },
  greeting: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Header;
