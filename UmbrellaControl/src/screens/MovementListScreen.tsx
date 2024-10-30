import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import Header from './Header'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

const MovementListScreen = ({ navigation, route }) => {
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovements = async () => {
      try {
        const response = await axios.get('http://192.168.0.10:3000/movements');
        setMovements(response.data);
      } catch (err) {
        setError('Erro ao carregar as movimentações.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovements();

    // Verifica se uma nova movimentação foi passada como parâmetro
    if (route.params?.newMovement) {
      setMovements((prevMovements) => [...prevMovements, route.params.newMovement]);
    }
  }, [route.params?.newMovement]); // Adiciona a nova movimentação como dependência

  const renderMovement = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.label}>Origem:</Text>
      <Text style={styles.value}>{item.origem ? item.origem.nome : 'Não especificado'}</Text>

      <Text style={styles.label}>Destino:</Text>
      <Text style={styles.value}>{item.destino ? item.destino.nome : 'Não especificado'}</Text>

      <Text style={styles.label}>Produto:</Text>
      <Text style={styles.value}>{item.produto ? item.produto.nome : 'Não especificado'}</Text>

    

      <Text style={styles.label}>Status:</Text>
      <Text style={styles.value}>{item.status}</Text>
    </View>
  );

  // Função para logout
  const handleLogout = async () => {
    await AsyncStorage.removeItem('user');
    navigation.navigate('Login'); // Navega para a tela de login após o logout
  };

  return (
    <View style={styles.container}>
      {/* Passando a função de logout para o Header */}
      <Header userName="Usuário" onLogout={handleLogout} />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('Movement')}
      >
        <Text style={styles.addButtonText}>Adicionar Nova Movimentação</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#00796b" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={movements}
          keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
          renderItem={renderMovement}
          contentContainerStyle={styles.list}
          ListEmptyComponent={<Text style={styles.emptyMessage}>Nenhuma movimentação encontrada.</Text>}
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
    paddingTop: 80, // Ajuste se o header não estiver visível
  },
  addButton: {
    backgroundColor: '#00796b',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#e0f2f1',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#00796b',
  },
  label: {
    fontWeight: 'bold',
    color: '#00796b',
    marginBottom: 5,
  },
  value: {
    fontSize: 14,
    color: '#616161',
    marginBottom: 10,
  },
  list: {
    paddingBottom: 20,
  },
  emptyMessage: {
    textAlign: 'center',
    fontSize: 16,
    color: '#616161',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default MovementListScreen;
