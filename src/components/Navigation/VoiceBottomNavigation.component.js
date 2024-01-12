/** @format */

import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { color } from "../../utils/colors";
import { StartPage } from "../../features/StartPage/StartPage.feature";
import { ScheduleScreen } from "../../features/schedule/Schedule.feature";
import { HistoryScreen } from "../../features/history/History.feature";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export const VoiceBottomNavigation = () => {
  const tabBarIconColor = color.black;
  const activeTabBarIconColor = color.primary;
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "restaurents";
          } else if (route.name === "Schedule") {
            iconName = "settings";
          } else if (route.name === "History") {
            iconName = "map-marked-alt";
          }

          return <FontAwesome5 name={iconName} size={24} color={color} />;
        },
        tabBarActiveTintColor: activeTabBarIconColor,
        tabBarInactiveTintColor: tabBarIconColor,
      })}>
      <Tab.Screen
        name="Home"
        component={StartPage}
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="md-restaurant-sharp" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Schedule"
        component={ScheduleScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Schedule",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="map-marked-alt" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          headerShown: false,
          tabBarLabel: "History",
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
