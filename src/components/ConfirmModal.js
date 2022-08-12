import React from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import { PRIMARY_COLOR, PRIMARY_FONT } from "../../constants";
import MyButton from "./MyLoginButton";
import MyNoteButton from "./MyNoteButton";
import MySendButton from "./MySendButton";

const ConfirmModal = (props) => {
  return (
    <Modal animationType="fade" visible={props.confirmModalVisible}>
      <View style={css.container}>
        <View style={css.body}>
          <MyButton iconName="question" />
          <Text style={css.text}>Та итгэлтэй байна уу?</Text>
          <View style={css.closeButton}>
            <MyNoteButton
              title="Тийм"
              onPress={() => {
                props.getResult(true);
                props.hide(false);
              }}
            />
            <MyNoteButton
              title="Үгүй"
              onPress={() => {
                props.getResult(false);
                props.hide(false);
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmModal;

const css = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  body: {
    height: "30%",
    width: "90%",
    borderRadius: 25,
    borderColor: PRIMARY_COLOR,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: PRIMARY_FONT,
    color: PRIMARY_COLOR,
    marginTop: 20,
    fontSize: 20,
  },
  closeButton: {
    flexDirection: "row",
    height: "15%",
    marginTop: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
});
