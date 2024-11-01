// screens/ProfileScreen.js
import React from 'react';
import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

function ProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <MaterialIcons name="person" size={50} color="black" />
      <Text>Profile!</Text>
    </View>
  );
}

export default ProfileScreen;
