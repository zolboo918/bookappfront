import React, { useContext } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Avatar, Caption, Title, Drawer } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { PRIMARY_COLOR, PRIMARY_FONT } from "../../constants";
import UserContext from "../contexts/UserContext";

const MyDrawerContent = (props) => {
  const state = useContext(UserContext);
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <DrawerContentScrollView {...props}>
        <View style={{ flexDirection: "row" }}>
          <Avatar.Icon
            style={{ backgroundColor: PRIMARY_COLOR }}
            icon={() => (
              <MaterialCommunityIcons name="account" color="white" size={40} />
            )}
          />
          <Caption style={{ marginLeft: 20, alignSelf: "center" }}>
            {state.userInfo ? state.userInfo.firstName : ""}{" "}
            {state.userInfo ? state.userInfo.lastName : ""}
          </Caption>
        </View>
        <Title
          style={{
            fontFamily: PRIMARY_FONT,
            marginTop: 20,
            color: PRIMARY_COLOR,
          }}
        >
          Тавтай морилно уу
        </Title>

        <Drawer.Section>
          <DrawerItem
            label="Нүүр"
            onPress={() => props.navigation.navigate("Home")}
          />
          <DrawerItem
            label="Ном хайх"
            onPress={() => props.navigation.navigate("Search")}
          />
          <DrawerItem
            label="Номын тэмдэглэл"
            onPress={() => props.navigation.navigate("Notes")}
          />
          <DrawerItem
            label="Хэрэглэгчийн мэдээлэл"
            onPress={() => props.navigation.navigate("UserInfo")}
          />
        </Drawer.Section>
        <Drawer.Section>
          <DrawerItem label="Гарах" onPress={() => state.logOut()} />
        </Drawer.Section>
      </DrawerContentScrollView>
    </View>
  );
};

export default MyDrawerContent;

const styles = StyleSheet.create({});
