// SearchBar.js
import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
    return (
        <View style={styles.container}>
            <FontAwesome name="search" size={18} color="#000" style={styles.icon} />
            <TextInput
                style={styles.searchBar}
                placeholder="Search..."
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        width: '96%',
        marginTop: -5,
    },
    icon: {
        position: 'absolute',
        left: 28,
        top: 15,
    },
    searchBar: {
        flex: 1,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        paddingLeft: 40,
        marginLeft: 13,
        width: '90%',
    },
});

export default SearchBar;
