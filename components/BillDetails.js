// src/components/BillDetails.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors'; // Adjust based on your project structure

const BillDetails = ({ itemsTotal, deliveryCharge, handlingCharge, smallCartCharge, grandTotal, totalSavings }) => {
    return (
        <View style={styles.billDetailsContainer}>
            <Text style={styles.billTitle}>Bill Details</Text>
            <View style={styles.billItemRow}>
                <Text style={styles.billItem}>Items Total:</Text>
                <Text style={styles.billValue}>₹{itemsTotal}</Text>
            </View>
            <View style={styles.billItemRow}>
                <Text style={styles.billItem}>Delivery Charge:</Text>
                <Text style={styles.billValue}>₹{deliveryCharge}</Text>
            </View>
            <View style={styles.billItemRow}>
                <Text style={styles.billItem}>Handling Charge:</Text>
                <Text style={styles.billValue}>₹{handlingCharge}</Text>
            </View>
            <View style={styles.billItemRow}>
                <Text style={styles.billItem}>Small Cart Charge:</Text>
                <Text style={styles.billValue}>₹{smallCartCharge}</Text>
            </View>
            <View style={styles.billTotalRow}>
                <Text style={styles.billTotal}>Grand Total:</Text>
                <Text style={styles.billTotalValue}>₹{grandTotal}</Text>
            </View>
            <View style={styles.savingsRow}>
                <Text style={styles.billSavings}>Your Total Savings:</Text>
                <Text style={styles.billSavingsValue}>₹{totalSavings}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    billDetailsContainer: {
        padding: 20,
        borderWidth: 0.2,
        borderColor: Colors.GRAY,
        marginTop: 20,
        backgroundColor: Colors.WHITE,
        borderRadius: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        margin:15,
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    billTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 15,
        color: Colors.PRIMARY, 
    },
    billItemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
    },
    billItem: {
        fontSize: 12,
        color: Colors.DARK_GRAY,
    },
    billValue: {
        fontSize: 12,
        color: Colors.BLACK,
        // fontWeight: 'bold', // Bold for emphasis
    },
    billTotalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 0.2,
        borderColor: Colors.GRAY,
        paddingVertical: 6,
        marginTop: 5,
    },
    billTotal: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    billTotalValue: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.BHAGWA,
    },
    savingsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 7,
    },
    billSavings: {
        fontSize: 14,
        color: Colors.DARK_GRAY,
    },
    billSavingsValue: {
        fontSize: 16,
        color: Colors.GREEN,
        fontWeight: 'bold',
    },
});

export default BillDetails;
