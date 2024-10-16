import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios'; // Importando Axios

const UserRegisterScreen = () => {
  const [profile, setProfile] = useState('motorista'); // Estado para controlar o tipo de perfil
  const [name, setName] = useState('');
  const [document, setDocument] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async () => {
    // Validação básica
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }
    if (!name || !document || !address || !email || !password) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    // Dados para enviar na requisição
    const userData = {
      profile,
      name,
      document,
      fullAddress: address,
      email,
      password,
    };

    try {
      // Enviando a requisição POST
      const response = await axios.post('https://api.exemplo.com/users', userData);
      
      // Tratamento de sucesso
      Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
      console.log(response.data); // Exibir a resposta no console para debug
    } catch (error) {
      // Tratamento de erro
      Alert.alert('Erro', 'Não foi possível cadastrar o usuário. Tente novamente.');
      console.error(error); // Exibir o erro no console para debug
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Usuário</Text>

      {/* Picker para escolher o perfil */}
      <View style={styles.pickerContainer}>
        <TouchableOpacity onPress={() => setProfile('motorista')} style={[styles.iconButton, profile === 'motorista' && styles.selected]}>
          <Icon name="motorcycle" size={30} color={profile === 'motorista' ? '#FFF' : '#000'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setProfile('filial')} style={[styles.iconButton, profile === 'filial' && styles.selected]}>
          <Icon name="store" size={30} color={profile === 'filial' ? '#FFF' : '#000'} />
        </TouchableOpacity>
      </View>

      {/* Campos de formulário */}
      <TextInput
        style={styles.input}
        placeholder="Nome completo"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder={profile === 'motorista' ? 'CPF' : 'CNPJ'}
        value={document}
        onChangeText={setDocument}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Endereço Completo"
        value={address}
        onChangeText={setAddress}
      />

      {/* Seção de dados de login */}
      <Text style={styles.sectionTitle}>Dados de login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirme a senha"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      {/* Botão de cadastro */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  iconButton: {
    borderWidth: 2,
    borderColor: '#DDD',
    borderRadius: 10,
    padding: 10,
  },
  selected: {
    backgroundColor: '#4CAF50', // Cor similar à tela de login/home
    borderColor: '#4CAF50',
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#F0F0F0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
  button: {
    backgroundColor: '#6200ee', // Cor do botão
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default UserRegisterScreen;
