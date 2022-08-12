import React from "react";
import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { PRIMARY_COLOR, PRIMARY_FONT } from "../../constants";
import LoginField from "../components/LoginField";

export default function Login({ navigation }) {
  return (
    <View style={css.container}>
      <StatusBar barStyle="default" translucent={false} />
      <ImageBackground
        source={require("../../assets/images/back2.png")}
        style={css.image}
      >
        <View style={css.wrapper}>
          <Text style={css.text}>Нэвтрэх</Text>
          <LoginField />
        </View>
      </ImageBackground>
    </View>
  );
}

const css = StyleSheet.create({
  container: {
    flex: 1,
  },

  wrapper: {
    flex: 1,
    justifyContent: "center",
  },
  image: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
  },
  text: {
    color: PRIMARY_COLOR,
    fontFamily: PRIMARY_FONT,
    fontSize: 35,
    textAlign: "center",
    marginTop: "50%",
  },
});
