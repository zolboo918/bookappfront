import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PRIMARY_COLOR, PRIMARY_FONT } from "../../constants";

const MyNoteButton = (props) => {
  return (
    <TouchableOpacity style={css.container} onPress={props.onPress}>
      <View style={css.outer}>
        <Text style={css.title}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MyNoteButton;

const css = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  outer: {
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: PRIMARY_COLOR,
    width: "70%",
  },
  title: {
    color: "white",
    fontFamily: PRIMARY_FONT,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 10,
  },
});
