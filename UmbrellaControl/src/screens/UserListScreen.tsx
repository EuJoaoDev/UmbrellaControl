import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Para os ícones
import axios from 'axios'; // Para requisições GET e PUT

type User = {
  id: number;
  name: string;
  type: string;
  status: boolean; // Ativo ou desativado
};

const UserListScreen = () => {
  const [users, setUsers] = useState<User[]>([]);
  const navigation = useNavigation();

  // Função para carregar os usuários quando a tela for aberta
  useEffect(() => {
    axios.get('/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error(error));
  }, []);

  // Função para alterar o status do usuário
  const toggleStatus = (id: number, currentStatus: boolean) => {
    axios.put(`/users/${id}/status`, { status: !currentStatus })
      .then(() => {
        setUsers(prevUsers => 
          prevUsers.map(user => 
            user.id === id ? { ...user, status: !user.status } : user
          )
        );
      })
      .catch(error => console.error(error));
  };

  // Renderizar cada item (usuário) da lista
  const renderItem = ({ item }: { item: User }) => {
    return (
      <View style={[styles.card, item.status ? styles.activeUser : styles.inactiveUser]}>
        <View style={styles.userInfo}>
          <Icon name={item.type === 'Motoboy' ? 'motorcycle' : 'store'} size={24} color="#555" />
          <Text style={styles.userName}>{item.name}</Text>
        </View>
        <View style={styles.userDetails}>
          <Text style={styles.userType}>Loja 10 - Buriti</Text> {/* Exemplo de loja */}
          <Switch
            value={item.status}
            onValueChange={() => toggleStatus(item.id, item.status)}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Usuários</Text>
        <TouchableOpacity onPress={() => navigation.navigate('UserRegister')}>
          <View style={styles.addButton}>
            <Text style={styles.addButtonText}>Novo usuário</Text>
          </View>
        </TouchableOpacity>
      </View>

      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F5F5',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#7A52C7', // Mesma cor do botão de login/tela inicial
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 4,
  },
  activeUser: {
    backgroundColor: '#D9EAD3',
    borderColor: '#4CAF50',
    borderWidth: 2,
  },
  inactiveUser: {
    backgroundColor: '#F4CCCC',
    borderColor: '#F44336',
    borderWidth: 2,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  userDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userType: {
    marginRight: 10,
    color: '#555',
  },
});

export default UserListScreen;
