# 🌂 Guarda-Chuva Farmácias

> **Gerenciamento dinâmico de estoque e direcionamento de cargas entre filiais!**

### 📜 Descrição do Projeto

O **Guarda-Chuva Farmácias** é um app de uso interno desenvolvido para simplificar e agilizar a movimentação de produtos entre filiais de uma multinacional do setor farmacêutico. Nossa plataforma gerencia o estoque e direciona cargas, oferecendo uma interface intuitiva e acessível para funcionários e motoristas. Com funcionalidades específicas para cada usuário, o app aumenta a eficiência do controle de estoque e facilita o monitoramento de entregas, com acompanhamento em tempo real.

**Tecnologias utilizadas:** 
- Frontend: ⚛️ React Native
- Backend: 🌐 Node.js (API)
- Requisições: 🛠️ Axios
- Armazenamento local: 📦 AsyncStorage

---

## 🛠️ Funcionalidades do Projeto

1. **LoginScreen:** 🧑‍💻 Interface de login com autenticação.
2. **HomeScreen:** 🏠 Tela inicial com botões de acesso para as áreas de gerenciamento de produtos e usuários.
3. **MovementListScreen:** 📋 Exibe as movimentações realizadas, com status e filtros para facilitar a consulta.
4. **DriverMovementListScreen:** 🚚 Tela para motoristas acompanharem e capturarem imagens do processo de entrega.
5. **UserListScreen:** 👥 Listagem e gerenciamento de usuários, com a possibilidade de ativar ou desativar perfis.
6. **UserRegisterScreen:** 📝 Cadastro de novos usuários.
7. **ProductListScreen:** 💊 Listagem de produtos com opção de pesquisa e detalhes dos itens.

---

## 🚀 Tecnologias e Técnicas Utilizadas

- **React Native** para o desenvolvimento do app mobile;
- **Axios** para fazer requisições HTTP ao backend;
- **AsyncStorage** para armazenamento local de dados de autenticação;
- **Expo Image Picker** para captura de imagens durante o processo de entrega;
- **.env** para configuração e segurança das variáveis de ambiente;
- **TextInputMask** para formatação de documentos (CPF/CNPJ).

---

## 📸 Prévia do Projeto

**Abaixo você pode ver algumas das telas do projeto:**

<p align="center">
  <img src="https://github.com/user-attachments/assets/cdb710c9-e302-4860-850c-08a6deb3949d" alt="Login" width="30%" style="margin-right: 10px;"/>
  <img src="https://github.com/user-attachments/assets/90337322-c8fa-4bf3-9416-5535da69cdf1" alt="Home admin" width="30%" style="margin-right: 10px;"/>
  <img src="https://github.com/user-attachments/assets/1f7b42ad-f4e6-4f2e-aab4-985ea7f2d8e9" alt="Listagem de produtos" width="30%"/>
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/0de92ecb-60ae-4b27-a2ce-c7154e633fd8" alt="Gerenciamento de usuários" width="30%" style="margin-right: 10px;"/>
  <img src="https://github.com/user-attachments/assets/8b7d6c32-8d1b-4ab9-a38f-7af2aa86f33b" alt="Cadastro filial e motorista" width="30%" style="margin-right: 10px;"/>
  <img src="https://github.com/user-attachments/assets/e8ae874b-0896-4bd2-bc16-bb484caf7a0f" alt="Home Filial" width="30%"/>
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/a9883aa6-ee12-4290-aeed-d614cc5b5d16" alt="Cadastro de movimentações" width="45%" style="margin-right: 10px;"/>
  <img src="https://github.com/user-attachments/assets/57c2a05d-f35b-4781-8c93-b0f9b1690df4" alt="Home Motorista" width="45%" style="margin-right: 10px;"/>
</p>

---

## 🖥️ Executando o Projeto

### Pré-requisitos

1. **Node.js** e **npm** instalados
2. **Expo CLI** para executar o app em ambiente de desenvolvimento
3. Configuração do backend local disponível no seu IP

### Passos para execução

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/sua-conta/Guarda-Chuva-Farmacias.git
   
2. **Instale as dependências:**
   ```bash
   cd Guarda-Chuva-Farmacias npm install

3. **Execute o projeto:**
   ```bash
   expo start


 ##  📈 Melhorias Futuras
- Integração com mapa para acompanhamento das rotas de entrega.
- Implementação de push notifications para alertas de novas movimentações e mudanças de status.
- Feedback visual em tempo real no cadastro de usuários e produtos.
- Melhorias na tela de pesquisa de produtos com sugestões automáticas e filtros adicionais.



