import React from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { PRIMARY_COLOR, PRIMARY_FONT } from "../../constants";
import MySendButton from "./MySendButton";

const ProfileItem = (props) => {
  const { title, placeHolder } = props;
  return (
    <KeyboardAvoidingView behavior="padding" style={css.item}>
      <Text style={css.title}>{title}</Text>
      <TextInput
        style={[css.input, props.style]}
        autoCorrect={false}
        placeholder={placeHolder}
        editable={props.editable}
        {...props}
      />
      {props.hasIcon && (
        <View style={css.button}>
          <MySendButton iconName="edit" onPress={props.showPassword} />
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default ProfileItem;

const css = StyleSheet.create({
  item: {
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  title: {
    fontFamily: PRIMARY_FONT,
    color: PRIMARY_COLOR,
    fontSize: 16,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: PRIMARY_COLOR,
    marginVertical: "5%",
    fontFamily: PRIMARY_FONT,
    fontSize: 15,
    width: "100%",
    color: "#303030",
  },
  button: {
    position: "absolute",
    marginLeft: "100%",
    bottom: 20,
  },
});
