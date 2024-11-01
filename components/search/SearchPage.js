// SearchPage.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import SearchBar from './SearchBar'; // Importing SearchBar component

const categoriesData = [
    { name: "Fruits", imageUrl: "URL_TO_IMAGE_FOR_FRUITS", description: "Fresh and organic fruits from various regions." },
    { name: "Vegetables", imageUrl: "URL_TO_IMAGE_FOR_VEGETABLES", description: "Varieties of fresh and green vegetables." },
    { name: "Dairy Products", imageUrl: "URL_TO_IMAGE_FOR_DAIRY_PRODUCTS", description: "Milk, cheese, butter, and other dairy items." },
    { name: "Rice & Pulses", imageUrl: "URL_TO_IMAGE_FOR_RICE_AND_PULSES", description: "Different varieties of rice and pulses." },
    // Add more categories as needed
];

const SearchPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredCategories, setFilteredCategories] = useState(categoriesData);

    // Filter categories based on search query
    useEffect(() => {
        const results = categoriesData.filter(category =>
            category.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredCategories(results);
    }, [searchQuery]);

    const renderCategory = ({ item }) => (
        <View style={styles.categoryItem}>
            <Image source={{ uri: item.imageUrl }} style={styles.categoryImage} />
            <View style={styles.textContainer}>
                <Text style={styles.categoryName}>{item.name}</Text>
                <Text style={styles.categoryDescription}>{item.description}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <FlatList
                data={filteredCategories}
                keyExtractor={(item) => item.name}
                renderItem={renderCategory}
                ListEmptyComponent={<Text style={styles.noResults}>No results found</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    categoryItem: {
        flexDirection: 'row',
        padding: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    categoryImage: {
        width: 50,
        height: 50,
        marginRight: 10,
        borderRadius: 5,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    categoryName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    categoryDescription: {
        fontSize: 12,
        color: '#777',
    },
    noResults: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#777',
    },
});

export default SearchPage;
