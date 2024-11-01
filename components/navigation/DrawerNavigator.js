// components/DrawerNavigator.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { FontAwesome } from '@expo/vector-icons';
import TabNavigator from './TabNavigator';
import AboutScreen from '../../screens/AboutScreen';
import PrivacyScreen from '../../screens/PrivacyScreen';
import ContactScreen from '../../screens/ContactScreen';
import SettingsScreen from '../../screens/SettingsScreen';
import SignIn from '../../app/auth/sign-in';
import ModalNavigator from '../ModalNavigater'; // Import the modal navigator
import ProductForm from '../admin/ProductForm'; // Import the modal navigator

const Drawer = createDrawerNavigator();

const DrawerNavigator = ({ handleLogout, handleSignInSuccess, globalState }) => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen
                name="HomeTabs"
                component={TabNavigator}
                options={{ title: 'DropMe' }}
            />
            <Drawer.Screen
                name="ProductForm"
                component={ProductForm}
                options={{
                    drawerIcon: ({ color }) => (
                        <FontAwesome name="info-circle" size={24} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Privacy Policy"
                component={PrivacyScreen}
                options={{
                    drawerIcon: ({ color }) => (
                        <FontAwesome name="shield" size={24} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Contact"
                component={ContactScreen}
                options={{
                    drawerIcon: ({ color }) => (
                        <FontAwesome name="envelope" size={24} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    drawerIcon: ({ color }) => (
                        <FontAwesome name="cog" size={24} color={color} />
                    ),
                }}
            />
            {globalState.email ? (
                <Drawer.Screen
                    name="Logout" 
                    component={() => {
                        handleLogout(); // Call logout function
                        return null; // Prevent rendering a separate screen
                    }}
                    options={{
                        drawerIcon: ({ color }) => (
                            <FontAwesome name="sign-out" size={24} color={color} />
                        ),
                    }}
                />
            ) : (
                <Drawer.Screen
                    name="Sign In"
                    component={() => <SignIn onSuccess={handleSignInSuccess} />}
                    options={{
                        drawerIcon: ({ color }) => (
                            <FontAwesome name="user-plus" size={24} color={color} />
                        ),
                    }}
                />
            )}
            {/* Modal stack for Checkout */}
            <Drawer.Screen
                name="Checkout"
                component={ModalNavigator}
                options={{
                    drawerLockMode: 'locked-closed',
                    title: 'Checkout',
                    drawerItemStyle: { display: 'none' }, // Hide from the drawer
                }}
            />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;
