import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { Constants } from '../../helpers/constants';
import { Image, Input } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';  // Importando AsyncStorage

export default function Login() {
    const [inptUser, setInptUser] = useState('');
    const [inptPass, setInptPass] = useState('');
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    const handleLogin = async () => {
        setLoading(true);
        try {
            // Realiza a requisição de login
            const response = await axios.post('http://10.0.2.2:3000/api/users/login', {
                email: inptUser,
                password: inptPass
            });

            setLoading(false);
            const token = response.data.token;
            const userData = {
                email: inptUser,
                token: token
            };

            // Armazena o token e as informações do usuário no AsyncStorage
            await AsyncStorage.setItem('userToken', token);
            await AsyncStorage.setItem('userData', JSON.stringify(userData));  // Armazenando as informações do usuário

            // Redireciona para a página de Moradores
            navigation.navigate('Moradores');
        } catch (error) {
            setLoading(false);
            if (error.response) {
                console.log("LOGIN:" + error);
                Alert.alert("Erro", "Usuário ou senha incorretos");
            } else {
                console.log("LOGIN:" + error);
                Alert.alert("Erro", "Erro de conexão com o servidor");
            }
        }
    };

    return (
        <View style={styles.container}>
            <View>
                <Image alt="Imagem" source={require('../../../assets/logo.png')} />
                <View style={styles.viewInput}>
                    <Text style={styles.label}>Email</Text>
                    <Input
                        bgColor={'#DADADA'}
                        value={inptUser}
                        onChangeText={(text) => setInptUser(text)}
                        placeholder="Email"
                    />
                </View>
                <View style={styles.viewInput}>
                    <Text style={styles.label}>Password</Text>
                    <Input
                        bgColor={'#DADADA'}
                        value={inptPass}
                        type="password"
                        onChangeText={(text) => setInptPass(text)}
                        placeholder="Password"
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
                    <Text style={styles.textButton}>{loading ? 'Carregando...' : 'Login'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Constants.dPrimaryColor,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Constants.dSecundaryColor,
        borderRadius: 22,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 15
    },
    textButton: {
        fontSize: 20,
        padding: 5,
        color: "#FFF",
        fontWeight: 'bold'
    },
    viewInput: {
        marginLeft: 5,
        marginRight: 5,
    },
    label: {
        color: '#FFF',
        marginTop: 3
    }
});
