import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserContext } from "../../components/Context/Context";
import { Link, router } from 'expo-router';

const UserChat = () => {
    const { username } = useContext(UserContext);
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`https://fittrainer-24host.netlify.app/.netlify/functions/server/api/ordersComplite/${username}`);
                const data = await response.json();
                console.log(data);

                // Transformiši podatke u niz objekata
                const transformedOrders = data.trainers.map((trainer, index) => ({
                    trainer,
                    status: data.status[index],
                    orderPendingStatus: data.orderPendingStatus[index]
                }));

                setOrders(transformedOrders);
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, [username]);

    const handlePress = (user) => {
        router.push({ pathname: "/ChatUser", params: { user } });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handlePress(item.trainer)}>
            <View style={styles.orderItem}>
                <Text>Trainer: {item.trainer}</Text>
                <Text>Status: {item.status ? 'Confirmed' : 'Not Confirmed'}</Text>
                <Text>Order Status: {item.orderPendingStatus}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView>
            <View style={styles.container}>
                {isLoading ? (
                    <Text>Loading...</Text>
                ) : (
                    <FlatList
                        data={orders}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    orderItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default UserChat;