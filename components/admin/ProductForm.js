import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet, ScrollView } from 'react-native';
import { db } from '../../app/config/firebaseConfig'; // Import Firestore/Realtime Database correctly
import { collection, addDoc } from 'firebase/firestore';
import { getDatabase, ref, push } from 'firebase/database';
import { serverTimestamp } from 'firebase/firestore'; // Firestore's server timestamp

const ProductForm = ({ useFirestore = true }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [isAvailable, setIsAvailable] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  // Handle form submission
  const handleSubmit = async () => {
    if (!name || !description || !price || !imageUrl || !stock) {
      Alert.alert('Error', 'Please fill all the required fields.');
      return;
    }

    const productData = {
      name,
      description,
      price: parseFloat(price),
      category,
      stock: parseInt(stock),
      isAvailable,
      imageUrl,
      createdAt: serverTimestamp(), // Firestore's server timestamp
    };

    try {
      if (useFirestore) {
        // Add product to Firestore
        await addDoc(collection(db, 'products'), productData);
      } else {
        // Add product to Realtime Database
        const database = getDatabase();
        await push(ref(database, 'products'), productData);
      }
      Alert.alert('Success', 'Product added successfully!');
      resetForm();
    } catch (error) {
      console.error('Error adding product:', error);
      Alert.alert('Error', 'Something went wrong while adding the product.');
    }
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setPrice('');
    setCategory('');
    setStock('');
    setIsAvailable(false);
    setImageUrl('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={name}
        onChangeText={setName}
        required
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        required
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        required
      />
      <TextInput
        style={styles.input}
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
      />
      <TextInput
        style={styles.input}
        placeholder="Stock"
        value={stock}
        onChangeText={setStock}
        keyboardType="numeric"
        required
      />
      <TextInput
        style={styles.input}
        placeholder="Product Image URL"
        value={imageUrl}
        onChangeText={setImageUrl}
        required
      />

      <View style={styles.checkboxContainer}>
        <Text style={styles.label}>Available:</Text>
        <Button
          title={isAvailable ? "Yes" : "No"}
          onPress={() => setIsAvailable(!isAvailable)}
        />
      </View>

      <Button title="Add Product" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    marginRight: 10,
  },
});

export default ProductForm;
