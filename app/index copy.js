// App.js
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { FontAwesome } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import OrderScreen from '../screens/OrderScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import HelpScreen from '../screens/HelpScreen';
import ContactScreen from '../screens/ContactScreen';
import AboutScreen from '../screens/AboutScreen';
import PrivacyScreen from '../screens/PrivacyScreen';
import WelcomeScreen from '../components/Welcome';
import SignIn from './auth/sign-in';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { globalState } from '../context/AuthContext'; // Ensure you have this context file
import { auth } from './config/firebaseConfig'; // Ensure you have the Firebase config

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function TabNavigator() {
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
}

export default function App() {
    const router = useRouter();
    const [showWelcome, setShowWelcome] = React.useState(true);
    const [isSignedIn, setIsSignedIn] = React.useState(false); // Local signed-in state

    // Check if the user is signed in when the app loads
    React.useEffect(() => {
        const checkSignInStatus = async () => {
            const signedIn = await AsyncStorage.getItem('isSignedIn');
            const hasSeenWelcome = await AsyncStorage.getItem('hasSeenWelcome');

            if (signedIn === 'true') {
                setIsSignedIn(true);
                setShowWelcome(false); // Directly go to Home if signed in
            } else if (hasSeenWelcome === 'true') {
                setShowWelcome(false); // Skip Welcome screen if already seen
            }
        };

        checkSignInStatus();
    }, []);

    // Update global state when local state changes
    React.useEffect(() => {
        globalState.isSignedIn = isSignedIn; // Sync global state with local state
    }, [isSignedIn]);

    const handleGetStarted = async () => {
        setShowWelcome(false);
        await AsyncStorage.setItem('hasSeenWelcome', 'true');
    };

    const handleSignInSuccess = (user) => {
        setIsSignedIn(true); // Update local state
        globalState.email = user.email; // Store user email in global state or other user details
    };

    const handleLogout = async () => {
        setIsSignedIn(false); // Update local state to false
        await AsyncStorage.setItem('isSignedIn', 'false'); // Persist logout state
        router.push('/auth/sign-in'); // Redirect to sign-in
    };

    return (
        <>
            {showWelcome ? (
                <WelcomeScreen onGetStarted={handleGetStarted} />
            ) : (
                <Drawer.Navigator>
                    <Drawer.Screen
                        name="HomeTabs"
                        component={TabNavigator}
                        options={{ title: 'FataFat' }}
                    />
                    <Drawer.Screen
                        name="About"
                        component={AboutScreen}
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
                </Drawer.Navigator>
            )}
        </>
    );
}
