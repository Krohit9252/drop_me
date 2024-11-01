// components/LocationAddressSelector.js
import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
// import AddressModal from './AddressModal';

const LocationAddressSelector = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [address, setAddress] = useState({});

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
    
            let loc = await Location.getCurrentPositionAsync({});
            setLocation(loc);
    
            let addressResponse = await Location.reverseGeocodeAsync(loc.coords);
            if (addressResponse.length > 0) {
                setAddress(addressResponse[0]);
            }
        })();
    }, []);

    const handleModalClose = () => {
        setModalVisible(false);
    };

    const handleCurrentLocation = () => {
        setAddress({ name: 'Your Current Location', city: '', region: '' });
        handleModalClose();
    };

    const handleAddNewAddress = () => {
        setAddress({ name: 'New Address', city: '', region: '' });
        handleModalClose();
    };

    const handleSearchAddress = () => {
        setAddress({ name: 'Searched Address', city: '', region: '' });
        handleModalClose();
    };

    return (
        <View style={styles.container}>
            {errorMsg ? (
                <Text style={styles.errorText}>{errorMsg}</Text>
            ) : address ? (
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Text style={styles.locationText}>
                        {address.name ? `${address.name}, ` : ''}
                        {address.city ? `${address.city}, ` : ''}
                        {address.region ? address.region : ''}
                    </Text>
                </TouchableOpacity>
            ) : (
                <Text style={styles.waitingText}>Waiting for location...</Text>
            )}
    
            {/* Use the AddressModal component */}
            {/* <AddressModal 
                visible={modalVisible} 
                onClose={handleModalClose} 
                onCurrentLocation={handleCurrentLocation}
                onAddNewAddress={handleAddNewAddress}
                onSearchAddress={handleSearchAddress}
            /> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        marginBottom:0,
    },
    locationText: {
        fontSize: 16,
        color: 'black',
    },
    waitingText: {
        fontSize: 16,
        color: 'gray',
        textAlign: 'center',
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
    },
});

export default LocationAddressSelector;
