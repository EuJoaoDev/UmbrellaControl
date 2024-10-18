import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import axios from 'axios';

const ProductListScreen = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Função para carregar os produtos da API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://192.168.0.10:3000/products'); // Altere a URL conforme necessário
        console.log(response.data); // Log para verificar a estrutura da resposta
        setProducts(response.data);
        setFilteredProducts(response.data); // Inicia com todos os produtos
      } catch (error) {
        alert('Erro ao carregar os produtos: ' + error.message);
      }
    };

    fetchProducts();
  }, []);

  // Função para filtrar produtos com base no termo de pesquisa
  const handleSearch = () => {
    const filtered = products.filter(product =>
      product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.branch_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  // Componente para renderizar cada produto
  const renderProduct = ({ item }) => (
    <View style={styles.card}>
      {item.image_url ? (
        <Image source={{ uri: item.image_url }} style={styles.productImage} />
      ) : (
        <View style={styles.placeholderImage} />
      )}
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.product_name}</Text>
        <Text style={styles.storeName}>Loja: {item.branch_name}</Text>
        <Text style={styles.quantity}>{item.quantity} Unidades</Text>
        <Text style={styles.description}>
          {item.description.length > 60
            ? `${item.description.substring(0, 60)}...`
            : item.description}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Campo de pesquisa */}
      <TextInput
        style={styles.searchInput}
        placeholder="Digite o nome do produto ou loja"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>Buscar</Text>
      </TouchableOpacity>

      {/* Exibição da quantidade de produtos encontrados */}
      <Text style={styles.productCount}>{filteredProducts.length} produtos encontrados</Text>

      {/* FlatList para exibir os produtos */}
      {filteredProducts.length > 0 ? (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.product_name} // Use product_name como chave
          renderItem={renderProduct}
          contentContainerStyle={styles.list}
        />
      ) : (
        <Text style={styles.productCount}>Nenhum produto encontrado</Text>
      )}
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  searchInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  searchButton: {
    backgroundColor: '#00796b',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  productCount: {
    fontSize: 16,
    color: '#00796b',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#e0f2f1',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#00796b',
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 15,
  },
  placeholderImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#ccc', // Cor de fundo para imagem não disponível
    marginRight: 15,
  },
  productInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00796b',
  },
  storeName: {
    fontSize: 14,
    color: '#00796b',
    marginTop: 5,
  },
  quantity: {
    fontSize: 14,
    color: '#00796b',
    marginTop: 5,
  },
  description: {
    fontSize: 12,
    color: '#616161',
    marginTop: 5,
  },
});

export default ProductListScreen;
