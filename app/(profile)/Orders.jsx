import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";


import { useContext } from "react";
import { UserContext } from "../../components/Context/Context";


//env
import {USER_ORDER_URL} from "@env";

const Orders = () => {

  const { username } = useContext(UserContext);

  const [trainers, setTrainers] = useState([]);
  const [status, setStatus] = useState([]);
  const [orderPendingStatus, setOrderPendingStatus] = useState([]);

  const fetchOrders = async (username) => {
    const url = `${USER_ORDER_URL}${username}`;

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

        // Extract trainers and status from the data object
        const trainers = data.trainers;
        const status = data.status;
        const orderPendingStatus = data.orderPendingStatus;
        setTrainers(trainers);
        setStatus(status);
        setOrderPendingStatus(orderPendingStatus);
    } catch (error) {
        console.error('Error fetching orders:', error);
    }
};

useEffect(() => {
    fetchOrders(username);
}, []);


  return (
    <SafeAreaView>
          <Text>Orders</Text>
            {trainers && trainers.length > 0 ? (
                trainers.map((trainer, index) => (
                    <Text key={index}>{`Trainer: ${trainer}, Status: ${status[index]}  OrderPandingstatus:${orderPendingStatus}`}</Text>
                ))
            ) : (
                <Text>No orders found</Text>
            )}
    </SafeAreaView>
  );
};

export default Orders;
