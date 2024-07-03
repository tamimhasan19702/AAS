/** @format */

import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { color } from "../utils/colors";

const HistoryBoxComponent = ({ history }) => {
  const formatTimestamp = (timestamp) => {
    // Convert the timestamp to a Date object
    const date = new Date(timestamp);

    // Get the day, month, year, hours, and minutes
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so add 1
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    // Return the formatted date and time
    return `${day}/${month}/${year} - ${hours}:${minutes}`;
  };
  return (
    <View
      style={{
        display: "flex",
        justifyContent: "start",
        alignItems: "start",
        flexDirection: "column",
        gap: 5,
      }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}>
        <Text style={{ color: color.white, fontSize: 16 }}>
          {history?.text || "Recorded Voice"}
        </Text>
        <Text style={{ color: color.white, fontSize: 30 }}>⏲</Text>
      </View>
      <View>
        <Text style={{ color: color.white, fontSize: 12 }}>
          {(history?.Time &&
            "Recorded Voice : " + formatTimestamp(history?.Time)) ||
            "Ai Voice : " + history?.updateTime}
        </Text>
      </View>
    </View>
  );
};

export default HistoryBoxComponent;

const styles = StyleSheet.create({});
