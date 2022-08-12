import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import NoteList from "../screens/NoteList";
import CreateNote from "../screens/CreateNote";
import TopBar from "../components/TopBar";
import { useNavigation } from "@react-navigation/native";
import { PRIMARY_COLOR, PRIMARY_FONT } from "../../constants";

const MyTopNavigator = () => {
  const Tab = createMaterialTopTabNavigator();
  const navigation = useNavigation();
  return (
    <>
      <TopBar
        leftIconName="arrow-back-outline"
        middleText="Номын тэмдэглэл"
        leftIconEvent={() => navigation.goBack()}
      />
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: "white",
          labelStyle: {
            fontSize: 12,
            fontFamily: PRIMARY_FONT,
          },
          inactiveTintColor: PRIMARY_COLOR,
          indicatorStyle: {
            height: null,
            top: "10%",
            bottom: "10%",
            width: "45%",
            left: "2.5%",
            borderRadius: 100,
            backgroundColor: PRIMARY_COLOR,
          },
          style: {
            alignSelf: "center",
            width: "90%",
            borderRadius: 100,
            borderColor: "blue",
            backgroundColor: "white",
            elevation: 5,
            shadowOpacity: 0.1,
            shadowRadius: 4,
          },
          tabStyle: {
            borderRadius: 100,
          },
        }}
      >
        <Tab.Screen name="Бичсэн тэмдэглэлүүд" component={NoteList} />
        <Tab.Screen name="Шинэ тэмдэглэл" component={CreateNote} />
      </Tab.Navigator>
    </>
  );
};

export default MyTopNavigator;
