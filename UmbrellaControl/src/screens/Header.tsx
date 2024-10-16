import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

interface HeaderProps {
  userName: string;
  userProfileImage: string;
}

const Header: React.FC<HeaderProps> = ({ userName, userProfileImage }) => {
  return (
    <View style={styles.headerContainer}>
      <Image source={{ uri: userProfileImage }} style={styles.profileImage} />
      <View style={styles.userNameContainer}>
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
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userNameContainer: {
    flex: 1, // Ocupar espaço restante para centralizar o texto
    alignItems: 'center', // Centraliza horizontalmente
  },
  userName: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center', // Centraliza o texto
  },
});

export default Header;
