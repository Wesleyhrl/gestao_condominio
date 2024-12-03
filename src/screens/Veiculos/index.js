import React, { useEffect, useState } from 'react';
import { Box, FlatList, Spinner } from 'native-base';
import Header from '../../components/Header';
import { Constants } from '../../helpers/constants';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Serach from '../../components/buttons/Round/Search';
import ListItem from './partials/ListItem';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native'; // Importar useFocusEffect

const BASE_URL = "http://10.0.2.2:3000/api";

export default function Veiculos({ navigation, route }) {
  const { moradorId } = route.params || {};
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Função para buscar os veículos
  const fetchVehicles = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');

      let vehicleResponse;
      if (moradorId) {
        vehicleResponse = await axios.get(`${BASE_URL}/vehicles/resident/${moradorId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        vehicleResponse = await axios.get(`${BASE_URL}/vehicles`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      const vehiclesWithOwners = await Promise.all(
        vehicleResponse.data.map(async (vehicle) => {
          if (vehicle.owner) {
            try {
              const residentResponse = await axios.get(
                `${BASE_URL}/residents/${vehicle.owner}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              return { ...vehicle, ownerName: residentResponse.data.name };
            } catch {
              return { ...vehicle, ownerName: "Desconhecido" };
            }
          }
          return { ...vehicle, ownerName: "Desconhecido" };
        })
      );

      setVehicles(vehiclesWithOwners);
    } catch (error) {
      console.error("Erro ao buscar veículos:", error);
    } finally {
      setLoading(false);
    }
  };

  // Recarrega a lista sempre que a tela é focada
  useFocusEffect(
    React.useCallback(() => {
      fetchVehicles();
    }, [moradorId])
  );

  const addVeiculo = () => {
    navigation.navigate('AdicionarVeiculo');
  };

  if (loading) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <Spinner size="lg" />
      </Box>
    );
  }

  return (
    <Box flex={1}>
      <Header />
      <FlatList
        keyExtractor={(item) => item._id.toString()}
        data={vehicles}
        renderItem={({ item }) => <ListItem data={item} refreshList={fetchVehicles} />}
      />
      <TouchableOpacity style={styles.button} onPress={addVeiculo}>
        <Ionicons name="add" size={30} color={"#FFF"} />
      </TouchableOpacity>
    </Box>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Constants.dPrimaryColor,
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    elevation: 8,
  },
});