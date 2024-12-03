import React from "react";
import { NativeBaseProvider, Box } from "native-base";
import { Platform, RefreshControl, SafeAreaView, ScrollView, StatusBar, StyleSheet } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes'
import { Constants } from "./src/helpers/constants";

export default function App() {

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <StatusBar  backgroundColor={Constants.dPrimaryColor} barStyle="light-content"/>
          <Routes />
      </NavigationContainer>
    </NativeBaseProvider>
    
  )
}