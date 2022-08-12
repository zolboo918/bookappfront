import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { PRIMARY_COLOR, PRIMARY_FONT } from "../../constants";
import MyNoteButton from "../components/MyNoteButton";

const NewPassword = (props) => {
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const changePassword = () => {
    if (password1 === "" || password2 === "") {
      Toast.show({
        text1: "Алдаа",
        text2: "Талбаруудыг бүрэн бөглөнө үү",
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

    setLoading(true);
    axios
      .post("https://bookappapi.herokuapp.com/api/v1/users/reset-password", {
        password: password1,
        token: props.route.params,
      })
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          navigation.navigate("Login");
          Toast.show({
            text1: "Амжилттай",
            text2: "Нууц үг амжилттай шинэчлэгдлээ",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        Toast.show({
          text1: "Амжилтгүй",
          text2: err.response.data.error.message,
          type: "error",
        });
      });
  };

  return !loading ? (
    <View style={css.container}>
      <StatusBar barStyle="default" translucent={false} />
      <ImageBackground
        source={require("../../assets/images/back2.png")}
        style={css.image}
      >
        <KeyboardAvoidingView behavior="padding" style={css.wrapper}>
          <Text style={css.text}>Нууц үг сэргээх</Text>
          <View style={css.body}>
            <Text style={css.description}>Шинэ нууц үгээ оруулна уу</Text>
            <TextInput
              style={css.input}
              value={password1}
              placeholder="Шинэ нууц үг"
              onChangeText={setPassword1}
              secureTextEntry={true}
            />
            <TextInput
              style={css.input}
              value={password2}
              placeholder="Шинэ нууц үг давт"
              onChangeText={setPassword2}
              secureTextEntry={true}
            />

            <View style={css.buttons}>
              <MyNoteButton title="Буцах" onPress={() => navigation.goBack()} />
              <MyNoteButton
                title="Үргэлжлүүлэх"
                onPress={() => changePassword()}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
        {/* <View style={css.description}>
        </View> */}
      </ImageBackground>
    </View>
  ) : (
    <ActivityIndicator
      size="large"
      color={PRIMARY_COLOR}
      style={{ marginTop: "50%" }}
    />
  );
};

export default NewPassword;

const css = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    justifyContent: "center",
  },
  image: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
  },
  text: {
    color: PRIMARY_COLOR,
    fontFamily: PRIMARY_FONT,
    fontSize: 35,
    textAlign: "center",
  },
  description: {
    textAlign: "center",
    fontFamily: PRIMARY_FONT,
  },
  body: {
    marginTop: "20%",
    alignItems: "center",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: PRIMARY_COLOR,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: "70%",
    marginTop: "10%",
    fontFamily: PRIMARY_FONT,
  },
  buttons: {
    flexDirection: "row",
    marginTop: "5%",
  },
});
