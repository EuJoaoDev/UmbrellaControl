import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import Header from './Header';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type Movement = {
  id: string;
  produto: {
    nome: string;
    imagem: string;
  };
  quantidade: number;
  origem: { nome: string };
  destino: { nome: string };
  status: 'created' | 'em transito' | 'coleta finalizada';
};

type RootStackParamList = {
  Login: undefined;
};

type DriverMovementListScreenProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

const DriverMovementListScreen: React.FC = () => {
  const [movements, setMovements] = useState<Movement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<{ name: string; profile: string } | null>(
    null
  );
  const navigation = useNavigation<DriverMovementListScreenProp>();

  useEffect(() => {
    fetchMovements();
    loadUserData();
  }, []);

  const loadUserData = async () => {
    const userData = await AsyncStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  };

  const fetchMovements = async () => {
    try {
      console.log('Tentando buscar movimentações...');
      const response = await axios.get('http://192.168.0.10:3000/movements');
      console.log('Movimentações recebidas:', response.data);
      setMovements(response.data);
    } catch (err) {
      console.error('Erro ao buscar movimentações:', err);
      setError('Erro ao carregar as movimentações.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('user');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const capturePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Erro', 'Permissão para acessar a câmera negada.');
      return null;
    }

    const result = await ImagePicker.launchCameraAsync();
    return !result.canceled ? result.assets[0] : null;
  };

  const handleDeliveryAction = async (id: string, action: 'start' | 'end') => {
    const photo = await capturePhoto();
    if (!photo) return;

    const formData = new FormData();
    formData.append('file', {
      uri: photo.uri,
      type: photo.mimeType,
      name: `${action}-${Date.now()}`,
    });
    formData.append('motorista', user?.name || 'Motorista Desconhecido');

    try {
      await axios.put(`http://192.168.0.10:3000/movements/${id}/${action}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      Alert.alert(
        'Sucesso',
        ` ${action === 'start' ? 'Entrega iniciada!' : 'Entrega finalizada!'}`
      );
      fetchMovements();
    } catch (error) {
      console.error('Erro na entrega:', error);
      Alert.alert(
        'Erro',
        ` Falha ao ${action === 'start' ? 'iniciar' : 'finalizar'} a entrega.`
      );
    }
  };

  const getStatusStyle = (status: Movement['status']) => {
    switch (status) {
      case 'created':
        return styles.createdCard;
      case 'em transito':
        return styles.emTrânsitoCard;
      case 'coleta finalizada':
        return styles.coletaFinalizadaCard;
      default:
        return {};
    }
  };

  const renderMovement = ({ item }: { item: Movement }) => (
    <View style={[styles.card, getStatusStyle(item.status)]}>
      <Image
        source={{ uri: item.produto.imagem }}
        style={styles.productImage}
      />
      <Text style={styles.label}>
        ID: <Text style={styles.value}>{item.id}</Text>
      </Text>
      <Text style={styles.label}>
        Produto: <Text style={styles.value}>{item.produto.nome}</Text>
      </Text>
      <Text style={styles.label}>
        Quantidade: <Text style={styles.value}>{item.quantidade}</Text>
      </Text>
      <Text style={styles.label}>
        Origem: <Text style={styles.value}>{item.origem.nome}</Text>
      </Text>
      <Text style={styles.label}>
        Destino: <Text style={styles.value}>{item.destino.nome}</Text>
      </Text>
      <Text style={styles.label}>
        Status: <Text style={styles.value}>{item.status}</Text>
      </Text>

      {item.status === 'created' && (
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleDeliveryAction(item.id, 'start')}
        >
          <Text style={styles.buttonText}>Iniciar Entrega</Text>
        </TouchableOpacity>
      )}

      {item.status === 'em transito' && (
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleDeliveryAction(item.id, 'end')}
        >
          <Text style={styles.buttonText}>Finalizar Entrega</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {user && <Header userName={user.name} onLogout={handleLogout} />}

      {loading ? (
        <Text style={styles.loadingText}>Carregando...</Text>
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={movements}
          keyExtractor={item => item.id}
          renderItem={renderMovement}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <Text style={styles.emptyMessage}>
              Nenhuma movimentação encontrada.
            </Text>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
    paddingTop: 80,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  createdCard: {
    backgroundColor: '#d3d3d3',
  },
  emTrânsitoCard: {
    backgroundColor: '#ffa07a',
  },
  coletaFinalizadaCard: {
    backgroundColor: '#a5d6a7',
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    color: '#00796b',
  },
  value: {
    fontSize: 14,
    color: '#616161',
  },
  actionButton: {
    backgroundColor: '#00796b',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#616161',
  },
  emptyMessage: {
    textAlign: 'center',
    fontSize: 16,
    color: '#616161',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});

export default DriverMovementListScreen;
