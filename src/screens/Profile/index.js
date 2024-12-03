import { Platform, Alert } from 'react-native';
import React, { useState } from 'react';
import { Box, FlatList, HStack, VStack, Avatar, Text, Button } from 'native-base';
import { FontAwesome5, Foundation } from '@expo/vector-icons';
import Info from './partials/Info';
import Option from './partials/Options';
import { Constants } from '../../helpers/constants';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = "http://10.0.2.2:3000/api"; // URL da sua API

export default function Profile({ route, navigation }) {
  const { morador } = route.params; // Obtendo os dados do morador da navegação
  const [data, setData] = useState([
    {
      id: '1',
      icon: <FontAwesome5 name='car' size={50} color={'#000'}/> ,
      title: 'Veículos',
      subTitle: 'Carro & Motocicleta'
    },
    {
      id: '2',
      icon: <Foundation name='telephone' size={50} color={'#000'}/> ,
      title: 'Contato',
      subTitle: 'Formas de contato'
    },
  ]);

  const handleDeleteResident = async () => {
    try {
      // Confirmação antes de excluir
      Alert.alert(
        "Excluir Morador",
        `Tem certeza que deseja excluir o morador ${morador.name}?`,
        [
          {
            text: "Cancelar",
            style: "cancel"
          },
          {
            text: "Excluir",
            onPress: async () => {
              // Obtém o token JWT armazenado
              const token = await AsyncStorage.getItem('userToken');
              
              // Envia a requisição DELETE para excluir o morador
              const response = await axios.delete(`${BASE_URL}/residents/${morador.id}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });

              if (response.status === 200) {
                Alert.alert("Sucesso", "Morador excluído com sucesso");
                navigation.goBack(); // Retorna para a tela anterior após excluir
              }
            }
          }
        ]
      );
    } catch (error) {
      console.error("Erro ao excluir morador:", error);
      Alert.alert("Erro", "Ocorreu um erro ao tentar excluir o morador");
    }
  };

  return (
    <Box flex={1}>
      <VStack>
        {/* Avatar com iniciais do nome */}
        <HStack justifyContent="center" alignItems="center" mt={Platform.OS === 'android' ? 5 : 10}>
          <Avatar
            size="2xl"
            bg="gray.300"
            _text={{ color: 'white', fontSize: '2xl', fontWeight: 'bold' }}
          >
            {morador.name ? morador.name.charAt(0).toUpperCase() : "?"}
          </Avatar>
        </HStack>

        {/* Informações do perfil */}
        <Box p={3} bgColor={Constants.dPrimaryColor} mt={5}>
          <Info profile={morador} />
        </Box>

        {/* Lista de opções */}
        <Box>
          <HStack >
            <FlatList 
              data={data}
              renderItem={(item) => <Option data={item} morador={morador} navigation={navigation}/>}
            />
          </HStack>
        </Box>

        {/* Botão para excluir o morador */}
        <Box p={3} mt={5} alignItems="center">
          <Button 
            colorScheme="danger" 
            onPress={handleDeleteResident}
          >
            Excluir Morador
          </Button>
        </Box>
      </VStack>
    </Box>
  );
}
