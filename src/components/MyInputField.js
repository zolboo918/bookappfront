import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { PRIMARY_FONT } from "../../constants";

const MyInputField = (props) => {
  const { style, type } = props;
  return (
    <View>
      <TextInput
        {...props}
        style={[css.input, style]}
        secureTextEntry={type == "password"}
        keyboardAppearance="default"
        onChangeText={props.onChangeText}
      />
      {props.error && <Text style={css.error}>{props.errorText}</Text>}
    </View>
  );
};

export default MyInputField;

const css = StyleSheet.create({
  input: {
    fontSize: 16,
    fontFamily: PRIMARY_FONT,
    color: "#887F7F",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomColor: "#887F7F",
    width: "90%",
  },
  error: {
    color: "red",
    marginLeft: "5%",
  },
});
