import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { PRIMARY_COLOR, PRIMARY_FONT } from "../../constants";

const TopBar = (props) => {
  const {
    leftIconName,
    middleText,
    rightIconName,
    rightIconEvent,
    leftIconEvent,
  } = props;
  return (
    <SafeAreaView style={css.container}>
      <TouchableOpacity onPress={() => leftIconEvent()}>
        <Ionicons name={leftIconName} size={24} color={PRIMARY_COLOR} />
      </TouchableOpacity>
      <Text style={css.title}>{middleText}</Text>
      <TouchableOpacity onPress={() => rightIconEvent()}>
        <Ionicons name={rightIconName} size={24} color={PRIMARY_COLOR} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default TopBar;

const css = StyleSheet.create({
  container: {
    height: "10%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontFamily: PRIMARY_FONT,
    color: PRIMARY_COLOR,
  },
});
