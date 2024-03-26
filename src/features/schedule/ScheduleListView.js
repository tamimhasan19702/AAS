/** @format */

import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeView } from "../../utils/safeAreaView";
import { LogoBar } from "../../components/logoBar.component";

import styled from "styled-components";

const ScheduleListView = ({ navigation }) => {
  return (
    <SafeView>
      <LogoBar link={navigation} icon={"arrow-left"} />
      <Text onPress={() => navigation.navigate("Schedule Screen")}>
        ScheduleListView
      </Text>
    </SafeView>
  );
};

export default ScheduleListView;

const styles = StyleSheet.create({});
