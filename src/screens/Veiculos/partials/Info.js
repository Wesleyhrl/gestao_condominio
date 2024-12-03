import React from 'react'
import { Box, HStack, VStack ,Text} from 'native-base'
import { TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'; 

export default function Info(props) {
    const data = props.data;

    const clickBell = () => {
        //Action
    }
    
  return (
    <HStack justifyContent={`space-between`} ml={3} mr={3} mt={1} mb={1}>
        <VStack >
            <Box >
                <Box>
                    <Text fontSize={15} color={'#FFF'} fontWeight={'bold'}>{data.modelo}</Text>
                </Box>
                <Box>
                    <HStack>
                        <Text fontWeight={'bold'} fontSize={13} color={'#FFF'}>Placa: </Text>
                        <Text fontSize={13} color={'#FFF'} >{data.placa}</Text>
                    </HStack>
                </Box>
            </Box>
        </VStack>
        <VStack justifyContent={'center'} mr={3}>
            <TouchableOpacity onPress={ () => clickBell() }>
                <FontAwesome name='bell' size={28} color={'#FFF'}/>
            </TouchableOpacity>
        </VStack>
    </HStack>
  )
}