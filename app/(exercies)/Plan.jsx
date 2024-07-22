import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useContext } from 'react';


import Split from '../../constants/Exercises/Splits';

import Arrow from "react-native-vector-icons/AntDesign";
import Hearto from 'react-native-vector-icons/AntDesign';   //empty heart
import Heart from 'react-native-vector-icons/AntDesign';  //full heart
import Clock from 'react-native-vector-icons/AntDesign';


import { AlertDialog, AlertDialogAction, Button } from 'tamagui';

import LottieView from 'lottie-react-native';

import { router, useLocalSearchParams } from 'expo-router';

export default function Plan() {

    const exercise = useLocalSearchParams();
    const itemName = exercise.item;
    console.log(itemName);

    const item = Split.find((item) => item.name === itemName);
    console.log(item)

 {
        console.log(`Kupujem vježbu ${item.name}`);
        Alert.alert(
            'Kupovina',
            `Da li ste sigurni da želite da kupite vježbu ${item.name}?`,
            [
                { text: 'Ne', onPress: () => console.log('Ne') },
                { text: 'Da', onPress: () => Alert.alert('Čestitamo', `Uspješno ste kupili vježbu, uskoro na mejl ce Vam doci potpunni plan i program vjezbi ${item.name}`) }
            ]
        )

    }
    


  return (
    <>
    <View style={styles.mainContainer}>
        <View style={styles.yellowContainer}>
            <TouchableOpacity onPress={() => router.back()} >
                <Arrow name="left" size={25} color="black" />
            </TouchableOpacity>
            <Hearto name="hearto" size={25} color="black" />
        </View>
        <View style={styles.container}>
            <Image source={item.photo} style={styles.image} />
            <View style={{ marginTop: 85 }}>
                <Text style={styles.exerciseName}>{item.name}</Text>
                <View style={styles.timeContainer}>
                    <Clock name="clockcircleo" size={20} color="blue" />
                    <Text style={{marginLeft:10}}>{item.time}</Text>
                </View>
                <Text style={{textAlign:"center", fontWeight:"bold", fontSize: 22, marginTop:15, marginBottom:15}}>{item.price}</Text>
                <Text style={{textAlign:"center", paddingHorizontal:20}}>{item.description}</Text>
            </View>
        </View>
        <Button
        style={styles.button}
                onPress={() => handleBuy()}><Text>Buy {item.name}</Text></Button>
    </View>
</>
  )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'yellow',
    },
    button: {
        position: 'absolute',
        bottom: 10,
        width: '90%',
        height: 55,
        borderRadius: 40,
        alignSelf: 'center',
        backgroundColor: "#8C36C7"

    },
    exerciseName: {
        textAlign: 'center',
        fontWeight: '400',
        fontSize: 30,
    },
    description: {
        marginTop: 10,
    },
    timeContainer: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    image: {
        position: 'absolute',
        top: -80,
        height: 150,
        width: 280,
        resizeMode: 'cover',
        marginBottom: 50,
        left: 60,
        borderRadius: 35,


    },
    yellowContainer: {
        height: '25%', // Visina žutog kontejnera - 20% visine ekrana
        backgroundColor: 'yellow',
        flexDirection: 'row', // Opcionalno, ako želite da strelice i srce budu u istom redoslijedu
        justifyContent: 'space-between', // Opcionalno, ako želite da strelice i srce budu sa obje strane
        alignItems: 'center', // Opcionalno, ako želite da strelice i srce budu vertikalno centrirani
        paddingHorizontal: 20, // Opcionalno, dodavanje unutrašnjeg prostora sa obje strane
    },
    container: {
        flex: 1, // Ostatak ekrana, nakon žutog kontejnera
        backgroundColor: 'lightgrey',
        borderTopLeftRadius: 45, // Zaobljeni gornji lijevi kut
        borderTopRightRadius: 45, // Zaobljeni gornji desni kut
        paddingHorizontal: 20, // Opcionalno, dodavanje unutrašnjeg prostora sa obje strane
    },
    animationContainer: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      },
});