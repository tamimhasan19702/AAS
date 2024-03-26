/** @format */

import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ScheduleListView from "../../features/schedule/ScheduleListView";
import { ScheduleScreen } from "../../features/schedule/Schedule.feature";

const Stack = createNativeStackNavigator();

const ScheduleNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Schedule ListView" component={ScheduleListView} />
      <Stack.Screen name="Schedule Screen" component={ScheduleScreen} />
    </Stack.Navigator>
  );
};

export default ScheduleNavigator;
