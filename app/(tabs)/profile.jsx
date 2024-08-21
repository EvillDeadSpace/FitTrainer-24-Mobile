import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";

import { SafeAreaView } from "react-native-safe-area-context";

import { useContext } from "react";
import { UserContext } from "../../components/Context/Context";

import { FontAwesome6 } from "@expo/vector-icons";
import Constants from "expo-constants";
import * as Application from "expo-application";

import { router, Link } from "expo-router";

import { Button } from "tamagui";



//icon
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';



const profile = () => {
  const FIND_COACH_USERNAME = process.env.FIND_COACH_USERNAME;
  const BUY_PREMIUM = process.env.BUY_PREMIUM;

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
      const response = await fetch(FIND_COACH_USERNAME);
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
      const response = await fetch(BUY_PREMIUM, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });
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
        <Button
          style={styles.button}
          onPress={() => router.navigate("/Settings")}
        >
          <Feather name="settings" size={21} color="white" />
          <Text style={styles.buttonText}>Profile Settings</Text>
        </Button>
        <Button
          style={styles.button}
          onPress={() => router.navigate("/Privacy")}
        >
          <MaterialIcons name="privacy-tip" size={21} color="white" />
          <Text style={styles.buttonText}>Privacy</Text>
        </Button>

        {isCoach ? (
          <>
            <Button
              style={styles.button}
              onPress={() => router.push("/CoachSettings")}
            >
               <AntDesign name="edit" size={21} color="white" />
              <Text style={styles.buttonText}>Edit Coach Profile</Text>
             
            </Button>
            <Button style={styles.button} onPress={() => router.push("/Chat")}>
            <Ionicons name="chatbox-outline" size={24} color="white" />
              <Text style={styles.buttonText}>Chat</Text>
            </Button>
            <Button onPress={() => buyPremium(username)} style={styles.button}>
            <MaterialIcons name="workspace-premium" size={24} color="white" />
              <Text style={styles.buttonText}>Buy Premium Account</Text>
            </Button>
          </>
        ) : (
          <Button
            style={styles.button}
            onPress={() => router.push("/UserChat")}
          >
            <Text style={styles.buttonText}>Chat</Text>
          </Button>
        )}
        <Button
          style={styles.button}
          onPress={() => router.replace("/sign-in")}
        >
          <SimpleLineIcons name="logout" size={24} color="white" />
          <Text  style={styles.buttonText}>Log Out</Text>
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
  buttonText:{
    color:"white",
    fontSize:16,
    fontWeight:"medium"
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
    width: "80%",
    alignItems: "center",
    backgroundColor: "#9575cd",

    color: "black",
  },
});
