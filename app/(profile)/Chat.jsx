import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, useLocalSearchParams } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';


//context
import { UserContext } from "../../components/Context/Context";
import { Link, router } from 'expo-router';

const Chat = () => {
    const { username } = useContext(UserContext);
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`https://fittrainer-24host.netlify.app/.netlify/functions/server/${username}/orders`);
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, [username]);

 
    const handlePress = (user) => {
        router.push({pathname: "/ChatUser", params: { user }});
    };

    return (
        <SafeAreaView>
            <View style={styles.container}>
                {isLoading ? (
                    <View style={styles.animationContainer}>
                        <LottieView
                            autoPlay
                            style={{
                                width: 450,
                                height: 450,
                            }}
                            source={require('../../constants/Lottie/CatAnimationv2.json')}
                        />
                    </View>
                ) : (
                    <>
                        <Text style={styles.header}>List of Orders</Text>
                        <FlatList
                            data={orders}
                            keyExtractor={(item) => item._id}
                            renderItem={({ item }) => (
                                
                                <View style={styles.orderItem}>
                                    <TouchableOpacity onPress={()=> handlePress(item.user)}>
                                    <Text style={styles.orderText}>User: {item.user}</Text>
                                    <Text style={styles.orderText}>Confirmed: {item.confirmed ? 'Yes' : 'No'}</Text>
                                    </TouchableOpacity>
                              </View>
                                
                            )}
                        />
                    </>
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
       
        padding: 16,
    },
    animationContainer: {
   
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 16,
    },
    orderItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    orderText: {
        fontSize: 16,
    },
});

export default Chat;