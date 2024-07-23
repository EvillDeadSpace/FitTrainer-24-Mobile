import {Text, View, StyleSheet, Image, TouchableOpacity, TextInput,ScrollView } from "react-native";
import React, {useState} from "react";
import { fetchData, exerciseOptions } from '../../constants/API/GetData';
import { Link, router } from "expo-router";
import exercises from "../../constants/Exercises/Exercies";

import { useRouter, useLocalSearchParams } from 'expo-router';;
import { useNavigation } from 'expo-router';


import { useContext } from 'react';
import { UserContext } from '../../components/Context/Context';


import { AntDesign } from '@expo/vector-icons';


import { Avatar, XStack } from 'tamagui'
import { SafeAreaView } from "react-native-safe-area-context";



const TopCardScroll = () => {

    const [searchText, setSearchText] = useState('');
  
    const [forExercises, setForExercises] = useState([]);
    const [test, setTest] = useState('');

    const navigation = useNavigation();

    const router = useRouter();
    

    const onClick = async (exerciseName)  => {
        try {
            if (exerciseName === 'biceps' || exerciseName === 'triceps' || exerciseName === 'quads' || exerciseName === 'abs' || exerciseName === 'glutes') {
                console.log('Tražim vježbu:', exerciseName);
                // Fetch podataka s API-ja prema imenu vježbe
                const url = `https://exercisedb.p.rapidapi.com/exercises/target/${exerciseName}`;
                const data = await fetchData(url, exerciseOptions);
            
                
                if (data && data.length > 0) {
                    // Prikupljanje svih informacija o vježbama
                    const allExercises = data.map(exercise => ({
                        name: exercise.name,
                        gifUrl: exercise.gifUrl,
                        equipment: exercise.equipment,
                        instructions: exercise.instructions,
                        mainName: exerciseName,
                    }));
                   
                    router.push({pathname:'/Exercises', params: allExercises })
                    setForExercises(allExercises);
                } else {
                    console.warn('Nema podataka o vježbi.');

                }

            } else {
                console.log('Tražim vježbu:', exerciseName);
                // Fetch podataka s API-ja prema imenu vježbe
                const url = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${exerciseName}`;
                const data = await fetchData(url, exerciseOptions);
               

                if (data && data.length > 0) {
                    // Prikupljanje svih informacija o vježbama
                    const allExercises = data.map(exercise => ({
                        name: exercise.name,
                        gifUrl: exercise.gifUrl,
                        equipment: exercise.equipment,
                        instructions: exercise.instructions,
                        mainName: exerciseName,
                    }));
                    // Prikazivanje informacija na ekranu ExercisePanel
                    router.push({pathname: '/Exercises', params: exerciseName})
                    setForExercises(allExercises);
                
                } else {
                    console.warn('Nema podataka o vježbi.');
                }
            }
        } catch (error) {
            console.error('Greška prilikom dohvaćanja podataka:', error);
        }
    };


    const { username } = useContext(UserContext);

  return (
   <>
    <View style={styles.containerScroll}>
        <AntDesign name="search1" size={24} color="black" style={styles.searchIcon} />
        <TextInput
            placeholder="Search the exercise"
            style={styles.input}
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
        />
   
    </View>
    <ScrollView horizontal={true} style={styles.container}>
        
        {exercises
            .filter((exercise) =>
                exercise.name.toLowerCase().includes(searchText.toLowerCase())
            )
            .map((exercise, index) => (
                <TouchableOpacity key={index} onPress={()=>router.push({pathname:'/Exercises', params: {text: exercise.name }})}>
                  
                    <View key={index} style={[styles.card, styles.cardElevated]}>
                        <View style={styles.imageContainer}>
                            <Image
                                source={exercise.photo}
                                style={styles.roundImage}
                            />
                        </View>
                        <Text style={{ color: "black" }}>{exercise.name}</Text>
                    </View>
                   
                </TouchableOpacity>
            ))}
    </ScrollView>
    </>
  )
}


const styles = StyleSheet.create({
    card: {
        width:100,
        height:100,
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        margin:8,
    },
    searchIcon: {
        marginRight: 15,
    },
    input: {
        flex: 1,
        height: 40,
    },
    containerScroll: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E5E5E5',
        borderRadius: 30,
        paddingVertical: 8,
        paddingHorizontal: 16,
        margin: 18,
        marginTop:50,
    },
    cardElevated: {
        backgroundColor: '#fff',
        elevation: 4,
        shadowOffset: { width: 5, height: 5 },
        shadowColor: "#333",
    },
    container:{
        flex: 1,
        flexDirection: 'row',
        padding: 8,
        marginTop:-8,
        marginRight:15,
        marginLeft:15,
    },
    imageContainer: {
        marginTop:5,
        alignItems: 'center',
    },
    roundImage: {
        width: 70,
        height: 70,
        borderRadius: 40,
        borderColor: 'black',
        borderWidth: 2,
    },
});


export default TopCardScroll