import { Box, FlatList, HStack, Text, VStack } from 'native-base'
import React from 'react'
import Picture from './Picture';
import Info from './Info';
import { Constants } from '../../../helpers/constants';
import { FontAwesome5 } from '@expo/vector-icons'; 
import OptionsVeiculo from './optionsVeiculo';

const options = [
    {
        id: '1',
        title: "Proprietário",
        icon: <FontAwesome5 name='user-alt' size={70} color={'#000'} />,
    },
    {
        id: '2',
        title: "Dados veículo",
        icon: <FontAwesome5 name='car' size={70} color={'#000'}/>
    }
];

export default function Veiculo(props) {
    const data = props.route.params;
  return (
    <Box flex={1} >
        <HStack  h={300} >
            <Picture imagem={data.imagens[0]} w={'100%'} radius={0} h={'auto'} />
        </HStack>
        <Box bgColor={Constants.dPrimaryColor} >
            <Info data={data}/>
        </Box>
        <Box flex={1} >
            <VStack flex={2} >
                <OptionsVeiculo data={options[0]} />
            </VStack>
            <VStack flex={2}>
                <OptionsVeiculo data={options[1]} />
            </VStack>
        </Box>
    </Box>
  )
}