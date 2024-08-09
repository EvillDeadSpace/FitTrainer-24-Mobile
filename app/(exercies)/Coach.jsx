import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Alert } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import Arrow from "react-native-vector-icons/AntDesign";
import Hearto from "react-native-vector-icons/AntDesign";
import Clock from "react-native-vector-icons/AntDesign";


import LottieView from 'lottie-react-native';


import { Button } from "tamagui";

//use context
import { useContext } from "react";
import { UserContext } from "../../components/Context/Context";



//.env
import { USER_URL, BUY_COACH_URL } from "@env";

const Coach = () => {
  const [finalUserData, setFinalUserData] = useState({});
  const [image, setImage] = useState(null);
  const [coach, setCoach] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  //take coach name 
  const exercise = useLocalSearchParams();
  const coachName = exercise.trainerName;
  console.log(coachName );
  
  //fetch user data
  const { username } = useContext(UserContext);

  

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `${USER_URL}${coachName}`
        );
        const user = await response.json();

        setFinalUserData(user);
        isLoading(false);
      } catch (error) {
        console.error(
          "Greška prilikom dohvaćanja podataka o korisniku:",
          error
        );
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handlerOrder = async () => {
    const payload = {
        username: username,
        coachName: coachName,
    };

    if (!username || !coachName) {
        console.error("Username or trainerName is missing.");
        return;
    }

    try {
        const response = await fetch(BUY_COACH_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.log("Error:", errorData.error);
            return;
        }

        const data = await response.json();
        console.log("Success:", data.message);
        Alert.alert("Success", data.message);
        return data;
    } catch (error) {
        console.error("Error fetching orders:", error);
    }
};

  return (
    <>
      <View style={styles.mainContainer}>
        <View style={styles.yellowContainer}>
          <TouchableOpacity onPress={() => router.back()}>
            <Arrow name="left" size={25} color="black" />
          </TouchableOpacity>
          <Hearto name="hearto" size={25} color="black" />
        </View>
        <View style={styles.container}>
          <View style={{ marginTop: 85 }}>
            {isLoading ? (
               <View style={styles.animationContainer}>
               <LottieView
               autoPlay
             
               style={{
                 width: 450,
                 height: 450,
               }}
               // Find more Lottie files at https://lottiefiles.com/featured
               source={require('../../constants/Lottie/CatAnimationv2.json')}
             />
               </View>
            ) : (
              <>
                <Text style={styles.trainerName}>
                  {finalUserData[0].username} trainer
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 25,
                  }}
                >
                  <Clock name="clockcircleo" size={25} color="blue" />
                  <Text style={{ marginLeft: 10 }}>
                    {finalUserData[0].duration} min
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 25,
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ fontSize: 46, fontWeight: "bold" }}>
                      ${finalUserData[0].duration}
                    </Text>
                  </View>
                  <Text
                    style={{ fontSize: 16, marginTop: 5, fontWeight: "light" }}
                  >
                    per month
                  </Text>
                  <Text
                    style={{
                      fontSize: 24,
                      marginTop: 25,
                      fontWeight: "light",
                      fontWeight: "bold",
                    }}
                  >
                    {finalUserData[0].specialization}
                  </Text>
                </View>
              
                <View style={{ marginTop: 10 }}>
                  <Text
                    style={{ marginTop: 10, fontWeight: 500, fontSize: 14 }}
                  >
                    Description:
                    {finalUserData[0].description}
                  </Text>

                  <Text
                    style={{ marginTop: 35, fontWeight: 400, fontSize: 14 }}
                  >
                    Training per month: {finalUserData[0].day}
                  </Text>
                </View>
              </>
            )}
          </View>
        </View>
       
        <Button style={styles.button} onPress={() => handlerOrder()}>
          <Text>Buy a Coach </Text>
        </Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "yellow",
  },

  button: {
    position: "absolute",
    bottom: 10,
    width: "90%",
    height: 55,
    borderRadius: 40,
    alignSelf: "center",
    backgroundColor: "#8C36C7",
  },
  trainerName: {
    textAlign: "center",
    fontWeight: "500",
    fontSize: 32,
  },
  description: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 16,
    fontStyle: "italic",
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    position: "absolute",
    top: -160,
    height: 150,
    width: 280,
    resizeMode: "cover",
    marginBottom: 50,
    left: 40,
    borderRadius: 35,
  },
  yellowContainer: {
    height: "25%", // Visina žutog kontejnera - 20% visine ekrana
    backgroundColor: "yellow",
    flexDirection: "row", // Opcionalno, ako želite da strelice i srce budu u istom redoslijedu
    justifyContent: "space-between", // Opcionalno, ako želite da strelice i srce budu sa obje strane
    alignItems: "center", // Opcionalno, ako želite da strelice i srce budu vertikalno centrirani
    paddingHorizontal: 20, // Opcionalno, dodavanje unutrašnjeg prostora sa obje strane
  },
  container: {
    flex: 1, // Ostatak ekrana, nakon žutog kontejnera
    backgroundColor: "lightgrey",
    borderTopLeftRadius: 45, // Zaobljeni gornji lijevi kut
    borderTopRightRadius: 45, // Zaobljeni gornji desni kut
    paddingHorizontal: 20, // Opcionalno, dodavanje unutrašnjeg prostora sa obje strane
  },
  specialization: {
    textAlign: "center",
    fontWeight: "500",
    marginTop: 10,
    fontSize: 20,
  },
  animationContainer: {
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

export default Coach;
