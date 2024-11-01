// components/TabNavigator.js
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import HomeScreen from '../../screens/HomeScreen';
import OrderScreen from '../../screens/OrderScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import HelpScreen from '../../screens/HelpScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="home" size={size} color={color} />
                    ),
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="Order"
                component={OrderScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="shopping-cart" size={size} color={color} />
                    ),
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="user" size={size} color={color} />
                    ),
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="Help"
                component={HelpScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="question-circle" size={size} color={color} />
                    ),
                    headerShown: false,
                }}
            />
        </Tab.Navigator>
    );
};

export default TabNavigator;
