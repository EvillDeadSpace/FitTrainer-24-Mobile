import { View, Text, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'


//use context 
import { useContext } from "react";
import { UserContext } from "../../components/Context/Context";

const CoachOrder = () => {

    const { username } = useContext(UserContext);

    const [orders, setOrders] = useState([]);

    const fetchOrders = async (coachName) => {
      const url = `https://fittrainer-24host.netlify.app/.netlify/functions/server/api/coach/${coachName}`;
  
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
  
          // Extract ordersToTake from the first object in the fetched data array
          const ordersToTake = data[0].ordersToTake;
          console.log('Orders to Take:', ordersToTake); // Log ordersToTake
  
          return ordersToTake;
      } catch (error) {
          console.error('Error fetching orders:', error);
      }
  };
  
  useEffect(() => {
      const getOrders = async () => {
          const fetchedOrders = await fetchOrders(username);
          setOrders(fetchedOrders);
      };
      getOrders();
  }, []);


  const updateOrderStatus = async (username, trainer) => {
    try {
        const response = await fetch('https://fittrainer-24host.netlify.app/.netlify/functions/server/api/updateOrderStatus', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, trainer })
        });

        const data = await response.json();

        if (response.ok) {
            console.log('Order status updated successfully', data);
            // Ovdje možete ažurirati stanje ili prikazati poruku korisniku
        } else {
            console.error('Error updating order status:', data.message);
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
};





return (
    <SafeAreaView>
        {orders && orders.length > 0 ? (
            orders.map((order, index) => (
                <TouchableOpacity key={index} onPress={() => updateOrderStatus(orders, username)}>
                    <Text>{order}</Text>
                </TouchableOpacity>
            ))
        ) : (
            <Text>No orders found</Text>
        )}
    </SafeAreaView>
)
}

export default CoachOrder