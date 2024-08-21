import { View, Text } from "react-native";
import React, { useState } from "react";
import { Tabs, Redirect, Stack } from "expo-router";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { StatusBar } from "expo-status-bar";
import TabBar from "../../components/Navigation_Component/TabBar";
import { GestureHandlerRootView } from "react-native-gesture-handler";


const TabsLayout = () => {
  return (
    <>
      <GestureHandlerRootView>
        <Tabs tabBar={(props) => <TabBar {...props} />}>
          <StatusBar style="dark" />
          <Tabs.Screen
            name="home"
            options={{
              title: "home",
              headerShown: false,
            }}
          />
          <Tabs.Screen
            name="shop"
            options={{
              title: "Map",
              headerShown: false,
            }}
          />

          <Tabs.Screen
            name="map"
            options={{
              title: "Map",
              headerShown: false,
            }}
          />
           <Tabs.Screen
            name="chat"
            options={{
              title: "Profile",
              headerShown: false,
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: "Profile",
              headerShown: false,
            }}
          />
         
        </Tabs>
      </GestureHandlerRootView>
    </>
  );
};

export default TabsLayout;
