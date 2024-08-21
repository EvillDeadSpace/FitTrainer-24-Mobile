import { View, Text, TouchableOpacity, StyleSheet  } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import planPhoto from '../../constants/photo/planPhoto.png'

import { Image, ScrollView } from 'tamagui'

import { Link
 } from 'expo-router'
import { router } from 'expo-router'


const onPressShop = (name) => {
  router.push({ pathname: `/${name}` });
  
}


const shop = () => {
  return (
<>

  <SafeAreaView style={styles.container}>
    <ScrollView
    
    >
      <TouchableOpacity style={{marginTop:45}} onPress={() => onPressShop("ListPlan")}>
        <Image
          source={planPhoto}
          style={styles.image}
        />
      </TouchableOpacity>
      <Text style={styles.text}>Buy a Plan and Program</Text>

      <TouchableOpacity onPress={() => onPressShop("ListCoach")}>
        <Image
          source={{ uri: 'https://picsum.photos/200/300' }}
          style={styles.image}
        />
      </TouchableOpacity>
      <Text style={styles.text}>Buy a Coach</Text>
      <Text style={{textAlign:"center",  fontWeight:"bold" , fontSize:24 }}>Stay tuned to get more 🫡🥹 </Text>
      </ScrollView>
    </SafeAreaView>
      </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    marginTop: 20, 
    justifyContent: 'center', // Vertikalno centriranje
    alignItems: 'center', // Horizontalno centriranje
  },
  image: {
    width: '80%', // Slika zauzima 80% širine ekrana
    height: undefined, // Omogućava automatsko podešavanje visine
    aspectRatio: 4 / 3, // Omjer slike
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10, // Dodaj margina ispod slike
  },
  text: {
    marginTop: 10,
    marginBottom: 20, // Dodaj margina ispod teksta
    textAlign: 'center', // Tekst centriran ispod slike
   
  },
});


export default shop