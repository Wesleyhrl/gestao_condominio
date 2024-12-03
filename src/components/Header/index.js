import React, { useState, useEffect } from 'react';
import { Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { Box, StatusBar, HStack, Text, Modal, Button } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';  // Importando FontAwesome5
import { Constants } from '../../helpers/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const dPadding = 8;
const StatusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight : 24;
const size = 20;

export default function Header() {
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userData, setUserData] = useState(null);  // Estado para armazenar os dados do usuário

  // Função para carregar os dados do AsyncStorage
  const loadUserData = async () => {
    try {
      const storedUserData = await AsyncStorage.getItem('userData');  // Recuperando os dados armazenados
      if (storedUserData) {
        setUserData(JSON.parse(storedUserData));  // Deserializando e armazenando os dados no estado
      }
    } catch (error) {
      console.error('Erro ao recuperar os dados do AsyncStorage', error);
    }
  };

  // Carregar os dados quando o componente for montado
  useEffect(() => {
    loadUserData();
  }, []);  // O array vazio garante que a função execute apenas uma vez quando o componente for montado

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <Box style={styles.container}>
      <Box style={styles.content} mr={5}>
        {/* Exibindo o nome do usuário se estiver disponível */}
        <Text style={styles.username} pt={Platform.OS == 'android' ? 5 : 10} pb={Platform.OS == 'android' ? 5 : 10}>
          {userData ? userData.email : 'Carregando...'}
        </Text>

        {/* Botão de 3 barrinhas (menu) */}
        <TouchableOpacity activeOpacity={0.6} style={styles.buttonUser} onPress={toggleModal}>
          <FontAwesome5 name="bars" size={24} color="white" />
        </TouchableOpacity>
      </Box>

      {/* Modal sobrepondo o conteúdo */}
      <Modal isOpen={isModalVisible} onClose={toggleModal}>
        <Box style={styles.modalContainer}>
          <HStack space={4} direction="column">
            <Button
              style={styles.modalButton}
              onPress={() => {
                toggleModal();  // Fecha o modal
                navigation.navigate('Veiculos');  // Redireciona para a página de veículos
              }}
            >
              <Text>Veículos</Text>
            </Button>
            <Button
              style={styles.modalButton}
              onPress={() => {
                toggleModal();  // Fecha o modal
                navigation.navigate('Moradores');  // Redireciona para a página de moradores
              }}
            >
              <Text>Moradores</Text>
            </Button>
            <Button
              style={styles.modalButton}
              onPress={() => {
                toggleModal();
                navigation.navigate('Login');
              }}
            >
              <Text>Sair</Text>
            </Button>
          </HStack>
        </Box>
      </Modal>
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Constants.dPrimaryColor,
    paddingTop: StatusBarHeight,
    flexDirection: 'row',
    paddingStart: dPadding,
    paddingEnd: dPadding,
    paddingBottom: dPadding,
    borderBottomEndRadius: 8,
    borderBottomStartRadius: 8,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  username: {
    fontSize: 25,
    color: '#FFF',
    fontWeight: 'bold',
  },
  buttonUser: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: 200,
    alignItems: 'center',
  },
  modalButton: {
    width: 150,
    marginBottom: 10,
  },
});
