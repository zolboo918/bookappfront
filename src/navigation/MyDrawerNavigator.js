import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import MyDrawerContent from "../components/MyDrawerContent";
import Search from "../screens/Search";
import UserInfo from "../screens/UserInfo";
import MyBottomNavigator from "./MyBottomNavigator";
import MyTopNavigator from "./MyTopNavigator";

const Drawer = createDrawerNavigator();

export default () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <MyDrawerContent {...props} />}
    >
      <Drawer.Screen name="Нүүр" component={MyBottomNavigator} />
      <Drawer.Screen name="Хайх" component={Search} />
      <Drawer.Screen name="Тэмдэглэл" component={MyTopNavigator} />
      <Drawer.Screen name="Хэрэглэгчийн тохиргоо" component={UserInfo} />
    </Drawer.Navigator>
  );
};
