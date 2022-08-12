import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { ScrollView, StatusBar, StyleSheet, View } from "react-native";
import BookGroup from "../components/BookGroup";
import ConfirmModal from "../components/ConfirmModal";
import TopBar from "../components/TopBar";
import UserContext from "../contexts/UserContext";
import useCategories from "../hooks/useCategories";

export default function Home(props) {
  const [confirmModalShow, setConfirmModalShow] = useState(false);
  const navigation = useNavigation();
  const state = useContext(UserContext);

  const [newbooks, topRatedBook, bestSeller] = useCategories();

  const handleLogOut = () => {
    setConfirmModalShow(true);
  };

  const toggleDrawer = () => {
    navigation.toggleDrawer();
  };

  return (
    <View style={{ flex: 1 }}>
      <TopBar
        leftIconName="menu"
        middleText="Нүүр"
        rightIconName="power"
        rightIconEvent={handleLogOut}
        leftIconEvent={toggleDrawer}
      />

      <ScrollView style={css.container}>
        <BookGroup title="Эрэлт ихтэй номууд" data={bestSeller} />
        <BookGroup title="Сүүлд нэмэгдсэн номууд" data={newbooks} />
        <BookGroup title="Үнэлгээ өндөр номууд" data={topRatedBook} />
      </ScrollView>

      <ConfirmModal
        confirmModalVisible={confirmModalShow}
        hide={setConfirmModalShow}
        getResult={(res) => {
          if (res) {
            state.logOut();
          } else {
            setConfirmModalShow(false);
          }
        }}
      />
    </View>
  );
}

const css = StyleSheet.create({
  container: {
    padding: 10,
  },
});
