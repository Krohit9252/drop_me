import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors } from '@/constants/Colors';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function WelcomeScreen({ onGetStarted }) {
  return (
    <View>
      <Image 
        source={require('./../assets/images/f1.jpg')}
        style={{
          width: '100%',
          height: 500,
        }} 
      />
      <View style={styles.container}>
        <Text style={{
          fontSize: 28,
          fontFamily: 'outfit-Bold',
          textAlign: 'center',
        }}>FaTaFat Delivery App</Text>
        <Text style={{
          fontSize: 17,
          fontFamily: 'outfit',
          textAlign: 'center',
          color: '#808080',
        }}>
          Choose Fatafat for fast, reliable medicine delivery that brings health essentials to your doorstep in no time. Save time, stay healthy, and enjoy hassle-free service when you need it most!
        </Text>
        <TouchableOpacity 
          style={styles.button} 
          onPress={onGetStarted} // Call the function passed down as a prop
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{
              color: Colors.WHITE,
              textAlign: 'center',
              fontFamily: 'outfit',
              fontSize: 17,
            }}>
              Get started
            </Text>
            <AntDesign name="arrowright" size={24} color="white" style={{ marginLeft: 8 }} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d3d3d3',
    marginTop: -10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: '100%',
    padding: 15,
  },
  button: {
    padding: 15,
    backgroundColor: Colors.BHAGWA,
    borderRadius: 90,
    marginTop: '15%',
  },
});
