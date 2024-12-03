import React from 'react';
import { Box, VStack, Text, HStack } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

export default function Info({ profile, openModal, bodyModal }) {
  const clickBell = async () => {

  };

  return (
    <HStack justifyContent="space-between" alignItems="center">
      <VStack>
        <Box>
          <Text fontSize={15} color="#FFF" fontWeight="bold">
            {profile.name}
          </Text>
        </Box>
        <Box>
          <Text fontSize={13} color="#FFF">
            Apartamento: {profile.apartment ?? 'N/A'}
          </Text>
        </Box>
        <Box>
          <Text fontSize={13} color="#FFF">
            Telefone: {profile.phone ?? 'N/A'}
          </Text>
        </Box>
        <Box>
          <Text fontSize={13} color="#FFF">
            Email: {profile.email ?? 'N/A'}
          </Text>
        </Box>
      </VStack>
      <VStack justifyContent="center" mr={3}>
        <TouchableOpacity onPress={() => clickBell()}>
          <FontAwesome name="bell" size={28} color="#FFF" />
        </TouchableOpacity>
      </VStack>
    </HStack>
  );
}
