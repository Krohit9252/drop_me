import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PrivacyScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Privacy Policy Screen</Text>
      <Text style={styles.content}>This is the Privacy Policy Screen. Here you can provide privacy policy details.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default PrivacyScreen;
