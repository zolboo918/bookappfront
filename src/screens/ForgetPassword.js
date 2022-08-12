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
import { PRIMARY_COLOR, PRIMARY_FONT } from "../../constants";
import MyNoteButton from "../components/MyNoteButton";
import { validateEmail } from "../../constants";
import Toast from "react-native-toast-message";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [emailEntered, setEmailEntered] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const getCode = () => {
    if (email === "") {
      Toast.show({
        text1: "Алдаа",
        text2: "Имэйл оруулна уу",
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

    setLoading(true);
    axios
      .post("https:bookappapi.herokuapp.com/api/v1/users/forgot-password", {
        email: email.toLowerCase(),
      })
      .then((res) => {
        setLoading(false);
        if (res.data.success == true) {
          setEmailEntered(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        Toast.show({
          text1: "Алдаа",
          text2: err.response.data.error.message,
          type: "error",
        });
      });
  };

  const checkCode = () => {
    setLoading(true);
    axios
      .post("https:bookappapi.herokuapp.com/api/v1/users/check-token", {
        token: code,
        email: email.toLowerCase(),
      })
      .then((res) => {
        setLoading(false);
        if (res.data.success == true) {
          navigation.navigate("NewPassword", code);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        Toast.show({
          text1: "Алдаа",
          text2: "Код буруу байна",
          type: "error",
        });
      });
  };

  return !loading ? (
    !emailEntered ? (
      <View style={css.container}>
        <StatusBar barStyle="default" translucent={false} />
        <ImageBackground
          source={require("../../assets/images/back2.png")}
          style={css.image}
        >
          <KeyboardAvoidingView behavior="height" style={css.wrapper}>
            <Text style={css.text}>Нууц үг сэргээх</Text>
            <View style={css.body}>
              <Text style={css.description}>
                Бүртгэлтэй имэйл хаягаа оруулна уу
              </Text>
              <TextInput
                style={css.input}
                value={email}
                placeholder="Имэйл"
                keyboardType="email-address"
                onChangeText={setEmail}
              />
              <View style={css.buttons}>
                <MyNoteButton
                  title="Буцах"
                  onPress={() => navigation.goBack()}
                />
                <MyNoteButton title="Үргэлжлүүлэх" onPress={() => getCode()} />
              </View>
            </View>
          </KeyboardAvoidingView>
          {/* <View style={css.description}>
        </View> */}
        </ImageBackground>
      </View>
    ) : (
      <View style={css.container}>
        <StatusBar barStyle="default" translucent={false} />
        <ImageBackground
          source={require("../../assets/images/back2.png")}
          style={css.image}
        >
          <KeyboardAvoidingView behavior="height" style={css.wrapper}>
            <Text style={css.text}>Нууц үг сэргээх</Text>
            <View style={css.body}>
              <Text style={css.description}>
                Имэйлээр очсон 4 оронтой кодыг оруулна уу
              </Text>
              <TextInput
                style={css.input}
                value={code}
                placeholder="Код оруулна уу"
                keyboardType="number-pad"
                onChangeText={setCode}
                textAlign="center"
              />
              <View style={css.buttons}>
                <MyNoteButton
                  title="Буцах"
                  onPress={() => navigation.goBack()}
                />
                <MyNoteButton
                  title="Үргэлжлүүлэх"
                  onPress={() => checkCode()}
                />
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    )
  ) : (
    <ActivityIndicator
      size="large"
      color={PRIMARY_COLOR}
      style={{ marginTop: "50%" }}
    />
  );
};

export default ForgetPassword;

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
