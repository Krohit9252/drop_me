import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { globalState } from '../context/AuthContext'; // Ensure you have this context file
import WelcomeScreen from '../components/Welcome'; // Welcome screen component
import DrawerNavigator from '../components/navigation/DrawerNavigator'; // Drawer Navigator component
import { Colors } from '../constants/Colors'; // Color constants
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

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

    // Handle "Get Started" on the Welcome screen
    const handleGetStarted = async () => {
        setShowWelcome(false);
        await AsyncStorage.setItem('hasSeenWelcome', 'true');
    };

    // Handle successful sign-in and update the global state
    const handleSignInSuccess = (user) => {
        setIsSignedIn(true); // Update local state
        globalState.email = user.email; // Store user email in global state
    };

    // Handle user logout
    const handleLogout = async () => {
        setIsSignedIn(false); // Update local state to false
        await AsyncStorage.setItem('isSignedIn', 'false'); // Persist logout state
        router.push('/auth/sign-in'); // Redirect to sign-in screen
    };

    return (
        <>
            {showWelcome ? (
                <WelcomeScreen onGetStarted={handleGetStarted} />
            ) : (
                <DrawerNavigator
                    handleLogout={handleLogout}
                    handleSignInSuccess={handleSignInSuccess}
                    globalState={globalState} // Pass global state to drawer navigator
                />
            )}
        </>
    );
}
