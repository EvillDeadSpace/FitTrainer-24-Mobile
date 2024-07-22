import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "tamagui";

import * as images from "../../constants/photo";
import Icon from "react-native-vector-icons/FontAwesome";

import * as ImagePicker from "expo-image-picker";

import { router } from "expo-router";

import LottieView from "lottie-react-native";
import { Picker } from "@react-native-picker/picker";

const SignUp = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [email, setEmail] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedRole, setSelectedRole] = useState("user");

  const handleSignUp = async () => {
    try {
      console.log(selectedRole);
      const response = await fetch(
        "https://fittrainer-24host.netlify.app/.netlify/functions/server/api/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            username,
            password,
            repeatPassword,
            image: selectedImage,
            role: selectedRole,
          }),
        }
      );

      const result = await response.json();
      console.log("Odgovor servera:", result);

      if (result.success) {
        router.push({ pathname: "/sign-in" });
        console.log("Uspesno ste se registrovali:", result.message);
      } else {
        console.error("Neuspesna registracija:", result.message);
      }
    } catch (error) {
      console.error("Došlo je do neočekivane greške:", error);
    }
  };

  async function requestPermissions() {
    try {
      const { status: cameraRollStatus } =
        await MediaLibrary.requestPermissionsAsync();
      const { status: cameraStatus } =
        await ImagePicker.requestCameraPermissionsAsync();

      if (cameraRollStatus !== "granted" || cameraStatus !== "granted") {
        Alert.alert(
          "Dozvole nisu odobrene",
          "Molimo odobrite pristup medijskoj biblioteci i kameri."
        );
      }
    } catch (error) {
      console.error("Greška prilikom traženja dozvola:", error);
      Alert.alert("Greška", "Došlo je do greške prilikom traženja dozvola.");
    }
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#FFFFFF", flex: 1 }}>
      <View style={styles.animationContainer}>
        <LottieView
          autoPlay
          style={{
            width: 350,
            height: 350,
          }}
          // Find more Lottie files at https://lottiefiles.com/featured
          source={require("../../constants/Lottie/CatAnimationv2.json")}
        />
      </View>
      <View style={{ marginTop: 100 }}>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
          style={{
            height: 55,
            borderColor: "gray",
            borderWidth: 1,
            marginTop: 20,
            marginLeft: 20,
            marginRight: 20,
            borderRadius: 40,
            fontSize: 14,
            paddingHorizontal: 30,
          }}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={{
            height: 55,
            borderColor: "gray",
            borderWidth: 1,
            marginTop: 20,
            marginLeft: 20,
            marginRight: 20,
            borderRadius: 40,
            fontSize: 14,
            paddingHorizontal: 30,
          }}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          style={{
            height: 55,
            borderColor: "gray",
            borderWidth: 1,
            marginTop: 20,
            marginLeft: 20,
            marginRight: 20,
            borderRadius: 40,
            fontSize: 14,
            paddingHorizontal: 30,
          }}
        />
        <TextInput
          placeholder="Repeat Password"
          value={repeatPassword}
          onChangeText={(text) => setRepeatPassword(text)}
          secureTextEntry={true}
          style={{
            height: 55,
            borderColor: "gray",
            borderWidth: 1,
            marginTop: 20,
            marginLeft: 20,
            marginRight: 20,
            borderRadius: 40,
            fontSize: 14,
            paddingHorizontal: 30,
          }}
        />
        <View style={{ margin: 20 }}></View>
      </View>
      <Picker
        selectedValue={selectedRole}
        onValueChange={(itemValue, itemIndex) => setSelectedRole(itemValue)}
      >
        <Picker.Item label="User" value="user" />
        <Picker.Item label="Coach" value="coach" />
      </Picker>
      <View style={styles.container}>
        <View style={styles.imageTextContainer}>
          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={pickImage}>
              {selectedImage ? (
                <Image source={{ uri: selectedImage }} style={styles.image} />
              ) : (
                <Icon name="user" size={30} color="#9037CD" />
              )}
            </TouchableOpacity>
          </View>
          <Text style={styles.text}>Add Photo</Text>
        </View>
      </View>

      <Button
        onPress={handleSignUp}
        style={{
          backgroundColor: "#9037CD",
          width: "90%",
          height: 55,
          borderRadius: 22,
          marginTop: 40,
          alignSelf: "center",
        }}
      >
        Sign Up
      </Button>

      <TouchableOpacity
        onPress={() => router.push("/sign-in")}
        style={{ marginTop: 80, alignSelf: "center" }}
      >
        <View>
          <Text style={{ marginBottom: 30 }}>
            Already have an account?{" "}
            <Text style={{ fontWeight: "bold", color: "blue" }}>Login</Text>
          </Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  imageTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  text: {
    fontSize: 20,
    color: "#9037CD",
    marginLeft: 20, // Added marginLeft for spacing between image and text
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  animationContainer: {
    flex: 1,
    marginTop: 45,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SignUp;
