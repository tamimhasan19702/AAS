/** @format */
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { color } from "../../utils/colors";
import { HistoryScreen } from "../../features/history/History.feature";
import { InternalNavigator } from "../../components/Navigation/internalNavigator.component";
import { FontAwesome5 } from "@expo/vector-icons";
import ScheduleNavigator from "./scheduleNavigator.component";

const Tab = createBottomTabNavigator();

export const VoiceBottomNavigation = () => {
  const tabBarIconColor = color.black;
  const activeTabBarIconColor = color.primary;

  const renderTabBarIcon = (routeName) => {
    let iconName;

    if (routeName === "Home") {
      iconName = "home";
    } else if (routeName === "Schedule") {
      iconName = "business-time";
    } else if (routeName === "History") {
      iconName = "history";
    }

    return ({ color }) => {
      return <FontAwesome5 name={iconName} size={24} color={color} />;
    };
  };

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: renderTabBarIcon(route.name),
        tabBarActiveTintColor: activeTabBarIconColor,
        tabBarInactiveTintColor: tabBarIconColor,
      })}>
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          headerShown: false,
          tabBarLabel: "History",
          tabBarIcon: renderTabBarIcon("History"),
        }}
      />

      <Tab.Screen
        name="Home"
        component={InternalNavigator}
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: renderTabBarIcon("Home"),
        }}
      />

      <Tab.Screen
        name="Schedule"
        component={ScheduleNavigator}
        options={{
          headerShown: false,
          tabBarLabel: "Schedule",
          tabBarIcon: renderTabBarIcon("Schedule"),
        }}
      />
    </Tab.Navigator>
  );
};
