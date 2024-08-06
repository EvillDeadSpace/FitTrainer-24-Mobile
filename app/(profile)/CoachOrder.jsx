import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

//use context
import { useContext } from "react";
import { UserContext } from "../../components/Context/Context";

//Swipe
import { Directions, Swipeable } from "react-native-gesture-handler";


//Icon 
import AntDesign from '@expo/vector-icons/AntDesign';

const CoachOrder = () => {
  const { username } = useContext(UserContext);

  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState('');


 

  const fetchOrders = async (coachName) => {
    const url = `https://fittrainer-24host.netlify.app/.netlify/functions/server/api/coach/${coachName}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Fetched data:", data); // Log the entire data object

      // Extract ordersToTake from the first object in the fetched data array
      const ordersToTake = data[0].ordersToTake;
      console.log("Orders to Take:", ordersToTake); // Log ordersToTake

      if (ordersToTake.length > 0) {
        setUser(ordersToTake[0].user);
      }
      ordersToTake.forEach(order => {
        if (order.confirmed === false) {
        }
      });

      const finaleData = ordersToTake.filter(order => order.confirmed === false);
      return finaleData;
    } catch (error) {
      console.error("Error fetching orders:", error);
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
      const response = await fetch(
        "https://fittrainer-24host.netlify.app/.netlify/functions/server/api/updateOrderStatus",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, trainer }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Order status updated successfully", data);
        // Ovdje možete ažurirati stanje ili prikazati poruku korisniku
        Alert.alert("Order status updated successfully");
      } else {
        console.error("Error updating order status:", data.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };


  const RightSwipeAction = () => {
    return(
        <View
            style={{
                justifyContent: "center",
                alignItems: "flex-end",
           
           height: "100%",
           
            }}
        >
            <AntDesign
                style={{
                    margin: 20,
                    padding: 10,
                    backgroundColor: "green",
                    borderRadius: 10,


                }}
            name="check" size={24} color="black" />
        </View>
    )
  };

  const LeftSwipeAction = () => {
    return(
        <View
            style={{
                justifyContent: "center",
                alignItems: "flex-end",
           
           height: "100%",
           
            }}
        >
            <AntDesign
                style={{
                    margin: 20,
                    padding: 10,
                    backgroundColor: "red",
                    borderRadius: 10,
                    

                }}
            name="close" size={24} color="black" />
        </View>
    )
  };



  
  console.log(user);


  return (
    <SafeAreaView>
      <Text style={{
            fontSize: 26,
            margin:20,
            marginVertical: 20,
      }}>Coach Orders</Text>
      {orders && orders.length > 0 ? (
        orders.map((order, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => updateOrderStatus(user, username)}
          >
            <Swipeable
              renderLeftActions={LeftSwipeAction}
              renderRightActions={RightSwipeAction}
              onSwipeableOpen={(direction) => {
                if (direction === "right") {
                    updateOrderStatus(user, username);
                    console.log(username, user);
                } else if (direction === "left") {
                  console.log("Decline");
                }
              }}
            >
                <View style={styles.wrap}>
              <View
                style={styles.container}
              >
                <Text style={styles.text}>{order.user}</Text>
                <Text style={styles.text}>{order.confirmed ? 'Yes' : 'No'}</Text>
              </View>
              </View>
            </Swipeable>
          </TouchableOpacity>
        ))
      ) : (
        <Text>No orders found</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container:{
        width: "90%",
        height: 70,
        backgroundColor: "white",
    
        justifyContent: "center",
        paddingLeft: 20,
        //Ios
        shadowOpacity: 0.08,
        shadowOffset: {width: 0, height: 20},
        shadowRadius: 10,

        //Android
        elevation: 5,

        borderRadius: 10,
    },
    wrap:{
        marginVertical: 10,
        width: "100%",
        alignItems: "center",
    },
    text:{
      
        fontSize: 16,
    }
});

export default CoachOrder;
