import { Box, Button, FlatList, Text, View } from 'native-base';
import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Morador from './partials/Morador';
import { Modals } from '../../components/Modals';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Constants } from '../../helpers/constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const buttons = [
  {
    id: "1",
    title: "",
    icon: <FontAwesome5 name='car' size={50} color={'#000'} />,
  }
];

export default function Moradores() {
  const [showModal, setShowModal] = useState(false);
  const [moradorSelected, setMoradorSelected] = useState();
  const [data, setData] = useState([]);

  const navigation = useNavigation();

  // Função para buscar os residentes da API
  const fetchResidents = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken'); // Obter o token JWT armazenado
      if (token) {
        const response = await axios.get('http://10.0.2.2:3000/api/residents', {
          headers: {
            Authorization: `Bearer ${token}`,  // Enviar o token JWT no cabeçalho
          },
        });
        setData(response.data);  // Atualiza o estado com os dados dos residentes
      }
    } catch (error) {
      console.error("Erro ao carregar residentes:", error);
    }
  };

  // UseFocusEffect para carregar os dados quando a página for focada
  useFocusEffect(
    React.useCallback(() => {
      fetchResidents();  // Carregar os residentes quando a tela for exibida
    }, [])
  );

    
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const setMorador = (morador) => {
    setMoradorSelected(morador);
  };

  const headerModal = () => {
    return (
      <Box>
        <Text fontSize={20} fontWeight={'bold'}>
          Contactar Morador
        </Text>
      </Box>
    );
  };

  const bodyModal = () => {
    return (
      <Box>
        <TouchableOpacity style={styles.buttons}></TouchableOpacity>
      </Box>
    );
  };

  const addMorador = () => {
    navigation.navigate('Add');
  };

  return (
    <>
      <FlatList
        ListHeaderComponent={<Header />}
        keyExtractor={(item) => item._id.toString()}  // Usar _id para garantir a chave única
        data={data}
        showsHorizontalScrollIndicator={true}
        renderItem={({ item }) => (
          <Morador data={item} openModal={openModal} setMorador={setMorador} size={30} bodyModal={bodyModal} />
        )}
      />
      <View style={styles.viewButton}>
        <TouchableOpacity style={styles.button} onPress={addMorador}>
          <Ionicons name='add' size={30} color={"#FFF"} />
        </TouchableOpacity>
      </View>
      <Modals isVisible={showModal} closeModal={closeModal} morador={moradorSelected} header={headerModal} body={bodyModal} footer={''} />
    </>
  );
}

const styles = StyleSheet.create({
  buttons: {
    borderRadius: 22,
    size: 44,
    backgroundColor: '#DADADA',
  },
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
  viewButton: {
    alignItems: 'flex-end',
  },
});
