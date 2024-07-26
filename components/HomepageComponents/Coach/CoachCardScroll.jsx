import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Arrow from "react-native-vector-icons/Entypo";
import { Link, router } from "expo-router";

const CoachCardScroll = () => {
  const [coaches, setCoaches] = useState([]);


  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const response = await fetch(
          "https://fittrainer-24host.netlify.app/.netlify/functions/server/coaches"
        );
        const data = await response.json();
        setCoaches(data);
      } catch (error) {
        console.error("Error fetching coaches:", error);
      }
    };
    fetchCoaches();
  }, []);

  const onPressTrainer = (trainerName) => {
    router.push({ pathname: "/Coach", params: { trainerName } });
    console.log(trainerName);
  };

  return (
    <SafeAreaView>
      <View style={{marginBottom:100,}}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginLeft: 20,
          marginRight: 20,
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: "bold", marginLeft: 10 }}>
          Find a Coach
        </Text>
        <Link
          href="/ListCoach"
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Arrow name="chevron-right" size={20} color="black" />
        </Link>
      </View>
      <ScrollView horizontal={true} key={coaches} style={styles.container}>
        {coaches.slice(0, 3).map((coach) => (
          <TouchableOpacity
            key={coach.id}
            onPress={() => onPressTrainer(coach.username)}
          >
            <View style={styles.card}>
              <Image source={{ uri: coach.image }} style={styles.image} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{coach.username}</Text>
              <Text style={styles.price}>{coach.price} $</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  card: {
    width: 250,
    height: 150, // Adjusted height to accommodate additional content
    backgroundColor: "#333",
    marginHorizontal: 5,
    borderRadius: 10,
    justifyContent: "center",
    overflow: "hidden", // Ensures the image doesn't overflow the card
    position: "relative",
  },
  heartIcon: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  textContainer: {
    marginTop: 10, // Added margin to create space between image and text
  },
  title: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  price: {
    color: "black",
    fontSize: 14,
  },
});

export default CoachCardScroll;
