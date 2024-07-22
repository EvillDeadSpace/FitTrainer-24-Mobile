import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View, Text } from 'react-native'

import React from 'react'

import { Slot, Stack } from 'expo-router'



const AuthLayout = () => {
  return (
    <GestureHandlerRootView>
   <Stack screenOptions={{
 headerShown:false
   }}>
    <Stack.Screen name='Exercises' options={{
      headerShown:false}} />
      
    <Stack.Screen name='ExercisesDetails' options={{
      presentation:'modal',
      headerShown:false}}  />

    <Stack.Screen name='ListCoach' options={{
     headerShown:false
      }}  />
    <Stack.Screen name='ListPlan' options={{
     headerShown:false
      }}  />
   </Stack>
   </GestureHandlerRootView>

  )
}

export default AuthLayout