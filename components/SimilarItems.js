import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors'; // Adjust based on your project structure

const SimilarItems = ({ similarProducts, onAddToCart }) => {
    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemPrice}>₹{item.price}</Text>
            <TouchableOpacity onPress={() => onAddToCart(item)} style={styles.addButton}>
                <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>You might also like</Text>
            <FlatList
                data={similarProducts}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        padding: 10,
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    itemContainer: {
        backgroundColor: Colors.WHITE,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        width: 120,
        alignItems: 'center',
    },
    itemTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    itemPrice: {
        fontSize: 12,
        color: Colors.GRAY,
    },
    addButton: {
        marginTop: 10,
        backgroundColor: Colors.BHAGWA,
        padding: 5,
        borderRadius: 5,
        alignItems: 'center',
    },
    addButtonText: {
        color: Colors.WHITE,
        fontSize: 12,
    },
});

export default SimilarItems;
