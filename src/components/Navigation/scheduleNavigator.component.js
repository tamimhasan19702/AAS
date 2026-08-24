/** @format */

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ScheduleListView from "../../features/schedule/ScheduleListView";
import { ScheduleScreen } from "../../features/schedule/Schedule.feature";
import { ROUTES } from "../../constants/routes";

const Stack = createNativeStackNavigator();

const ScheduleNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.SCHEDULE_LIST_VIEW}
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name={ROUTES.SCHEDULE_LIST_VIEW} component={ScheduleListView} />
      <Stack.Screen name={ROUTES.SCHEDULE_SCREEN} component={ScheduleScreen} />
    </Stack.Navigator>
  );
};

export default ScheduleNavigator;
