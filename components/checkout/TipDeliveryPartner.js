import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/Colors';

const TipDeliveryPartner = () => {
    const [tipAmount, setTipAmount] = useState(null);

    const handleTipSubmit = () => {
        // Handle the tip submission logic here
        alert(`You tipped $${tipAmount}`);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tip Your Delivery Partner</Text>
            <Text style={styles.description}>
                Your delivery partner appreciates your generosity! 100% of your tip will go directly to your delivery partner.
            </Text>

            <View style={styles.tipOptions}>
                {[5, 10, 15].map((amount) => (
                    <TouchableOpacity 
                        key={amount} 
                        style={[styles.tipButton, tipAmount === amount && styles.selectedTip]} 
                        onPress={() => setTipAmount(amount)}
                    >
                        <Text style={styles.tipText}>₹{amount}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor:Colors.WHITE,
        borderRadius: 8,
        // elevation: 1,
        marginTop:0,
        margin:15,
    },
    title: {
        fontSize: 18,
        marginBottom: 10,
        fontWeight:'bold',
    },
    description: {
        fontSize: 14,
        marginBottom: 20,
    },
    tipOptions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    tipButton: {
        width:70,
        height:40,
        textAlign:'center',
        padding: 5,
        borderRadius: 5,
        borderColor:Colors.GRAY,
        borderWidth:0.4
    },
    selectedTip: {
        backgroundColor: '#4caf50',
    },
    tipText: {
        fontSize: 18,
        color: '#000',
    },
});

export default TipDeliveryPartner;
