import { View, Text, ActivityIndicator } from 'react-native';
import React from 'react';
import { Constants } from '../../helpers/constants';

export default function Load() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator size={50} color={Constants.dSecundaryColor}  />
      <Text style={{ fontSize: 20}} >Processando...</Text>
    </View>
  )
}