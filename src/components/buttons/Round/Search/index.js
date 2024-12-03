
import { Box } from 'native-base';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons'; 
import { Constants } from '../../../../helpers/constants';

export default function Serach({ ...props }) {
    const clickSerach = () => {
        console.log('clicou');
    }
  return (
    <Box position={'absolute'} bottom={10} right={3} opacity={90}>
        <TouchableOpacity style={styles.button} onPress={ () => clickSerach() } >
            <Feather name='search' size={30} color='#FFF'/>
        </TouchableOpacity>
    </Box>
  )
}

const styles = StyleSheet.create({
    button: {
      width: 60,
      height: 60,
      borderRadius: 20,
      backgroundColor: Constants.dPrimaryColor, 
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 3, 
      shadowColor: '#000', 
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
    },
  });