import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button } from 'react-native';
import axios from 'axios';

const MovementListScreen = ({ navigation }) => {
  const [movements, setMovements] = useState([]);

  // Função para carregar as movimentações da API
  useEffect(() => {
    const fetchMovements = async () => {
      try {
        const response = await axios.get('http://192.168.0.10:3000/movement');
        setMovements(response.data);
      } catch (error) {
        alert('Erro ao carregar as movimentações.');
      }
    };

    fetchMovements();
  }, []);

  // Renderiza cada movimentação em um card
  const renderMovement = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.label}>Origem:</Text>
      <Text style={styles.value}>{item.origin}</Text>

      <Text style={styles.label}>Destino:</Text>
      <Text style={styles.value}>{item.destination}</Text>

      <Text style={styles.label}>Produto:</Text>
      <Text style={styles.value}>{item.product}</Text>

      <Text style={styles.label}>Status:</Text>
      <Text style={styles.value}>{item.status}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Botão para adicionar nova movimentação */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('Movement')}
      >
        <Text style={styles.addButtonText}>Adicionar Nova Movimentação</Text>
      </TouchableOpacity>

      {/* FlatList para exibir as movimentações */}
      <FlatList
        data={movements}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMovement}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
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
});

export default MovementListScreen;
