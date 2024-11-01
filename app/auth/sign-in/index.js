// /app/auth/sign-in/index.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth'; // Firebase Auth function
import { auth, db } from '../../config/firebaseConfig'; // Import Firestore and Auth
import { collection, query, where, getDocs } from 'firebase/firestore'; // Firestore functions
import { globalState } from '../../../context/AuthContext'; // Adjust based on your context setup

export default function SignIn() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignIn = async () => {
        // Assuming you have the user object from sign-in
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user; // Get the user

    try {
    // Fetch user details from Firestore using the email
    const q = query(collection(db, "users"), where("email", "==", user.email));
    const querySnapshot = await getDocs(q);

    // Check if the query snapshot is empty
    if (querySnapshot.empty) {
        Alert.alert("No user found", "No user data exists in Firestore for this email.");
    } else {
        // Assuming only one document per user
        const userDoc = querySnapshot.docs[0].data();
        const userName = userDoc.name;
        const userPhone = userDoc.phone;
        globalState.name = userName; 
        globalState.email = userDoc.email; 
        globalState.uid = userDoc.uid; 
        router.push('/'); 
    }
    } catch (error) {
        console.error("Error fetching user data: ", error);
        Alert.alert("Error", "Failed to fetch user data from Firestore.");
    }

    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign In</Text>
            <View style={styles.inputContainer}>
                <Text>Email:</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Enter Email'
                    value={email}
                    onChangeText={setEmail}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text>Password:</Text>
                <TextInput
                    secureTextEntry={true}
                    style={styles.input}
                    placeholder='Enter Password'
                    value={password}
                    onChangeText={setPassword}
                />
            </View>
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <TouchableOpacity style={styles.button} onPress={handleSignIn}>
                <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
            <View style={styles.signInContainer}>
                <Text>Already have an account? </Text>
                <TouchableOpacity onPress={() => router.push('/auth/sign-up')}>
                    <Text style={styles.signInText}>Sign In</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        padding: 25,
        backgroundColor: 'white',
        height: '100%',
    },
    title: {
        fontSize: 25,
        marginTop: 30,
        fontWeight: 'bold',
    },
    inputContainer: {
        marginTop: 20,
    },
    input: {
        padding: 15,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 15,
    },
    button: {
        padding: 15,
        marginTop: 50,
        backgroundColor: 'blue',
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    signInContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    signInText: {
        color: 'blue',
        fontWeight: 'bold',
    },
    error: {
        color: 'red',
        marginTop: 10,
        textAlign: 'center',
    },
});
