import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface HeaderProps {
  userName: string;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ userName, onLogout }) => {
  return (
    <View style={styles.headerContainer}>
      <Icon name="person" size={40} color="#fff" style={styles.profileIcon} />
      <View style={styles.userNameContainer}>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.userName}>{userName}</Text>
      </View>
      <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
        <Icon name="logout" size={24} color="#fff" />
      </TouchableOpacity>
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
    alignItems: 'flex-start',
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
  logoutButton: {
    marginLeft: 10,
  },
});

export default Header;
