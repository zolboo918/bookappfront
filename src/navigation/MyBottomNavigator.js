import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import React from "react";
import { BottomModalProvider } from "react-native-bottom-modal";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { PRIMARY_COLOR } from "../../constants";
import Home from "../screens/Home";
import Search from "../screens/Search";
import UserInfo from "../screens/UserInfo";
import MyTopNavigator from "./MyTopNavigator";

const Tab = createMaterialBottomTabNavigator();

export default () => (
  <Tab.Navigator
    initialRouteName="Home"
    activeColor="white"
    barStyle={{
      backgroundColor: PRIMARY_COLOR,
    }}
    sceneAnimationEnabled={true}
    renderTouchable={true}
  >
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarLabel: "Нүүр",
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="home" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Search"
      component={Search}
      options={{
        tabBarLabel: "Хайх",
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="magnify" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Note"
      component={MyTopNavigator}
      options={{
        tabBarLabel: "Тэмдэглэл",
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="note-plus" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="UserInfo"
      component={UserInfo}
      options={{
        tabBarLabel: "Хэрэглэгч",
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="account" color={color} size={26} />
        ),
      }}
    />
  </Tab.Navigator>
);
