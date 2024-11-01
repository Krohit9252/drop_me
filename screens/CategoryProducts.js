// import React from 'react';
// import { View, Text, FlatList, StyleSheet, Image } from 'react-native';

// const groceryItems = [
//     { id: '1', name: 'Apples', image: 'https://cdn-icons-png.flaticon.com/512/415/415733.png', price: '₹80/kg', category: 'Fruits' },
//     { id: '2', name: 'Bananas', image: 'https://cdn-icons-png.flaticon.com/512/415/415731.png', price: '₹50/dozen', category: 'Fruits' },
//     { id: '3', name: 'Tomatoes', image: 'https://cdn-icons-png.flaticon.com/512/415/415725.png', price: '₹40/kg', category: 'Vegetables' },
//     { id: '4', name: 'Potatoes', image: 'https://cdn-icons-png.flaticon.com/512/415/415732.png', price: '₹30/kg', category: 'Vegetables' },
//     { id: '5', name: 'Onions', image: 'https://cdn-icons-png.flaticon.com/512/415/415730.png', price: '₹25/kg', category: 'Vegetables' },
// ];

// const CategoryProducts = ({ route }) => {
//     const { category } = route.params;

//     // Filter products based on the selected category
//     const filteredProducts = groceryItems.filter(item => item.category === category);

//     const renderProduct = ({ item }) => (
//         <View style={styles.productItem}>
//             <Image source={{ uri: item.image }} style={styles.productImage} />
//             <Text style={styles.productName}>{item.name}</Text>
//             <Text style={styles.productPrice}>{item.price}</Text>
//         </View>
//     );

//     if (filteredProducts.length === 0) {
//         return <Text style={styles.noResults}>No products found in this category.</Text>;
//     }

//     return (
//         <View style={styles.container}>
//             <Text style={styles.header}>Products in {category}</Text>
//             <FlatList
//                 data={filteredProducts}
//                 renderItem={renderProduct}
//                 keyExtractor={(item) => item.id}
//                 numColumns={2}
//                 contentContainerStyle={{ paddingBottom: 20 }} // Add padding for scroll
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1, // Ensure it takes full height
//         padding: 10,
//         backgroundColor: '#f2f2f2',
//     },
//     header: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginBottom: 10,
//     },
//     productItem: {
//         backgroundColor: '#fff',
//         borderRadius: 10,
//         padding: 10,
//         margin: 5,
//         flex: 1,
//         alignItems: 'center',
//     },
//     productImage: {
//         width: 80,
//         height: 80,
//     },
//     productName: {
//         marginTop: 5,
//         fontWeight: 'bold',
//     },
//     productPrice: {
//         marginTop: 3,
//         color: '#888',
//     },
//     noResults: {
//         textAlign: 'center',
//         marginVertical: 20,
//         fontSize: 16,
//         color: '#888',
//     },
// });

// export default CategoryProducts;
