import { Constants } from '../../../../helpers/constants';
import React from 'react';
import { Box, HStack, VStack, Text, Image, Button } from 'native-base';
import { TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';

const BASE_URL = "http://10.0.2.2:3000/api";

export default function ListItem({ data, refreshList }) {
  const vehicle = data;

  const handleDelete = async () => {
    try {
      Alert.alert(
        "Excluir Veículo",
        `Tem certeza que deseja excluir o veículo ${vehicle.model}?`,
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Excluir",
            onPress: async () => {
              const token = await AsyncStorage.getItem('userToken');
              const response = await axios.delete(`${BASE_URL}/vehicles/${vehicle.vehicleId}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });

              if (response.status === 200) {
                Alert.alert("Sucesso", "Veículo excluído com sucesso");
                refreshList(); // Atualiza a lista chamando o callback do componente pai
              }
            }
          }
        ]
      );
    } catch (error) {
      console.error("Erro ao excluir veículo:", error);
      Alert.alert("Erro", "Ocorreu um erro ao tentar excluir o veículo");
    }
  };

  return (
    <TouchableOpacity activeOpacity={0.7}>
      <Box
        bgColor={Constants.dSecundaryColor}
        p={3}
        mb={2}
        borderRadius={8}
        shadow={2}
      >
        <HStack space={4} alignItems="center">
          <Image
            source={{
              uri: vehicle.imagens?.[0] || "https://api.sincrod.com/social/1.0/image/caravatar.png",
            }}
            alt="Car"
            size="lg"
            borderRadius={8}
          />
          <VStack>
            <Text fontSize={18} color="#FFF" fontWeight="bold">
              {vehicle.model} ({vehicle.year})
            </Text>
            <Text fontSize={14} color="#eeeded">
              Ano: {vehicle.year ?? "N/A"}
            </Text>
            <Text fontSize={14} color="#eeeded">
              Marca: {vehicle.brand ?? "N/A"}
            </Text>
            <Text fontSize={14} color="#eeeded">
              Placa: {vehicle.plate ?? "N/A"}
            </Text>
            <Text fontSize={14} color="#eeeded">
              Cor: {vehicle.color ?? "N/A"}
            </Text>
            <Text fontSize={14} color="#eeeded">
              Proprietário: {vehicle.ownerName ?? "Desconhecido"}
            </Text>
          </VStack>
          <TouchableOpacity 
            onPress={handleDelete}
            style={{
              marginStart: "auto",
              backgroundColor: '#FF0000', // Cor vermelha
              borderRadius: 20, // Tornar o botão arredondado
              padding: 8, // Tamanho adequado para o ícone
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text>
              <Ionicons name="close" size={20} color="#FFF" />
            </Text>
          </TouchableOpacity>
        </HStack>
      </Box>
    </TouchableOpacity>
  );
}
