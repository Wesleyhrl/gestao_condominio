import { View, Text, StyleSheet } from 'react-native'
import { Box, Image } from 'native-base';
import React from 'react'

export default function Picture({ ...props }) {
  return (
    <Image key={20} size={props.size ?? 20} w={props.w ?? null} h={props.h ?? null} resizeMode="cover" source={{uri: props.url}} alt={"avatar"}  borderRadius={props.radius ?? 44}/>
  )
}

