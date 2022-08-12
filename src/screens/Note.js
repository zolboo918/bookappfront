import React from "react";
import { StyleSheet, Text, View } from "react-native";
import TopBar from "../components/TopBar";
import { useNavigation } from "@react-navigation/native";

const Note = () => {
  const navigation = useNavigation();

  return (
    <TopBar
      leftIconName="arrow-back-outline"
      middleText="Номын тэмдэглэл"
      leftIconEvent={() => navigation.goBack()}
    />
  );
};
Note;

export default Note;

const styles = StyleSheet.create({});
