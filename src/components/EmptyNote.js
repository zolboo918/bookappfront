import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { PRIMARY_COLOR, PRIMARY_FONT } from "../../constants";
import MyNoteButton from "./MyNoteButton";

const EmptyNote = () => {
  const navigation = useNavigation();
  return (
    <View style={css.container}>
      <View style={css.empty}>
        <Image
          style={css.image}
          source={require("../../assets/images/empty_background.png")}
        />
        <Text style={css.description}>
          Танд одоогоор бичсэн номын тэмдэглэл байхгүй байна.
        </Text>
        <MyNoteButton
          title="+ Шинэ тэмдэглэл бичих"
          onPress={() => navigation.navigate("Шинэ тэмдэглэл")}
        />
      </View>
    </View>
  );
};

export default EmptyNote;

const css = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 200,
    width: 200,
    marginTop: "30%",
  },
  description: {
    fontFamily: PRIMARY_FONT,
    fontSize: 18,
    color: PRIMARY_COLOR,
    textAlign: "center",
    marginBottom: "10%",
  },
  empty: {
    justifyContent: "center",
    alignItems: "center",
  },
});
