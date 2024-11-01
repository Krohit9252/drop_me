import React, { useState } from 'react';
import { ScrollView, Text, StyleSheet, Dimensions,View, FlatList, Image, TouchableOpacity } from 'react-native';
import { globalState } from '../context/AuthContext'; // Adjust as needed
import { Colors } from '../constants/Colors'; // Adjust as needed
import SearchBar from '../components/search/SearchBar'; // Import your SearchBar component
import LocationDisplay from '../components/location/LocationDisplay'; // Import LocationDisplay
import { useNavigation } from '@react-navigation/native'; // Import navigation hook
import ImageSlider from '../components/ImageSlider'; // Import your ImageSlider component
// import Checkout from '// Import the new Checkout screen
const { width } = Dimensions.get('window');


const categoriesData = [
    { id: '2', title: 'Grocery', image: 'https://cdn-icons-png.flaticon.com/512/3724/3724788.png' },
    { id: '1', title: 'Medicine', image: 'https://cdn-icons-png.flaticon.com/512/172/172011.png' },
    { id: '3', title: 'Personal Care', image: 'https://cdn-icons-png.flaticon.com/512/3901/3901586.png' },
];
// Sample images for the ImageSlider
const images = [
    'https://midlandhealthcare.org/wp-content/uploads/2021/06/Pediatrics.jpg',
    'https://marvel-b1-cdn.bc0a.com/f00000000185644/www.usp.org/sites/default/files/2022-01/generics-slider-1600x400-2.jpg',
    'https://maggohospital.com/wp-content/uploads/2019/11/banner5.jpg',
];
const ProductData = [
    { id: '1', title: 'Apple', category: 'Grocery', image: '../assets/images/strawery.jpeg', price: 10},
    { id: '2', title: 'Medicine A', category: 'Medicine', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDCBLPbWLCWusF0c8oNM88u5SmUPxc1sRmcA&s  ', price: 50 },
    { id: '3', title: 'Medicine B', category: 'Medicine', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2HAB0b8Ak6CZpQhOwTj--gBYqaz1ZpokgKA&s' , price: 70},
    { id: '4', title: 'Medicine B', category: 'Medicine', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2HAB0b8Ak6CZpQhOwTj--gBYqaz1ZpokgKA&s' , price: 70},
    { id: '5', title: 'Medicine B', category: 'Medicine', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2HAB0b8Ak6CZpQhOwTj--gBYqaz1ZpokgKA&s' , price: 70},
    { id: '6', title: 'Medicine B', category: 'Medicine', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2HAB0b8Ak6CZpQhOwTj--gBYqaz1ZpokgKA&s' , price: 70},
]

const Categories = ({ searchQuery, setSelectedCategory }) => {
    // Filter categories based on the search query
    const filteredCategories = categoriesData.filter(category =>
        category.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderCategory = ({ item }) => (
        <TouchableOpacity
            style={styles.categoryItem}
            onPress={() => {
                setSelectedCategory(item.title);
                navigation.navigate('FormScreen', { category: item.title }); // Navigate to FormScreen
            }}
        >
            <Image source={{ uri: item.image }} style={styles.categoryImage} />
            <Text style={styles.categoryTitle}>{item.title}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Categories</Text>
            <FlatList
                data={filteredCategories}
                renderItem={renderCategory}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

const HomeScreen = () => {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [cartItems, setCartItems] = useState([]); // Cart items state
    const [productData, setProductData] = useState([]); // State to hold fetched products


    // Filter products based on search query or selected category
    const filteredProducts = ProductData.filter(product => {
        const matchesSearchQuery = product.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
        return matchesSearchQuery && matchesCategory;
    });
    const handleAddToCart = (product) => {
    setCartItems(prevCartItems => {
        const existingItem = prevCartItems.find(item => item.id === product.id);
        if (existingItem) {
            // If the item already exists, increment its quantity
            return prevCartItems.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
        } else {
            // If it's a new item, add it to the cart with quantity 1
            return [...prevCartItems, { ...product, quantity: 1 }];
        }
    });
};

const handleRemoveFromCart = (product) => {
    setCartItems(prevCartItems => {
        const existingItem = prevCartItems.find(item => item.id === product.id);
        if (existingItem) {
            if (existingItem.quantity === 1) {
                // If quantity is 1, remove the item from the cart
                return prevCartItems.filter(item => item.id !== product.id);
            } else {
                // Otherwise, decrement the quantity
                return prevCartItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                );
            }
        }
        return prevCartItems; // Return the previous state if item not found
    });
};

    
    
    
    const renderProduct = ({ item }) => {
        const cartItem = cartItems.find(cartItem => cartItem.id === item.id);
    
        return (
            <View style={styles.productItemContainer}>
                <View style={styles.productImageContainer}>
                    <Image source={{ uri: item.image }} style={styles.productImage} />
                    {/* Show Add button only if item is not in cart */}
                    {!cartItem && (
                        <TouchableOpacity
                            style={styles.addToCartButton}
                            onPress={() => handleAddToCart(item)}
                        >
                            <Text style={styles.addToCartText}>Add</Text>
                        </TouchableOpacity>
                    )}
                    {/* Show quantity controls if item is in cart */}
                    {cartItem && (
                        <View style={styles.quantityContainer}>
                            <TouchableOpacity
                                style={styles.quantityButton}
                                onPress={() => handleRemoveFromCart(item)}
                            >
                                <Text style={styles.quantityButtonText}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.quantityText}>{cartItem.quantity}</Text>
                            <TouchableOpacity
                                style={styles.quantityButton}
                                onPress={() => handleAddToCart(item)}
                            >
                                <Text style={styles.quantityButtonText}>+</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
                <View style={styles.productDetailsContainer}>
                    <Text style={styles.productTitle}>{item.title}</Text>
                    <Text style={styles.productPrice}>₹{item.price}</Text>
                </View>
            </View>
        );
    };    
    
    
    return (
        <View style={styles.container}>
            <LocationDisplay />
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <ScrollView style={styles.scrollView}>
            <ImageSlider images={images} />
                <View style={styles.content}>
                    {globalState.email ? (
                        <Text style={styles.email}>{globalState.email}</Text>
                    ) : (
                        <Text style={styles.email}></Text>
                    )}
                    <Categories searchQuery={searchQuery} setSelectedCategory={setSelectedCategory} />
                </View>
                <View style={styles.productsContainer}>
                    <FlatList
                        data={filteredProducts}
                        renderItem={renderProduct}
                        keyExtractor={(item) => item.id}
                        numColumns={3}
                    showsVerticalScrollIndicator={false}
                    />
                </View>
            </ScrollView>
            {cartItems.length > 0 && ( // Change starts here
                <TouchableOpacity
                    style={styles.floatingCartButton}
                    onPress={() => navigation.navigate('Checkout', { screen: 'Checkout', params: { cartItems,similarProducts: filteredProducts } })} // Navigate to Checkout
                >
                    <Text style={styles.cartText}>View Cart ({cartItems.length})</Text>
                </TouchableOpacity>
            )} 



        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 8,
    },
    categoryItem: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.WHITE,
        borderRadius: 15,
        borderColor: Colors.GRAY,
        borderWidth: 0.3,
        padding: 12,
        marginRight: 13,
        width: 100,
        height: 90,
        marginTop: 5,
        marginLeft: 8,
    },
    categoryTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
        color: Colors.GRAY,
    },
    categoryImage: {
        width: 50,
        height: 50,
    },
    container: {
        flex: 1,
    },
    productsContainer: {
    flexGrow: 1,
    marginTop: 20,
    borderColor: Colors.GRAY,
    borderWidth: 0.3,
    padding: 15,
    paddingTop:10,
    },
    productItem: {
        flexDirection: 'column',
        backgroundColor: Colors.WHITE,
        borderRadius: 30,
        borderColor: Colors.BHAGWA,
        borderWidth: 0.3,
        paddingRight: 43,
        width: 200,
        height: 250,
        justifyContent: 'flex-start',
        position: 'relative',

    },
    productImageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        borderColor:Colors.BHAGWA,

    },
    productImage: {
        width: 100,
        height: 80,
        borderRadius: 10,
        borderColor: Colors.BHAGWA,
        margin:5,
    },
    productDetailsContainer: {
        padding: 10,
        justifyContent: 'flex-start',
    },
    productDelivery: {
        fontSize: 12,
        color: Colors.PRIMARY,
        marginBottom: 5,
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 5,
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.PRIMARY,
    },
    productDiscount: {
        fontSize: 12,
        color: 'red',
        marginLeft: 5,
    },
    productTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 3,
        color: Colors.GRAY,
    },
    addToCartButton: {
        position: 'absolute', // Position it absolutely
        bottom: 10, // Distance from the bottom
        right: 10, // Distance from the right
        backgroundColor: Colors.WHITE,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        alignItems: 'center',
        borderColor:Colors.BHAGWA,
        borderWidth:0.5,
    },
    addToCartText: {
        color: Colors.BHAGWA,
        fontSize: 14,
        // fontWeight:10,
    },
    quantityContainer: {
        position: 'absolute', // Position it absolutely
        bottom: 10, // Same position as Add button
        right: 10, // Align with Add button
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityButton: {
        backgroundColor: Colors.BHAGWA,
        padding: 5,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    quantityButtonText: {
        color: Colors.WHITE,
        fontSize: 16,
    },
    quantityText: {
        fontSize: 16,
        marginHorizontal: 10,
    },
    floatingCartButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: Colors.BHAGWA, // Base color
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 30,
        elevation: 5, // Shadow for Android
        shadowColor: '#000', // Shadow color for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        width: 150, // Fixed width for a consistent look
    },
    cartText: {
        color: Colors.WHITE,
        fontSize: 18,
        fontWeight: 'bold',
    },
    scrollView: {
        flex: 1,
    },
    email: {
        margin: 10,
    },
    content: {
        paddingBottom: 20,
    },
});

export default HomeScreen;
