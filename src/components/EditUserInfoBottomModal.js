import React from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { PRIMARY_COLOR, PRIMARY_FONT } from "../../constants";
import MyNoteButton from "./MyNoteButton";
import ProfileItem from "./ProfileItem";

const EditUserInfoBottomModal = ({
  type,
  onSave,
  text,
  data,
  firstNameValue,
  onFirstNameChange,
  lastNameValue,
  onLastNameChange,
  phoneValue,
  onPhoneChange,
  loading,
  oldPasswordValue,
  onOldPasswordChange,
  onNewPasswordChange,
  newPasswordValue,
  newPassword2Value,
  onNewPassword2Change,
}) => {
  return (
    <ScrollView style={css.container}>
      <KeyboardAvoidingView behavior="padding">
        <Text style={css.text}>{text}</Text>
        <ProfileItem
          title={type == "password" ? "Хуучин нууц үг" : "Овог"}
          placeHolder={type == "password" ? "******" : data.lastName}
          editable={true}
          value={type == "password" ? oldPasswordValue : lastNameValue}
          onChangeText={
            type == "password" ? onOldPasswordChange : onLastNameChange
          }
          secureTextEntry={type == "password"}
        />
        <ProfileItem
          title={type == "password" ? "Шинэ нууц үг" : "Нэр"}
          placeHolder={type == "password" ? "******" : data.firstName}
          editable={true}
          value={type == "password" ? newPasswordValue : firstNameValue}
          onChangeText={
            type == "password" ? onNewPasswordChange : onFirstNameChange
          }
          secureTextEntry={type == "password"}
        />
        <ProfileItem
          title={type == "password" ? "Шинэ нууц үг давт" : "Утасны дугаар"}
          placeHolder={type == "password" ? "******" : data.phone}
          editable={true}
          value={type == "password" ? newPassword2Value : phoneValue}
          onChangeText={
            type == "password" ? onNewPassword2Change : onPhoneChange
          }
          keyboardType={type == "password" ? "default" : "number-pad"}
          secureTextEntry={type == "password"}
        />
        <View style={css.buttons}>
          {loading ? (
            <ActivityIndicator
              size="large"
              color={PRIMARY_COLOR}
              style={{ marginLeft: "40%" }}
            />
          ) : (
            <MyNoteButton title="Хадгалах" onPress={() => onSave()} />
          )}
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default EditUserInfoBottomModal;

const css = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  buttons: {
    flexDirection: "row",
    marginVertical: "5%",
  },
  text: {
    fontFamily: PRIMARY_FONT,
    fontSize: 25,
    textAlign: "center",
    color: PRIMARY_COLOR,
    marginVertical: "5%",
  },
});
