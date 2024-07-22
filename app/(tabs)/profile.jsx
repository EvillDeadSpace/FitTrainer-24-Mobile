import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from "react-native";
import React, { useState, useEffect } from "react";

import { SafeAreaView } from "react-native-safe-area-context";

import { useContext } from "react";
import { UserContext } from "../../components/Context/Context";

import { FontAwesome6 } from "@expo/vector-icons";
import Constants from "expo-constants";
import * as Application from "expo-application";

import { router, Link } from "expo-router";

import { Button } from "tamagui";

const profile = () => {
  const { username } = useContext(UserContext);

  const [isCoach, setIsCoach] = useState(false);

  const version = Constants.expoConfig.version;
  const appOwnership = Constants.appOwnership;

  console.log(appOwnership);

  useEffect(() => {
    // Pozivamo funkciju za proveru da li je korisnik trener
    checkIfCoach();
  }, []);

  const checkIfCoach = async () => {
    try {
      // Pozivamo API endpoint za dobijanje podataka o trenerima
      const response = await fetch(
        "https://fittrainer-24host.netlify.app/.netlify/functions/server/coaches"
      );
      const data = await response.json();

      // Proveravamo da li trenutni korisnik postoji u listi trenera
      const coach = data.find((coach) => coach.username === username);

      // Postavljamo isCoach na true ako je trenutni korisnik trener (premium korisnik)
      setIsCoach(!!coach);
    } catch (error) {
      console.error("Error fetching coaches:", error);
    }
  };

  const buyPremium = async (username) => {
    try {
      const response = await fetch(
        "https://fittrainer-24host.netlify.app/.netlify/functions/server/api/premium",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username }),
        }
      );
      if (response.ok) {
        Alert.alert("Success", "You have purchased premium!"); // Refresh the list of coaches
      } else {
        Alert.alert("Error", "Could not purchase premium.");
      }
    } catch (error) {
      console.error("Error purchasing premium:", error);
      Alert.alert("Error", "Could not purchase premium.");
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome,</Text>
        <Text style={styles.normalText}>
          to your Profile settings {username}
        </Text>

        <Text style={styles.normalText}>Version:{version}</Text>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 25,
        }}
      >
        <FontAwesome6 name="user" size={56} color="black" />
      </View>
      <View style={styles.contentContainer}>
      <Button style={styles.button}
        onPress={()=> router.navigate("/Settings")}>
          <Text style={styles.normalText}>Profile Settings</Text>
        </Button>
        <Button style={styles.button}
         onPress={()=> router.navigate("/Privacy")}>
          <Text>Privacy</Text>
        </Button>
       
        {isCoach && (
          <>
            <Button style={styles.button}
             onPress={()=> router.navigate("/CoachSettings")}>
              <Text>Edit Coach Profile</Text>
            </Button>
            <Button
              onPress={() => buyPremium(username)}
              style={styles.button}
            >
              Buy Premium Account
            </Button>
          </>
        )}
          <Button
          style={styles.button}
          onPress={() => router.replace("/sign-in")}
        >
          <Text>Log Out</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default profile;

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  welcomeText: {
    fontWeight: "bold",
    fontSize: 24,
  },
  normalText: {
    fontSize: 16,
  },
  contentContainer: {
    flexDirection: "column",
    // Razmak između dječjih elemenata
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  button: {
    marginVertical: 8,
    width: "90%",
    alignItems: "center",
    backgroundColor: "#9575cd",
    padding: 10,
    color: "black",
  },
});
