/** @format */

import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { color } from "../utils/colors";

const HistoryBoxComponent = ({ history }) => {
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

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
          {(history?.time &&
            "Recorded Voice : " + formatTimestamp(history?.time)) ||
            "Ai Voice : " + history?.updateTime}
        </Text>
      </View>
    </View>
  );
};

export default HistoryBoxComponent;

const styles = StyleSheet.create({});
