// /app/auth/sign-up/index.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Firebase Auth function
import { auth, db } from '../../config/firebaseConfig'; // Import Firestore and Auth
import { collection, doc, setDoc } from 'firebase/firestore'; // Firestore functions

export default function SignUp() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');  // New Name Field
    const [phone, setPhone] = useState(''); // New Phone Field
    const [error, setError] = useState('');

    const handleSignUp = async () => {
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            // Create user with email and password using Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // After user is created, save additional user details in Firestore
            const userDocRef = doc(collection(db, "users"), user.uid); // Reference to the 'users' collection
             await setDoc(userDocRef, {
                name: name,
                phone: phone,
                email: email,
                createdAt: new Date(),
                uid: user.uid
            });
            router.push('/auth/sign-in'); // Navigate to the home screen after sign-up
        } catch (error) {
            console.error("Error during sign-up: ", error);
            setError("Sign-up failed. Please try again.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Account</Text>
            
            <View style={styles.inputContainer}>
                {/* <Text>Name:</Text> */}
                <TextInput
                    style={styles.input}
                    placeholder='Enter Name'
                    value={name}
                    onChangeText={setName}
                />
            </View>
            <View style={styles.inputContainer}>
                {/* <Text>Phone:</Text> */}
                <TextInput
                    style={styles.input}
                    placeholder='Enter Phone'
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType='phone-pad'
                />
            </View>

            <View style={styles.inputContainer}>
                {/* <Text>Email:</Text> */}
                <TextInput
                    style={styles.input}
                    placeholder='Enter Email'
                    value={email}
                    onChangeText={setEmail}
                />
            </View>
            
            <View style={styles.inputContainer}>
                {/* <Text>Password:</Text> */}
                <TextInput
                    secureTextEntry={true}
                    style={styles.input}
                    placeholder='Enter Password'
                    value={password}
                    onChangeText={setPassword}
                />
            </View>
            
            <View style={styles.inputContainer}>
                {/* <Text>Confirm Password:</Text> */}
                <TextInput
                    secureTextEntry={true}
                    style={styles.input}
                    placeholder='Confirm Password'
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
            </View>

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>
            <View style={styles.signInContainer}>
                <Text>Already have an account? </Text>
                <TouchableOpacity onPress={() => router.push('/auth/sign-in')}>
                    <Text style={styles.signInText}>Sign In</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 15,
        padding: 25,
        backgroundColor: 'white',
        height: '100%',
    },
    title: {
        fontSize: 25,
        marginTop: 30,
        fontWeight: 'bold',
        // marginLeft:30,
        textAlign:'center'
    },
    inputContainer: {
        marginTop: 40,
        marginLeft:10,
    },
    input: {
        padding: 15,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 15,
        height:45,
        width:'95%'
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
