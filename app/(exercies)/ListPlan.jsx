import { View, Text, ScrollView, StyleSheet,TouchableOpacity, Image    } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/AntDesign'

import split  from '../../constants/Exercises/Splits'

import { router } from 'expo-router'


import { FadeIn, BounceIn, BounceInRight } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';

const ListPlan = () => {
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
          <Animated.ScrollView   contentContainerStyle={styles.scrollViewContent}>
        {split.map((item, index) => (
          <TouchableOpacity key={index} onPress={()=> router.push({ pathname: '/Plan', params: { item:item.name } })}>
            
            <View>
            <Animated.View
              entering={BounceInRight.delay(index * 100)} // Podesi vrednost delay-a prema potrebama
              style={styles.card}
            >
              <Image source={item.photo} style={styles.image} />
            </Animated.View>
            <Animated.View entering={BounceInRight.delay(index * 100)} style={styles.textContainer}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.price}>{item.price}</Text>
            </Animated.View>
          </View>
          </TouchableOpacity>
        ))}
      </Animated.ScrollView>
    </SafeAreaView  >
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,

  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {},
  textContainer: {
 // Added margin to create space between image and text
  },
  title: {
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    color: 'black',
    fontSize: 14,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  card: {
    width: 350,
    height: 200, // Adjusted height to accommodate additional content
    backgroundColor: '#333',
    borderRadius: 20,
    justifyContent: 'center',
    overflow: 'hidden', // Ensures the image doesn't overflow the card
   
    marginRight: 10,
    marginTop:20,
  },
  scrollViewContent: {
    alignItems: 'center',
  },
});


export default ListPlan