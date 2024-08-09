import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  DrawerLayoutAndroid,
  StyleSheet,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

//components
import TopCardScroll from "../(exercies)/TopCardScroll";
import ProgramCardScroll from "../../components/HomepageComponents/ProgramCardScroll";
import CoachCardScroll from "../../components/HomepageComponents/Coach/CoachCardScroll";

//context
import { useContext } from "react";
import { UserContext } from "../../components/Context/Context";

//navigation
import { useNavigation, Link } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

//tamagui
import { Avatar, Button } from "tamagui";

//icons
import Icon from "react-native-vector-icons/AntDesign";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Feather from "react-native-vector-icons/Feather";


//env
import { FIND_COACH_USERNAME } from "@env";

const home = () => {
  const drawer = useRef(null);

  const { username } = useContext(UserContext);

  const [IsCoach, setIsCoach] = useState(false);

  const [drawerPosition, setDrawerPosition] = useState("left");
  const changeDrawerPosition = () => {
    if (drawerPosition === "left") {
      setDrawerPosition("right");
    } else {
      setDrawerPosition("left");
    }
  };

  useEffect(() => {
    // Pozivamo funkciju za proveru da li je korisnik trener
    checkIfCoach();
  }, []);

  const checkIfCoach = async () => {
    try {
      // Pozivamo API endpoint za dobijanje podataka o trenerima
      const response = await fetch(
        FIND_COACH_USERNAME
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

  const navigationView = () => (
    <View style={[styles.container, styles.navigationContainer]}>
      <View style={styles.avatarContainer}>
        <Avatar circular size="$10" onPress={() => drawer.current.openDrawer()}>
          <Avatar.Image
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              marginBottom: 10,
              marginLeft: "auto",
            }} // Adjust size as needed
            accessibilityLabel="Cam"
            src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
          />
          <Avatar.Fallback backgroundColor="$blue10" />
        </Avatar>
        <Text style={styles.avatarName}>{username}</Text>
      </View>
      <View style={styles.menuItem}>
        <View style={styles.menuItemContent}>
          <Link href="profile">
            <Icon name="user" size={20} style={styles.icon} />
            <Text style={styles.text}>View profile</Text>
          </Link>
          <Link href="Settings">
            <MaterialCommunityIcons
              name="progress-check"
              size={24}
              color="black"
              style={styles.icon}
            />
            <Text style={styles.text}>Progress</Text>
          </Link>

          {IsCoach ? (
            <>
              <Link href="CoachOrder">
                <Feather size={20} style={styles.icon} name="check-square" />
                <Text style={styles.text}>Your Customers</Text>
              </Link>
            </>
          ) : (
            <>
              <Link href="Orders">
                <Feather size={20} style={styles.icon} name="check-square" />
                <Text style={styles.text}>Purchased Coaches</Text>
              </Link>
            </>
          )}
        </View>
      </View>
    </View>
  );

  // Alert.alert(
  // 'Dobrodošli!',
  //  'Vako ovo je rana verzija aplikacija i znam bas sam spor, ako imate bilo kakve ideje sta mogu unaprijediti slobodno mi javite  `💕💕. Ne bih vise da vas smaram iztrazite moje "remek djelo"... Poyyy od tubeeee ❤️😘  ',
  // [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
  //);

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition={drawerPosition}
      renderNavigationView={navigationView}
    >
      <SafeAreaView>
        <ScrollView>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "90%",
              marginLeft: "5%",
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 20, marginBottom: 10 }}>Hello,</Text>
              <Text style={{ fontSize: 20 }}>{username}</Text>
            </View>

            <Avatar
              circular
              size="$5"
              onPress={() => drawer.current.openDrawer()}
            >
              <Avatar.Image
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  marginLeft: "auto",
                }} // Adjust size as needed
                accessibilityLabel="Cam"
                src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
              />
              <Avatar.Fallback backgroundColor="$blue10" />
            </Avatar>
          </View>
          <TopCardScroll />
          <ProgramCardScroll />
          <CoachCardScroll />
        </ScrollView>
      </SafeAreaView>

      <Button title="Open drawer" onPress={() => drawer.current.openDrawer()} />
    </DrawerLayoutAndroid>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  navigationContainer: {
    backgroundColor: "#744B8F",
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: "center",
  },
  text: {
    color: "#FFFFFF",
    margin: 24,
    fontSize: 16,
    fontWeight: "medium",
  },
  horizontalLine: {
    borderBottomColor: "grey",
    borderBottomWidth: 0.3,
    marginVertical: 10,
  },
  modalContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between", // Change to 'space-between' to evenly distribute items
    alignItems: "center", // Align items vertically in the center
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  menu: {
    width: 330,
    height: "100%",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  avatarContainer: {
    flexDirection: "column",
    alignItems: "center",

    backgroundColor: "#744B8F",
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  avatarName: {
    marginTop: 25,
    color: "white",
    fontSize: 26,
  },
  menuItem: {
    width: "100%",
    marginVertical: 20,
  },
  icon: {
    margin: 15, // Adjust as needed
    color: "#FFC700",
  },
  menuItemContent: {
    alignItems: "center",
    flexDirection: "column",
  },
});

export default home;
