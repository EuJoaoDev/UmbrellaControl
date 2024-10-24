import React, { useState, useEffect } from 'react';
import { 
  View, FlatList, Text, StyleSheet, Switch, TouchableOpacity, 
  ActivityIndicator, Alert, LayoutAnimation, UIManager, Platform 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';

type User = {
  id: number;
  name: string;
  type: string;
  status: boolean;
};

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const UserListScreen = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [togglingStatus, setTogglingStatus] = useState<number | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://192.168.0.10:3000/users');
      setUsers(response.data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os usuários.');
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (id: number, currentStatus: boolean) => {
    setTogglingStatus(id);
    try {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      await axios.patch(`http://192.168.0.10:3000/users/${id}/toggle-status`, { status: !currentStatus });
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === id ? { ...user, status: !user.status } : user
        )
      );
      Alert.alert('Sucesso', 'Status do usuário alterado com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível alterar o status do usuário.');
    } finally {
      setTogglingStatus(null);
    }
  };

  const renderItem = ({ item }: { item: User }) => (
    <View style={[styles.card, item.status ? styles.activeUser : styles.inactiveUser]}>
      <View style={styles.userInfo}>
        <Icon name={item.type === 'Motoboy' ? 'motorcycle' : 'store'} size={24} color="#555" />
        <Text style={styles.userName}>{item.name}</Text>
      </View>
      <View style={styles.userDetails}>
        <Switch
          value={item.status}
          onValueChange={() => toggleStatus(item.id, item.status)}
          disabled={togglingStatus === item.id}
        />
        {togglingStatus === item.id && <ActivityIndicator size="small" color="#0000ff" />}
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2C8C8C" />
        <Text>Carregando usuários...</Text>
      </View>
    );
  }

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
        numColumns={2}
        columnWrapperStyle={styles.row}
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
    backgroundColor: '#2C8C8C',
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
  row: {
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    margin: 5,
    padding: 15,
    borderRadius: 15,
    justifyContent: 'space-between',
    elevation: 4,
  },
  activeUser: {
    backgroundColor: '#D9EAD3',
    borderColor: '#2C8C8C',
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
    fontSize: 14,
    fontWeight: 'bold',
  },
  userDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UserListScreen;
