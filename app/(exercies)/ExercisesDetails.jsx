import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useRef, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import photo from "../../constants/photo";
import { ScrollView } from "react-native-virtualized-view";

export default function ExercisesDetails({ exercises }) {
  const exercise = useLocalSearchParams();

  const exerciseName = exercise;
  console.log(exerciseName);

  console.log("KURCINAAAAAAA");

  const buttomSheetModalRef = useRef(null);

  const handlerOnPress = () => {
    buttomSheetModalRef.current?.present();
  };

  const snapPoints = ["20%"];

  console.log(exerciseName);
  return (
    <>
      <Text>test</Text>
      <View style={{ flex: 1 }}>
        <View
          style={{
            marginVertical: 10,
            padding: 10,
            backgroundColor: "#f0f0f0",
          }}
        >
          <Image
            source={{ uri: exercise.gifUrl }}
            style={{ width: 200, height: 200 }}
          />
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>
            {exercise.name}
          </Text>
          <Text>{exercise.equipment}</Text>

          <Text style={{ marginTop: 5, fontSize: 16 }}>Instructions:</Text>
          <Text>{exercise.instructions}</Text>
        </View>
      </View>
    </>
  );
}
