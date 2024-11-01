import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Checkout from './Checkout'; // Adjust the path as needed

const Stack = createStackNavigator();

const ModalNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Checkout"
                component={Checkout}
                options={{ headerShown: false, title: 'Checkout' }} // Show header
            />
        </Stack.Navigator>
    );
};

export default ModalNavigator;
