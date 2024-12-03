import { View,  } from 'react-native';
import { Box, Button, Text } from 'native-base';
import React from 'react';

export default function ButtonRound({ ...props }) {

  const data = props.data;

  return (
    <Box alignItems={'center'}>
      <Button  ml={8} bgColor={'#DADADA'} size={70} borderRadius={44}>
      </Button>
      
      <Text ml={8}>{data.title}</Text>
    </Box>
  )
}