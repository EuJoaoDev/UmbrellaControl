import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type Branch = {
  id: string;
  name: string;
};

type Product = {
  id: string;
  name: string;
  availableQuantity: number; 
};

type RootStackParamList = {
  Home: undefined;
};

type MovementScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;

const MovementScreen = () => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [originBranch, setOriginBranch] = useState<string | null>(null);
  const [destinationBranch, setDestinationBranch] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number | null>(null);
  const [availableQuantity, setAvailableQuantity] = useState<number>(0);
  const [observations, setObservations] = useState<string>('');
  const navigation = useNavigation<MovementScreenProp>();

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await fetch('http://192.168.0.10:3000/branches/options');
        if (!response.ok) {
          throw new Error(`Erro: ${response.status}`);
        }
        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          setBranches(data);
        } else {
          throw new Error('Resposta não é JSON');
        }
      } catch (error) {
        console.error('Erro ao buscar filiais:', error);
        Alert.alert('Erro', 'Erro ao buscar filiais. Tente novamente mais tarde.');
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await fetch('http://192.168.0.10:3000/products/options');
        if (!response.ok) {
          throw new Error(`Erro: ${response.status}`);
        }
        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          setProducts(data);
        } else {
          throw new Error('Resposta não é JSON');
        }
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        Alert.alert('Erro', 'Erro ao buscar produtos. Tente novamente mais tarde.');
      }
    };

    fetchBranches();
    fetchProducts();
  }, []);

  const handleRegister = async () => {
    if (originBranch === destinationBranch) {
      Alert.alert('Erro', 'As filiais de origem e destino devem ser diferentes.');
      return;
    }

    if (quantity === null || quantity <= 0 || quantity > availableQuantity) {
      Alert.alert('Erro', 'A quantidade deve ser maior que zero e não pode ser maior que a quantidade disponível.');
      return;
    }

    const movementData = {
      originBranch,
      destinationBranch,
      product: selectedProduct,
      quantity,
      observations,
    };

    try {
      const response = await fetch('http://192.168.0.10:3000/moviment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movementData),
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Movimentação cadastrada com sucesso!');
        navigation.navigate('Home');
      } else {
        Alert.alert('Erro', 'Falha ao cadastrar a movimentação.');
      }
    } catch (error) {
      console.error('Erro ao cadastrar movimentação:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao cadastrar a movimentação.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Picker para selecionar a filial de origem */}
      <Text style={styles.label}>Filial de Origem:</Text>
      <Picker
        selectedValue={originBranch}
        onValueChange={(itemValue) => setOriginBranch(itemValue)}
        style={styles.picker}
      >
        {branches.map((branch) => (
          <Picker.Item key={branch.id} label={branch.name} value={branch.id} />
        ))}
      </Picker>

      {/* Picker para selecionar a filial de destino */}
      <Text style={styles.label}>Filial de Destino:</Text>
      <Picker
        selectedValue={destinationBranch}
        onValueChange={(itemValue) => setDestinationBranch(itemValue)}
        style={styles.picker}
      >
        {branches.map((branch) => (
          <Picker.Item key={branch.id} label={branch.name} value={branch.id} />
        ))}
      </Picker>

      {/* Picker para selecionar o produto */}
      <Text style={styles.label}>Produto:</Text>
      <Picker
        selectedValue={selectedProduct}
        onValueChange={(itemValue) => {
          setSelectedProduct(itemValue);
          const product = products.find((p) => p.id === itemValue);
          if (product) setAvailableQuantity(product.availableQuantity);
        }}
        style={styles.picker}
      >
        {products.map((product) => (
          <Picker.Item key={product.id} label={product.name} value={product.id} />
        ))}
      </Picker>

      {/* TextInput para informar a quantidade */}
      <Text style={styles.label}>Quantidade:</Text>
      <TextInput
        value={quantity !== null ? String(quantity) : ''}
        onChangeText={(text) => setQuantity(Number(text))}
        keyboardType="numeric"
        style={styles.input}
      />

      {/* TextInput multiline para adicionar observações */}
      <Text style={styles.label}>Observações:</Text>
      <TextInput
        value={observations}
        onChangeText={setObservations}
        multiline
        style={[styles.input, styles.textArea]}
      />

      {/* Botão para cadastrar */}
      <View style={styles.buttonContainer}>
        <Button title="Cadastrar" onPress={handleRegister} color="#2C8C8C" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F5F5',
    padding: 20,
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  picker: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default MovementScreen;
