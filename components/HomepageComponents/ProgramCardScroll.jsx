import { Text, View, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native'
import React from 'react'

import split  from '../../constants/Exercises/Splits'
import Arrow from 'react-native-vector-icons/Entypo'

import { Link, router } from 'expo-router'


import { FadeIn, BounceIn } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';

const PlanProgramCardScroll = () => {
    return (
        <>
        <View style={styles.container} >
        <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginRight: 20,
          marginBottom: 20,
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: "bold", marginLeft: 10 }}>
          Find a Plan and Program
        </Text>
        <Link
          href="/ListPlan"
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Arrow name="chevron-right" size={20} color="black" />
        </Link>
      </View>
      <Animated.ScrollView entering={FadeIn} horizontal={true} contentContainerStyle={styles.scrollViewContent}>
        {split.slice(0,3).map((item, index) => (
          <TouchableOpacity key={index} onPress={()=> router.push({ pathname: '/Plan', params: { item:item.name } })}>
            <View style={styles.card}>
              <Image source={item.photo} style={styles.image} />
            </View>
            <View style={styles.textContainer}>
              <View>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.price}>{item.price}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </Animated.ScrollView>
    </View>
   </>
)
}



const styles = StyleSheet.create({
    container: {
      
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
      marginBottom: 2,
      marginRight: 10,
    },
    scrollViewContent: {
      alignItems: 'center',
    },
  });



export default PlanProgramCardScroll