import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { Calendar, CalendarList, Agenda } from "react-native-calendars";

import Icon from 'react-native-vector-icons/AntDesign'
import { router } from "expo-router";
const Progress = () => {
  return (
    <SafeAreaView>
      <TouchableOpacity onPress={() => router.back( )}>
      <View style={{margin:20}}>
      <View style={{flexDirection:"row", alignItems:"center"}}>
        <Icon name="left" size={25} color="black" />
        <Text style={styles.text}>Back</Text>
      </View>
    </View>
          </TouchableOpacity>
      <Calendar
        style={{
          marginTop: 25,
          margin: 10,
          borderWidth: 1,
          borderColor: "gray",
          height: 350,
        }}
        onDayPress={(day) => {
          console.log("selected day", day);
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  paddingContainer: {
    padding: 20,
  },
  container: {
    flex: 1,
  },
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
    marginLeft: 20,
    marginBottom: 20,
    marginTop: 20,
    margin: 25,
  },
  scrollViewContent: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",

    // Changed flexDirection to column
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
    marginLeft: 20,
    marginTop: 20,
    margin: 25,
    //golder border
    borderWidth: 2,
    borderColor: "gold",
  },
});

export default Progress;
