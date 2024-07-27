import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";


import { useContext } from "react";
import { UserContext } from "../../components/Context/Context";


const Orders = () => {

  const [orders, setOrders] = useState([]);

  const { username } = useContext(UserContext);

  const fetchOrders = async (username) => {
    const url = `https://fittrainer-24host.netlify.app/.netlify/functions/server/api/orders/${username}`;

    try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
    
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    
        const data = await response.json();
        console.log('Fetched data:', data); // Log the entire data object
    
        // Extract orders from each object in the array
        const orders = data.map(user => user.orders).flat();
        console.log('Extracted orders:', orders);
        return orders;
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
  };

  useEffect(() => {
    const getOrders = async () => {// ili bilo koje korisničko ime koje trebaš
      const fetchedOrders = await fetchOrders(username);
      setOrders(fetchedOrders);
    };
    getOrders();
  }, []);

  return (
    <SafeAreaView>
      <Text>Orders</Text>
      {orders && orders.length > 0 ? (
        orders.map((order, index) => (
          <Text key={index}>{order}</Text>
        ))
      ) : (
        <Text>No orders found</Text>
      )}
    </SafeAreaView>
  );
};

export default Orders;
