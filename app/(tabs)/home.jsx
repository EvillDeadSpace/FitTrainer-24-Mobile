import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import TopCardScroll from "../(exercies)/TopCardScroll";
import ProgramCardScroll from "../../components/HomepageComponents/ProgramCardScroll";
import CoachCardScroll from "../../components/HomepageComponents/Coach/CoachCardScroll";

import { useRoute } from "@react-navigation/native";

import { useContext } from "react";
import { UserContext } from "../../components/Context/Context";

import { useNavigation } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";


import LottieView from 'lottie-react-native';


const home = () => {



 // Alert.alert(
   // 'Dobrodošli!',
  //  'Vako ovo je rana verzija aplikacija i znam bas sam spor, ako imate bilo kakve ideje sta mogu unaprijediti slobodno mi javite  `💕💕. Ne bih vise da vas smaram iztrazite moje "remek djelo"... Poyyy od tubeeee ❤️😘  ',
   // [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
  //);
  return (
    <SafeAreaView>
        <ScrollView >
          <TopCardScroll />
          <ProgramCardScroll />
          <CoachCardScroll />
        </ScrollView>
    </SafeAreaView>
  );
};

export default home;
