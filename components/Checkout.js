import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Image, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Colors } from '../constants/Colors'; // Adjust the import based on your project structure
import BillDetails from './BillDetails'; // Import your BillDetails component
import SimilarItems from './SimilarItems'; // Import your SimilarItems component
import OrderCancellationPolicy from './CancellationPolicy'; // Import your SimilarItems component
import TipDeliveryPartner from './checkout/TipDeliveryPartner'; // Import your SimilarItems component

const Checkout = ({ route }) => {
    const { cartItems, similarItems } = route.params; // Ensure similarItems is passed

    const [cart, setCart] = useState(cartItems);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

    const handleAddToCart = (item) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
            if (existingItem) {
                return prevCart.map(cartItem =>
                    cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
                );
            } else {
                return [...prevCart, { ...item, quantity: 1 }];
            }
        });
    };

    const handleRemoveFromCart = (item) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
            if (existingItem) {
                if (existingItem.quantity === 1) {
                    return prevCart.filter(cartItem => cartItem.id !== item.id);
                } else {
                    return prevCart.map(cartItem =>
                        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
                    );
                }
            }
            return prevCart;
        });
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const renderCartItem = ({ item }) => (
        <View style={styles.cartItem}>
            <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
            <View style={styles.itemDetails}>
                <Text style={styles.productTitle}>{item.title}</Text>
                <Text style={styles.productPrice}>₹{item.price * item.quantity}</Text>
            </View>
            <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => handleRemoveFromCart(item)} style={styles.quantityButton}>
                    <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => handleAddToCart(item)} style={styles.quantityButton}>
                    <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <FlatList
                    data={cart}
                    renderItem={renderCartItem}
                    keyExtractor={item => item.id}
                    style={styles.cartList}
                />
                <BillDetails
                    itemsTotal={calculateTotal()}
                    deliveryCharge={50} // Example charge
                    handlingCharge={20}  // Example charge
                    smallCartCharge={10} // Example charge
                    grandTotal={calculateTotal() + 50 + 20 + 10} // Add up charges
                    totalSavings={5}     // Example savings
                />
                {/* <SimilarItems 
                    similarProducts={similarItems} 
                    onAddToCart={handleAddToCart} 
                /> */}
                <TipDeliveryPartner />
                <OrderCancellationPolicy></OrderCancellationPolicy>
            </ScrollView>
            <View style={styles.bottomContainer}>
                <View style={styles.paymentContainer}>
                    <Text style={styles.paymentTitle}>PAY USING:</Text>
                    <Picker
                        selectedValue={selectedPaymentMethod}
                        style={styles.picker}
                        onValueChange={(itemValue) => setSelectedPaymentMethod(itemValue)}
                    >
                        <Picker.Item label="Credit/Debit Card" value="card" />
                        <Picker.Item label="Net Banking" value="net_banking" />
                        <Picker.Item label="UPI" value="upi" />
                    </Picker>
                </View>
                <View style={styles.confirmSection}>
                    <TouchableOpacity style={styles.confirmButton} onPress={() => Alert.alert('Order Confirmed!')}>
                        <Text style={styles.confirmButtonText}>Confirm Order</Text>
                    <Text style={styles.totalText}>Total: ₹{calculateTotal() + 50 + 20 + 10}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#f7f9f9',
    },
    scrollViewContent: {
        paddingBottom: 80,
    },
    cartList: {
        flexGrow: 0,
        margin:15,
        backgroundColor:Colors.WHITE,
        borderRadius: 15,


    },
    cartItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderRadius: 5,
        borderBottomWidth: 0.2,
        borderColor: Colors.GRAY,
        backgroundColor:Colors.WHITE,
        height: 90,
    },
    productImage: {
        width: 70,
        height: 70,
        padding:5,
        borderRadius: 15,
        marginRight: 10,
        backgroundColor:Colors.WHITE,
    },
    itemDetails: {
        flex: 1,
        justifyContent: 'space-between',
    },
    productTitle: {
        fontSize: 12,
    },
    productPrice: {
        fontSize: 14,
        color: Colors.PRIMARY,
        marginBottom: 5,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.BHAGWA,
        borderRadius: 5,
        padding: 3,
        marginLeft: 10,
    },
    quantityButton: {
        borderRadius: 15,
        width: 15,
        height:20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    quantityButtonText: {
        color: Colors.WHITE,
        fontWeight: 'bold',
    },
    quantityText: {
        fontWeight: 'bold',
        fontSize: 16,
        marginHorizontal: 10,
        color: Colors.WHITE,
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderTopWidth: 0.2,
        borderColor: Colors.GRAY,
        borderRadius:10,
        margin:-2,
        backgroundColor:Colors.WHITE,
    },
    paymentContainer: {
        flex: 1,
    },
    paymentTitle: {
        fontSize: 14,
        marginBottom: -2, 
    },
    picker: {
        height: 20,
        width: '100%',
        marginLeft:-10,
    },
    confirmSection: {
        alignItems: 'flex-end',
    },
    totalText: {
        fontSize: 14,
        color:Colors.WHITE
    },
    confirmButton: {
        backgroundColor: Colors.BHAGWA,
        borderRadius: 15,
        padding: 6,
        alignItems: 'center',
        width: 180,
    },
    confirmButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default Checkout;
