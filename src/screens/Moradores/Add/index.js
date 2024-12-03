import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Header from '../../../components/Header';
import { Input, Spinner } from 'native-base';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = "http://10.0.2.2:3000/api";

export default function Add() {
    const [name, setName] = useState('');
    const [apartment, setApartment] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            // Obtém o token JWT armazenado
            const token = await AsyncStorage.getItem('userToken');
            // Prepara o corpo da requisição
            const newResident = {
                name,
                apartment,
                phone,
                email,
            };

            // Envia a requisição para criar o novo residente
            const response = await axios.post(`${BASE_URL}/residents`, newResident, {
                headers: {
                    Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho
                },
            });

            console.log("Residente criado:", response.data);
            // Limpa os campos após o envio
            setName('');
            setApartment('');
            setPhone('');
            setEmail('');
            alert('Residente adicionado com sucesso!');
        } catch (error) {
            console.error("Erro ao adicionar residente:", error);
            alert('Erro ao adicionar residente');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header />
            <View style={styles.view}>
                <Text>Nome Completo</Text>
                <Input value={name} onChangeText={(text) => setName(text)} />

                <Text>Apartamento</Text>
                <Input value={apartment} onChangeText={(text) => setApartment(text)} />

                <Text>Telefone</Text>
                <Input value={phone} onChangeText={(text) => setPhone(text)} />

                <Text>E-Mail</Text>
                <Input value={email} onChangeText={(text) => setEmail(text)} />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
                {loading ? <Spinner color="white" /> : <Text style={styles.textButton}>Salvar</Text>}
            </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
    },
    button: {
        backgroundColor: '#007bff',
        borderRadius: 22,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 5,
        marginRight: 5,
    },
    textButton: {
        color: '#FFF',
        fontSize: 20,
        padding: 10,
        fontWeight: 'bold',
    },
});
