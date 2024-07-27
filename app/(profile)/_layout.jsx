import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'




const ProfileLayout = () => {
  return (
   
   <Stack options={{headerShown:false}}>
    <Stack.Screen name='CoachSettings' options={{headerShown:false}}/>
    <Stack.Screen name='Privacy' options={{headerShown:false}} />
    <Stack.Screen name='Settings' options={{headerShown:false}} />
    <Stack.Screen name='Orders' options={{headerShown:false}} />
   </Stack>
  
  )
}

export default ProfileLayout


