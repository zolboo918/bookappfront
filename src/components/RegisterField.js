import { AntDesign } from "@expo/vector-icons";
import React, { useContext, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import UserContext from "../contexts/UserContext";
import MyInputField from "./MyInputField";
import MyButton from "./MyLoginButton";
import { PRIMARY_FONT, validateEmail } from "../../constants";
import { Form } from "react-native-autofocus";
import Toast from "react-native-toast-message";

const RegisterField = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const state = useContext(UserContext);

  const handleRegister = () => {
    if (
      phone === "" ||
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password1 === "" ||
      password2 === ""
    ) {
      Toast.show({
        text1: "Алдаа",
        text2: "Бүх талбарыг бөглөнө үү",
        type: "error",
      });
      return;
    }
    if (!validateEmail(email)) {
      Toast.show({
        text1: "Алдаа",
        text2: "Имэйл буруу байна",
        type: "error",
      });
      return;
    }
    if (phone.length < 6) {
      Toast.show({
        text1: "Алдаа",
        text2: "Утасны дугаар шалгана уу",
        type: "error",
      });
      return;
    }
    if (password1.length < 6) {
      Toast.show({
        text1: "Алдаа",
        text2: "Нууц үг 6-аас дээш тэмдэгттэй байна",
        type: "error",
      });
      return;
    }
    if (password1 !== password2) {
      Toast.show({
        text1: "Алдаа",
        text2: "Нууц үг тохирохгүй байна",
        type: "error",
      });
      return;
    }
    const userInfo = {
      firstName,
      lastName,
      email: email.toLowerCase(),
      phone,
      password: password1,
    };

    state.register(userInfo);
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={css.flex}>
      <ScrollView scrollIndicatorInsets={false}>
        <View style={css.row}>
          <View style={css.wrapper}>
            <Form>
              <TextInput
                placeholder="Хэрэглэгчийн нэр"
                value={firstName}
                returnKeyType="next"
                onChangeText={(val) => setFirstName(val)}
                style={css.input}
              />
              <TextInput
                placeholder="Хэрэглэгчийн овог"
                value={lastName}
                returnKeyType="next"
                onChangeText={(val) => setLastName(val)}
                style={css.input}
              />
              <TextInput
                placeholder="Имэйл"
                value={email}
                returnKeyType="next"
                onChangeText={(val) => setEmail(val)}
                autoCapitalize="none"
                keyboardType="email-address"
                style={css.input}
              />
              <TextInput
                placeholder="Утасны дугаар"
                value={phone}
                returnKeyType="next"
                onChangeText={(val) => setPhone(val)}
                style={css.input}
                keyboardType="numeric"
              />
              <TextInput
                placeholder="Нууц үг"
                value={password1}
                returnKeyType="next"
                secureTextEntry={true}
                onChangeText={(val) => setPassword1(val)}
                style={css.input}
              />

              <TextInput
                placeholder="Нууц үг давт"
                value={password2}
                returnKeyType="go"
                secureTextEntry={true}
                onChangeText={(val) => setPassword2(val)}
                style={css.input2}
                onSubmitEditing={handleRegister}
              />
            </Form>
          </View>
          {state.loading ? (
            <ActivityIndicator
              size="large"
              color="##3A8096"
              style={css.loader}
            />
          ) : (
            <MyButton iconName="arrowright" onPress={handleRegister} />
          )}
        </View>
        <View style={css.register}>
          <TouchableOpacity onPress={() => props.onBackPress()}>
            <View style={{ flexDirection: "row" }}>
              <AntDesign
                name="arrowleft"
                size={16}
                color="#FF4B31"
                style={css.arrow}
              />
              <Text style={css.registerText}>Нэвтрэх</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterField;

const css = StyleSheet.create({
  flex: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  wrapper: {
    borderTopRightRadius: 80,
    borderBottomRightRadius: 80,
    borderRightWidth: 1,
    borderBottomWidth: 4,
    borderColor: "#b2bec3",
    width: "90%",
    justifyContent: "center",
  },
  register: {
    borderTopRightRadius: 80,
    borderBottomRightRadius: 80,
    borderRightWidth: 1,
    borderBottomWidth: 2,
    borderColor: "#b2bec3",
    width: "40%",
    backgroundColor: "#FAFAFA",
    alignItems: "center",
    marginVertical: "10%",
  },
  registerText: {
    color: "#FF4B31",
    fontFamily: PRIMARY_FONT,
    fontSize: 16,
    alignSelf: "center",
    lineHeight: 25,
  },
  arrow: {
    alignSelf: "center",
    lineHeight: 25,
    paddingHorizontal: 10,
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
    borderBottomWidth: 1,
    marginBottom: 20,
  },
});
