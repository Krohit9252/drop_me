// /components/Categories.js
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const categoriesData = [
    { id: '1', title: 'Electronics' },
    { id: '2', title: 'Fashion' },
    { id: '3', title: 'Home & Garden' },
    { id: '4', title: 'Sports' },
    { id: '5', title: 'Toys' },
];

const Categories = () => {
    const renderCategory = ({ item }) => (
        <View style={styles.categoryItem}>
            <Text style={styles.categoryTitle}>{item.title}</Text>  {/* Correctly wrapped in <Text> */}
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Categories</Text>
            <FlatList
                data={categoriesData}
                renderItem={renderCategory}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    categoryItem: {
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
    },
    categoryTitle: {
        fontSize: 16,
    },
});

export default Categories;
