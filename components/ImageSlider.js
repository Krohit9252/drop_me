// components/ImageSlider.js
import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import { Colors } from '../constants/Colors';

const { width } = Dimensions.get('window');

const ImageSlider = ({ images }) => {
    return (
        <Swiper
            style={styles.wrapper}
            showsButtons={false}
            autoplay={true}
            autoplayTimeout={4}
        >
            {images.map((image, index) => (
                <View key={index} style={styles.slide}>
                    <Image source={{ uri: image }} style={styles.image} />
                </View>
            ))}
        </Swiper>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        height: 150, // Height of the slider
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10, // Add border radius for rounded corners
        overflow: 'hidden', // Prevent image overflow
        shadowColor: Colors.GRAY, // Shadow color
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3, // Shadow opacity
        shadowRadius: 6, // Shadow blur radius
        elevation: 5, // For Android shadow
        marginHorizontal: 10, // Add margin to separate slides
        borderBlockColor:Colors.GRAY
        },
    image: {
        width: width,
        height: '100%',
        resizeMode: 'cover', // Adjust the image to cover the entire area
    },
});

export default ImageSlider;
