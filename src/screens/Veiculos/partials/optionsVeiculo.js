import { Box, Center, HStack, Text, VStack } from 'native-base'
import React from 'react'
import { Constants } from '../../../helpers/constants';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 


export default function OptionsVeiculo(props) {
    const data = props.data;

    const clickOption = () => {
        //Action
    }

  return (
    <TouchableOpacity onPress={ () => { clickOption() } } style={styles.container} >
        <Box bgColor={Constants.dSecundaryColor} flex={1} justifyContent={'center'} borderBottomWidth={0.3} borderBottomColor={Constants.dPrimaryColor}>
            <VStack >    
                <HStack justifyContent={'space-evenly'} alignItems={'center'}>
                    <Box>
                        {data.icon}
                    </Box>
                    <Box >
                        <Text color={"#FFF"} fontSize={20} fontWeight={'bold'} >
                            {data.title}
                        </Text>
                    </Box>
                    <VStack justifyContent={'center'}>
                        <VStack ml={5}>
                            <Center>
                                <TouchableOpacity onPress={ () => { clickOption() } }  style={styles.button}  >
                                    <Center justifyContent={'center'} right={-1}>
                                        <MaterialIcons name='arrow-forward-ios' size={10} color={'#93959c'}/>
                                    </Center>
                                </TouchableOpacity>
                            </Center>
                        </VStack>
                    </VStack>
                </HStack>
            </VStack>
        </Box>
    </TouchableOpacity>
  ) 
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    button: {
      backgroundColor: Constants.dPrimaryColor,
      padding: 6,
      borderRadius: 22,
    }
});