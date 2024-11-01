// components/AddressModal.js
import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';

const AddressModal = ({ visible, onClose, onCurrentLocation, onAddNewAddress, onSearchAddress }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>Select Location</Text>

                    {/* Stylish buttons */}
                    <TouchableOpacity style={styles.button} onPress={onCurrentLocation}>
                        <Text style={styles.buttonText}>Use Current Location</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={onAddNewAddress}>
                        <Text style={styles.buttonText}>Add New Address</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={onSearchAddress}>
                        <Text style={styles.buttonText}>Search Street/Area/Name</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button, styles.closeButton]} onPress={onClose}>
                        <Text style={[styles.buttonText, styles.closeButtonText]}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end', // Align modal at the bottom
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Darker background for better focus
    },
    modalView: {
        width: '95%',
        height:'75%',
        backgroundColor: 'white',
        borderRadius: 15, // Rounded corners for a modern look
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 10, // Strong shadow for depth
    },
    modalTitle: {
        fontSize: 22, // Slightly larger font size
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333', // Darker title for readability
    },
    button: {
        width: '100%',
        backgroundColor: '#FF6F61', // Use a bold, vibrant color
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 10, // Rounded corners for buttons
        marginVertical: 10,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff', // White text for contrast
    },
    closeButton: {
        backgroundColor: '#ddd', // Light color for the close button
    },
    closeButtonText: {
        color: '#333', // Dark text for the close button
    },
});

export default AddressModal;
