/** @format */

import { View, Text } from "react-native";
import React from "react";
import { color } from "../utils/colors";
import { formatTimestamp } from "../utils/date";

const HistoryBoxComponent = ({ history }) => {
  return (
    <View
      style={{
        display: "flex",
        justifyContent: "start",
        alignItems: "start",
        flexDirection: "column",
        gap: 5,
        elevation: 9,
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
