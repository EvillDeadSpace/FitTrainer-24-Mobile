import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/AntDesign";

import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";


import { FadeIn, BounceIn, BounceInRight } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';

const ListCoach = () => {
  useEffect(() => {
    const fetchCoach = async () => {
      try {
        const response = await fetch(
          "https://fittrainer-24host.netlify.app/.netlify/functions/server/coaches"
        );
        const data = await response.json();
        const premiumCoaches = data.filter((coach) => coach.premium);
        const regularCoaches = data.filter((coach) => !coach.premium);

        setPremiumCoaches(premiumCoaches);
        setRegularCoaches(regularCoaches);
      } catch (error) {}
    };
    fetchCoach();
  }, []);




  const [premiumCoaches, setPremiumCoaches] = useState([]);
  const [regularCoaches, setRegularCoaches] = useState([]);

  const onPressTrainer = (trainerName) => {
    router.push({ pathname: "/Coach", params: { trainerName } });
    console.log(trainerName);
  };

  return (
    <SafeAreaView>
      <View style={{}}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <View style={styles.iconContainer}>
              <Icon name="left" size={25} color="black" />
            </View>
          </TouchableOpacity>
          <Text style={styles.text}>Coach</Text>
        </View>
        <Animated.View entering={BounceInRight}
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {premiumCoaches.map((item, index) => (
              <View key={index} style={[styles.row, styles.premiumRow]}>
                <TouchableOpacity onPress={() => onPressTrainer(item.username)}>
                  <View style={styles.premiumCard}>
                    <Image source={{ uri: item.image }} style={styles.image} />
                    <View style={styles.textContainer}>
                      <Text style={styles.title}>{item.username}</Text>
                      <Text style={styles.specialization}>
                        {item.specialization}
                      </Text>
                      <Text style={styles.price}>{item.price} $</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
            {regularCoaches.map((item, index) => (
              <View key={index} style={styles.row}>
                <TouchableOpacity onPress={() => onPressTrainer(item.username)}>
                  <View style={styles.card}>
                    <Image source={{ uri: item.image }} style={styles.image} />
                    <View style={styles.textContainer}>
                      <Text style={styles.title}>{item.username}</Text>
                      <Text style={styles.specialization}>
                        {item.specialization}
                      </Text>
                      <Text style={styles.price}>{item.price} $</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  paddingContainer: {
    padding: 20,
  },
  container: {},
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginLeft: 20,
    marginTop: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  price: {
    fontSize: 24,
    color: "gray",
    fontWeight: "bold",
  },
  specialization: {
    fontSize: 16,
    color: "gray",
  },
  iconContainer: {},
  textContainer: {
    padding: 10,
  },
  title: {
    color: "black",
    fontSize: 22,
    fontWeight: "bold",
  },
  price: {
    color: "black",
    fontSize: 14,
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: 150, // Prilagođena visina slike
    resizeMode: "cover",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
  },
  card: {
    width: 160, // Prilagođena širina za smještanje dviju slika u redu
    height: 260, // Prilagođena visina za dodatni sadržaj ispod teksta
    backgroundColor: "#fff",
    borderRadius: 20,
    overflow: "hidden",
    marginRight: 20,
    marginBottom: 20,
    marginTop: 20,
    margin: 25,
  },
  scrollViewContent: {
    justifyContent: "center",
    alignItems: "center", // Changed alignment to start from left
    flexDirection: "row",
    flexWrap: "wrap", // Changed flexDirection to column
  },
  row: {
    flexDirection: "row",
  },
  premiumCard: {
    width: 160, // Prilagođena širina za smještanje dviju slika u redu
    height: 260, // Prilagođena visina za dodatni sadržaj ispod teksta
    backgroundColor: "#fff",
    borderRadius: 20,
    overflow: "hidden",
    marginRight: 20,
    marginBottom: 20,
    marginTop: 20,
    margin: 25,
    //golder border
    borderWidth: 2,
    borderColor: "gold",
  },
});

export default ListCoach;
