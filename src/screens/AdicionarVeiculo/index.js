import React, { useState } from 'react';
import { Box, Input, Text, Spinner } from 'native-base';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../../components/Header/index.js';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = "http://10.0.2.2:3000/api";

export default function AdicionarVeiculo() {
    const [vehicleData, setVehicleData] = useState({
        model: '',
        brand: '',
        year: '',
        plate: '',
        color: '',
        owner: '',  // Adicionando campo owner
    });
    const [loading, setLoading] = useState(false);

    const handleInputChange = (field, value) => {
        setVehicleData({
            ...vehicleData,
            [field]: value,
        });
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            // Obtém o token JWT armazenado
            const token = await AsyncStorage.getItem('userToken');
            // Prepara o corpo da requisição
            const newVehicle = {
                model: vehicleData.model,
                brand: vehicleData.brand,
                year: vehicleData.year,
                plate: vehicleData.plate,
                color: vehicleData.color,
                owner: vehicleData.owner, // Incluindo o dono
            };

            // Envia a requisição para criar o novo veículo
            const response = await axios.post(`${BASE_URL}/vehicles`, newVehicle, {
                headers: {
                    Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho
                },
            });

            // Limpa os campos após o envio
            setVehicleData({
                model: '',
                brand: '',
                year: '',
                plate: '',
                color: '',
                owner: '', // Limpa também o campo de dono
            });
            alert('Veículo adicionado com sucesso!');
        } catch (error) {
            console.error("Erro ao adicionar veículo:", error);
            alert('Erro ao adicionar veículo');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header />
            <Box flex={1} p={4}>
                <Text fontSize={20} mb={4}>Adicionar Veículo</Text>

                {/* Campo Modelo */}
                <Box mb={4}>
                    <Input
                        placeholder="Modelo"
                        value={vehicleData.model}
                        onChangeText={(text) => handleInputChange('model', text)}
                    />
                </Box>

                {/* Campo Marca */}
                <Box mb={4}>
                    <Input
                        placeholder="Marca"
                        value={vehicleData.brand}
                        onChangeText={(text) => handleInputChange('brand', text)}
                    />
                </Box>

                {/* Campo Ano */}
                <Box mb={4}>
                    <Input
                        placeholder="Ano"
                        value={vehicleData.year}
                        onChangeText={(text) => handleInputChange('year', text)}
                    />
                </Box>

                {/* Campo Placa */}
                <Box mb={4}>
                    <Input
                        placeholder="Placa"
                        value={vehicleData.plate}
                        onChangeText={(text) => handleInputChange('plate', text)}
                    />
                </Box>

                {/* Campo Cor */}
                <Box mb={4}>
                    <Input
                        placeholder="Cor"
                        value={vehicleData.color}
                        onChangeText={(text) => handleInputChange('color', text)}
                    />
                </Box>

                {/* Campo Proprietário */}
                <Box mb={4}>
                    <Input
                        placeholder="Proprietário"
                        value={vehicleData.owner}
                        onChangeText={(text) => handleInputChange('owner', text)}
                    />
                </Box>

                {/* Botão Salvar */}
                <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
                    {loading ? <Spinner color="white" /> : <Text style={styles.textButton}>Salvar</Text>}
                </TouchableOpacity>
            </Box>
        </>
    );
}

const styles = StyleSheet.create({
    button: {
        marginTop: "auto",
        backgroundColor: '#007bff',
        borderRadius: 22,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 5,
        marginRight: 5
    },
    textButton: {
        color: '#FFF',
        fontSize: 20,
        padding: 10,
        fontWeight: 'bold',
    },
});
