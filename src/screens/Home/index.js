import { View, Text } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import { FlatList, HStack } from 'native-base'
import ButtonRound from '../../components/buttons/Round';

const data = [
    {
        id: 1,
        title: 'Moradores',
        action: '',
    },
    {
        id: 2,
        title: 'Veículos',
        action: '',
    },
    {
        id: 3,
        title: 'Funcionários',
        action: '',
    },
];

export default function Home() {
  return (
    <View>
      <Header />
      
        <FlatList 
            keyExtractor={ (item) => item.id.toString() }
            horizontal
            data={data}
            showsHorizontalScrollIndicator={true}
            renderItem={ 
                ({item}) =>  <ButtonRound data={item}/> 
            }/>
      
      
    </View>
  )
}