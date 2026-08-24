/** @format */
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { color } from "../../utils/colors";
import { HistoryScreen } from "../../features/history/History.feature";
import { InternalNavigator } from "./internalNavigator.component";
import ScheduleNavigator from "./scheduleNavigator.component";
import { FontAwesome5 } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const TAB_ICONS = {
  Home: "home",
  Schedule: "business-time",
  History: "history",
};

const renderTabBarIcon = (routeName) => {
  const iconName = TAB_ICONS[routeName];
  const TabBarIcon = ({ color }) => (
    <FontAwesome5 name={iconName} size={24} color={color} />
  );
  TabBarIcon.displayName = `TabBarIcon_${routeName}`;
  return TabBarIcon;
};

export const VoiceBottomNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: renderTabBarIcon(route.name),
        tabBarActiveTintColor: color.primary,
        tabBarInactiveTintColor: color.black,
      })}>
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{ headerShown: false, tabBarLabel: "History" }}
      />
      <Tab.Screen
        name="Home"
        component={InternalNavigator}
        options={{ headerShown: false, tabBarLabel: "Home" }}
      />
      <Tab.Screen
        name="Schedule"
        component={ScheduleNavigator}
        options={{ headerShown: false, tabBarLabel: "Schedule" }}
      />
    </Tab.Navigator>
  );
};
