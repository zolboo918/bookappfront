import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Form } from "react-native-autofocus";

import Toast from "react-native-toast-message";
import { PRIMARY_FONT, validateEmail } from "../../constants";
import UserContext from "../contexts/UserContext";
import MyButton from "./MyLoginButton";

const LoginField = () => {
  const state = useContext(UserContext);
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const navigation = useNavigation();

  const hangleLogIn = () => {
    if (emailValue == "") {
      Toast.show({
        text1: "Алдаа",
        text2: "Имэйл оруулна уу",
        type: "error",
      });
      return;
    }
    if (passwordValue == "") {
      Toast.show({
        text1: "Алдаа",
        text2: "Нууц үг оруулна уу",
        type: "error",
      });
      return;
    }
    if (!validateEmail(emailValue)) {
      Toast.show({
        text1: "Алдаа",
        text2: "Имэйл буруу байна",
        type: "error",
      });
      return;
    }
    state.login(emailValue.toLowerCase().trim(), passwordValue.trim());
    setPasswordValue("");
  };

  return (
    <View style={css.flex} behavior="height">
      <View style={css.row}>
        <View style={css.wrapper}>
          <View style={{ width: "100%" }}>
            <Form>
              <TextInput
                placeholder="Имэйл"
                style={css.input}
                type="email-address"
                keyboardType="email-address"
                returnKeyType="next"
                onChangeText={(val) => setEmailValue(val)}
                value={emailValue}
              />
              <TextInput
                placeholder="Нууц үг"
                type="password"
                returnKeyType="go"
                secureTextEntry={true}
                onSubmitEditing={hangleLogIn}
                onChangeText={(val) => setPasswordValue(val)}
                value={passwordValue}
                style={css.input2}
              />
            </Form>
          </View>
        </View>
        {state.loading ? (
          <ActivityIndicator size="large" color="##3A8096" style={css.loader} />
        ) : (
          <MyButton iconName="arrowright" onPress={hangleLogIn} />
        )}
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("ForgetPassword")}
        style={css.bottom}
      >
        <Text style={css.text}>Нууц үг мартсан</Text>
      </TouchableOpacity>
      <View style={css.register}>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={css.registerText}>Бүртгүүлэх</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginField;

const css = StyleSheet.create({
  flex: {
    flex: 1,
  },
  row: {
    flex: 0.6,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "-20%",
  },
  wrapper: {
    borderTopRightRadius: 80,
    borderBottomRightRadius: 80,
    borderRightWidth: 1,
    borderBottomWidth: 4,
    borderColor: "#b2bec3",
    width: "90%",
  },
  text: {
    color: "#887F7F",
    fontFamily: PRIMARY_FONT,
    fontSize: 16,
    textAlign: "right",
    marginRight: 20,
  },
  register: {
    borderTopRightRadius: 80,
    borderBottomRightRadius: 80,
    borderRightWidth: 1,
    borderBottomWidth: 2,
    borderColor: "#b2bec3",
    width: "40%",
    backgroundColor: "#FAFAFA",
    flex: 0.05,
    marginVertical: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
  registerText: {
    color: "#FF4B31",
    fontFamily: PRIMARY_FONT,
    fontSize: 13,
  },
  bottom: {
    marginTop: "15%",
  },
  input: {
    fontSize: 16,
    fontFamily: PRIMARY_FONT,
    color: "#887F7F",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomColor: "#887F7F",
    width: "90%",
    borderBottomWidth: 1,
  },
  input2: {
    fontSize: 16,
    fontFamily: PRIMARY_FONT,
    color: "#887F7F",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomColor: "#887F7F",
    width: "90%",
  },
});
