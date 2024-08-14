import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Pressable,
  StyleSheet,
} from "react-native";
import React, { useState, useReducer, useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchData, exerciseOptions } from "../../constants/API/GetData";
import {
  useRouter,
  useLocalSearchParams,
  router,
  usePathname,
  Link,
} from "expo-router";
import { Image } from "expo-image";
import { ScrollView } from "react-native-virtualized-view";
import exerciseImages from "../../constants/photo";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import ExercisesDetails from "./ExercisesDetails";

import LottieView from "lottie-react-native";
import Icon from "react-native-vector-icons/AntDesign";


const Exercises = (props) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);

  const [exercises, setExercises] = useState([]);
  const [tuba, setTuba] = useState([]);
  const exercise = useLocalSearchParams();
  const exerciseName = exercise.text;

  const EXERCISES_URL_TARGET = process.env.EXERCISES_URL_TARGET;
  const EXERCISES_URL_BODYPART = process.env.EXERCISES_URL_BODYPART;

  const handleExercisePress = async (exerciseName) => {
    try {
      if (
        exerciseName === "biceps" ||
        exerciseName === "triceps" ||
        exerciseName === "quads" ||
        exerciseName === "abs" ||
        exerciseName === "glutes"
      ) {
        console.log("Tražim vježbu:", exerciseName);
        // Fetch podataka s API-ja prema imenu vježbe
        const url = `${EXERCISES_URL_TARGET}${exerciseName}`;
        const data = await fetchData(url, exerciseOptions);
        console.log(data);

        if (data && data.length > 0) {
          // Prikupljanje svih informacija o vježbama
          const allExercises = data.map((exercise) => ({
            name: exercise.name,
            gifUrl: exercise.gifUrl,
            equipment: exercise.equipment,
            instructions: exercise.instructions,
            mainName: exerciseName,
          }));
          // Prikazivanje informacija na ekranu ExercisePanel
          setExercises(allExercises);
          setIsLoading(false);
        } else {
          console.warn("Nema podataka o vježbi.");
          setIsLoading(false);
        }
      } else {
        console.log("Tražim vježbu:", exerciseName);
        // Fetch podataka s API-ja prema imenu vježbe
        const url = `${EXERCISES_URL_BODYPART}${exerciseName}`;
        const data = await fetchData(url, exerciseOptions);
        console.log(data);

        if (data && data.length > 0) {
          // Prikupljanje svih informacija o vježbama
          const allExercises = data.map((exercise) => ({
            name: exercise.name,
            gifUrl: exercise.gifUrl,
            equipment: exercise.equipment,
            instructions: exercise.instructions,
            mainName: exerciseName,
          }));
          // Prikazivanje informacija na ekranu ExercisePanel
          setExercises(allExercises);
          setIsLoading(false);
        } else {
          console.warn("Nema podataka o vježbi.");
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.error("Greška prilikom dohvaćanja podataka:", error);
      isLoading(false);
    }
  };

  useEffect(() => {
    handleExercisePress(exerciseName);
  }, []);

  console.log(exercises);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (exerciseName) => {
    setExpandedIndex((prevIndex) =>
      prevIndex === exerciseName ? null : exerciseName
    );
  };

  const buttomSheetModalRef = useRef(null);

  const handlerOnPress = (exercises) => {
    setTuba(exercises);
    buttomSheetModalRef.current?.present();
  };
  const snapPoints = ["50%"];

  return (
    <BottomSheetModalProvider>
      <SafeAreaView>
        <ScrollView>
          <TouchableOpacity onPress={() => router.back()}>
            <View style={{ margin: 20 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Icon name="left" size={25} color="black" />
                <Text style={styles.text}>Back</Text>
              </View>
            </View>
          </TouchableOpacity>
          <BottomSheetModal
            ref={buttomSheetModalRef}
            index={0}
            snapPoints={snapPoints}
          >
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={styles.text}> {tuba.name}</Text>
              <Text>
                Equipment:
                {tuba.equipment}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "light",
                  marginTop: 10,
                  textAlign: "center",
                  color: "#333",
                }}
              >
                Instruction:
                {tuba.instructions}
              </Text>
              <Image
                source={{ uri: tuba.gifUrl }}
                style={{ width: 200, height: 200, resizeMode: "contain" }}
              />
            </View>
          </BottomSheetModal>
          {isLoading ? (
            <View style={styles.animationContainer}>
              <LottieView
                autoPlay
                style={{
                  width: 450,
                  height: 450,
                }}
                // Find more Lottie files at https://lottiefiles.com/featured
                source={require("../../constants/Lottie/CatAnimationv2.json")}
              />
              <Text>Loading...</Text>
            </View>
          ) : (
            <FlatList
              data={exercises}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 60, paddingTop: 20 }}
              columnWrapperStyle={{ justifyContent: "space-between" }}
              renderItem={({ item: exercise }) => (
                <TouchableOpacity
                  style={styles.container}
                  onLongPress={(exercises) => handlerOnPress(exercise)}
                >
                  <Image
                    source={{ uri: exercise.gifUrl }}
                    style={styles.image}
                    resizeMode="cover"
                  />

                  <Text style={styles.title}>{exercise.name}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
        </ScrollView>
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
};

const ExerciseCard = ({ exercise, item, router }) => {
  const handlerOnPress = () => {
    router.push({ pathname: "/ExercisesDetails", params: exercise });
  };

  return (
    <TouchableOpacity onPress={() => handlerOnPress()}>
      <View style={{ flexDirection: "row", paddingVertical: 2, marginTop: 2 }}>
        <Image
          source={{ uri: exercise.gifUrl }}
          style={styles.image}
          contentFit=""
        />

        <Text style={styles.title}>{exercise.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
    textAlign: "center",
  },

  header: {
    marginTop: 40,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginLeft: 20,
  },
  padded: {
    padding: 20,
  },
  container: {
    flex: 1,
    paddingVertical: 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 10,
    margin: 25,
    marginTop: 10,
    borderRadius: 15,
    borderWidth: 5,
    borderColor: "#fff",
  },
  title: {
    fontSize: 16, // Povećavamo veličinu fonta na 24 piksela za veći naslov
    fontWeight: "bold", // Debljina fonta je podebljana
    marginTop: 10, // Povećavamo razmak ispod naslova na 20 piksela
    textAlign: "center", // Centriramo tekst
    color: "#333", // Dodajemo boju tekstu, na primjer tamnosiva (#333)
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 25,
    marginBottom: 10,
    margin: 10,
  },
  equipment: {
    fontStyle: "italic",
    color: "#555",
  },
  animationContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});

export default Exercises;
