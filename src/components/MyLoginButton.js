import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const MyButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} disabled={props.disabled}>
      <LinearGradient
        colors={["#D5FC79", "#96E6A1"]}
        start={[0, 0.5]}
        end={[1, 0.5]}
        style={css.border}
      >
        <View>
          <AntDesign
            name={props.iconName}
            size={24}
            color="white"
            style={{ textAlign: "center" }}
          />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default MyButton;

const css = StyleSheet.create({
  border: {
    height: 50,
    width: 50,
    marginLeft: -15,
    marginHorizontal: 5,
    borderRadius: 25,
    justifyContent: "center",
  },
});
