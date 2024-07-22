
import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Slot, Stack } from 'expo-router'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { UserProvider } from '../components/Context/UserProvider';






const Layout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <UserProvider>
    <Stack>
        <Stack.Screen name='index' options={{headerShown:false}} />
        <Stack.Screen name='(auth)' options={{headerShown:false}} />
        <Stack.Screen name='(tabs)' options={{headerShown:false}} />
        <Stack.Screen name='(profile)' options={{headerShown:false}} />
        <Stack.Screen name='(exercies)'  options={{
          presentation:'modal',
          headerShown:false}} />
    </Stack>
    </UserProvider>

    </GestureHandlerRootView>
  )
}

export default Layout

const styles = StyleSheet.create({})