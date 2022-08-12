import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  StatusBar,
} from "react-native";
import { PRIMARY_COLOR, PRIMARY_FONT } from "../../constants";
import RegisterField from "../components/RegisterField";

export default function Register({ navigation }) {
  const handleBackPress = () => {
    navigation.pop();
  };
  return (
    <View style={css.container}>
      <StatusBar barStyle="default" translucent={false} />
      <ImageBackground
        source={require("../../assets/images/back3.png")}
        style={css.image}
      >
        <View style={css.wrapper}>
          <Text style={css.text}>Бүртгүүлэх</Text>
          <RegisterField onBackPress={handleBackPress} />
        </View>
      </ImageBackground>
    </View>
  );
}

const css = StyleSheet.create({
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
    justifyContent: "center",
    marginTop: "30%",
    marginBottom: "20%",
  },
});
