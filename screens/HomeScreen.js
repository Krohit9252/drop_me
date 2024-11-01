import React, { useState, useEffect } from 'react';
import { ScrollView, Text, StyleSheet, Dimensions, View, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { globalState } from '../context/AuthContext'; // Adjust as needed
import { Colors } from '../constants/Colors'; // Adjust as needed
import SearchBar from '../components/search/SearchBar'; // Import your SearchBar component
import LocationDisplay from '../components/location/LocationDisplay'; // Import LocationDisplay
import { useNavigation } from '@react-navigation/native'; // Import navigation hook
import ImageSlider from '../components/ImageSlider'; // Import your ImageSlider component
import { db } from '../app/config/firebaseConfig'; // Import your Firestore configuration
import { collection, getDocs } from 'firebase/firestore'; // Firestore functions

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
    const [productData, setProductData] = useState([]); // State for product data
    const [loading, setLoading] = useState(true); // Loading state

   // Function to fetch products from Firestore
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'products'));
                const productsArray = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                console.log('Fetched Products:', productsArray); // Log the fetched products
                setProductData(productsArray); // Update state with fetched products
            } catch (error) {
                console.error('Failed to fetch products:', error); // Log error
            } finally {
                setLoading(false); // Stop loading
            }
        };
        useEffect(() => {
            fetchProducts(); // Call the fetch function when the component mounts
        }, []);
    // Filter products based on search query or selected category
    const filteredProducts = productData.filter(product => {
        const matchesSearchQuery = product.name && product.name.toLowerCase().includes(searchQuery.toLowerCase());
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
                    <Image source={{ uri: item.imageUrl }} style={styles.productImage} onError={(error) => {
        console.error("Image loading error: ", error.nativeEvent.error);
    }}/>
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
                    <Text style={styles.productTitle}>{item.name}</Text>
                    <Text style={styles.productPrice}>₹{item.price}</Text>
                </View>
            </View>
        );
    };

    if (loading) {
        return <Text>Loading products...</Text>;
    }

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
            {cartItems.length > 0 && (
                <TouchableOpacity
                    style={styles.floatingCartButton}
                    onPress={() => navigation.navigate('Checkout', { screen: 'Checkout', params: { cartItems, similarProducts: filteredProducts } })}
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
        marginTop: 15,
    },
    productItemContainer: {
        flex: 1,
        margin: 5,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: Colors.WHITE,
        elevation: 1,
    },
    productImageContainer: {
        position: 'relative',
    },
    productImage: {
        width: '100%',
        height: 120,
        borderRadius: 10,
    },
    productDetailsContainer: {
        padding: 10,
    },
    productTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    productPrice: {
        fontSize: 14,
        color: Colors.PRIMARY,
    },
    addToCartButton: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: Colors.PRIMARY,
        padding: 10,
        borderRadius: 5,
    },
    addToCartText: {
        color: Colors.WHITE,
        fontWeight: 'bold',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 10,
        right: 10,
    },
    quantityButton: {
        backgroundColor: Colors.PRIMARY,
        padding: 5,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    quantityButtonText: {
        color: Colors.WHITE,
        fontWeight: 'bold',
    },
    quantityText: {
        fontSize: 16,
        marginHorizontal: 10,
    },
    floatingCartButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: Colors.PRIMARY,
        padding: 15,
        borderRadius: 30,
        elevation: 5,
    },
    cartText: {
        color: Colors.WHITE,
        fontWeight: 'bold',
    },
    scrollView: {
        flexGrow: 1,
    },
    content: {
        padding: 10,
    },
    email: {
        fontSize: 16,
        marginVertical: 10,
        textAlign: 'center',
    },
});

export default HomeScreen;
