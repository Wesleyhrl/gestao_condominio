import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react'
import { Box, HStack, Avatar, VStack, Text } from 'native-base';
import { useNavigation } from '@react-navigation/native';

export default function Morador({ ...props }) {
    const navigation = useNavigation();
    const { data } = props;  // Desestruturando para pegar os dados

    // Garantindo que a estrutura dos dados seja acessada corretamente
    const moradorData = data;

    return (
        <Box mb={3} fontSize={25} bgColor={'#FFF'} fontWeight={'bold'} ml={3} mr={3}>
            <TouchableOpacity activeOpacity={0.6} borderRadius={22} onPress={
                () => {
                    // Navega para o perfil do morador passando os dados e as funções necessárias
                    navigation.navigate("Profile", { morador: moradorData, openModal: props.openModal, bodyModal: props.bodyModal });
                }
            }>
                <HStack>
                    <VStack padding={1} justifyContent={'center'}>
                        {/* Avatar neutro com iniciais do nome */}
                        <Avatar
                            size="lg"
                            bg="gray.300"
                            _text={{ color: 'white', fontSize: 'lg', fontWeight: 'bold' }}
                        >
                            {moradorData.name ? moradorData.name.charAt(0).toUpperCase() : "?"}
                        </Avatar>
                    </VStack>
                    <VStack>
                        <HStack mt={3} ml={3}>
                            <Text fontWeight={'bold'} fontSize={17}>{moradorData.name}</Text>
                        </HStack>
                        <HStack ml={3}>
                            <Text>Apartamento: {moradorData.apartment ?? "N/A"}</Text>
                        </HStack>
                    </VStack>
                </HStack>
            </TouchableOpacity>
        </Box>
    )
}
