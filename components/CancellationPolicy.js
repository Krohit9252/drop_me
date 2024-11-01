import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

const OrderCancellationPolicy = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Order Cancellation Policy</Text>
            <Text style={styles.description}>
                Orders cannot be cancelled once packed for delivery.
            </Text>
            <Text style={styles.list}>
               In case of unexpected delays, a refund will be provided , if applicable.
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor:Colors.WHITE, 
        borderRadius: 8,
        // elevation: 2, // For Android shadow
        shadowColor: '#000',
        marginTop:0,
        margin:15,
    },
    title: {
        fontSize: 14,
        marginBottom: 10,
        fontWeight:'bold',
    },
    description: {
        fontSize: 12,
    },
    list: {
        fontSize: 12,
        marginBottom: 5,
    },
});

export default OrderCancellationPolicy;
