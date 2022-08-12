import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { PRIMARY_COLOR, PRIMARY_FONT } from "../../constants";
import MyNoteButton from "../components/MyNoteButton";
import UserContext from "../contexts/UserContext";
import useNotes from "../hooks/useNotes";

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [bookName, setBookName] = useState("");
  const navigation = useNavigation();

  const [
    notes,
    loading,
    error,
    successPosted,
    writeNote,
    deleteNote,
    getNotes,
    editNote,
  ] = useNotes();

  const state = useContext(UserContext);

  const postNote = () => {
    if (title === "") {
      Toast.show({
        text1: "Амжилтгүй",
        text2: "Та гарчиг оруулна уу",
        type: "error",
        position: "top",
      });
      return;
    }
    if (authorName === "") {
      Toast.show({
        text1: "Амжилтгүй",
        text2: "Та зохиогчийн нэрийг оруулна уу",
        type: "error",
        position: "top",
      });
      return;
    }
    if (bookName === "") {
      Toast.show({
        text1: "Амжилтгүй",
        text2: "Та номын нэрийг оруулна уу",
        type: "error",
        position: "top",
      });
      return;
    }
    if (note === "") {
      Toast.show({
        text1: "Амжилтгүй",
        text2: "Та тэмдэглэл оруулна уу",
        type: "error",
        position: "top",
      });
      return;
    }

    const body = {
      title,
      note,
      userId: state.userInfo._id,
      bookName,
      authorName,
    };
    writeNote(body);
    if (!successPosted) {
      navigation.navigate("Бичсэн тэмдэглэлүүд");
      Toast.show({
        text1: "Амжилтгүй",
        text2: { error },
        type: "error",
        position: "top",
      });
      setBookName("");
      setAuthorName("");
      setTitle("");
      setNote("");
    }
    if (successPosted) {
      navigation.navigate("Бичсэн тэмдэглэлүүд");
      Toast.show({
        text1: "Амжилттай",
        text2: "Та refresh хийнэ үү",
        type: "success",
        position: "top",
      });
      setBookName("");
      setAuthorName("");
      setTitle("");
      setNote("");
    }
  };

  return (
    <KeyboardAvoidingView behavior="height">
      <ScrollView>
        <View style={css.container}>
          <View style={css.row}>
            <Text style={css.title}>Номын нэр:</Text>
            <TextInput
              style={css.input}
              autoCorrect={false}
              value={bookName}
              onChangeText={setBookName}
            />
          </View>
          <View style={css.row}>
            <Text style={css.title}>Номын зохиолч:</Text>
            <TextInput
              style={css.input}
              autoCorrect={false}
              value={authorName}
              onChangeText={setAuthorName}
            />
          </View>
          <View style={css.row}>
            <Text style={css.title}>Гарчиг:</Text>
            <TextInput
              style={css.input}
              autoCorrect={false}
              value={title}
              onChangeText={setTitle}
            />
          </View>
          <View style={css.row}>
            <Text style={css.title}>Тэмдэглэл:</Text>
          </View>
          <TextInput
            style={css.note}
            multiline={true}
            textAlignVertical="top"
            autoCorrect={false}
            value={note}
            onChangeText={setNote}
          />
          <View style={css.bottom}>
            <MyNoteButton title="Буцах" onPress={() => navigation.goBack()} />
            <MyNoteButton title="Хадгалах" onPress={postNote} />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreateNote;

const css = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "5%",
  },
  input: {
    borderBottomWidth: 1,
    borderColor: PRIMARY_COLOR,
    width: "60%",
    marginLeft: "5%",
  },
  title: {
    fontFamily: PRIMARY_FONT,
    width: "35%",
  },
  note: {
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
    borderRadius: 20,
    marginTop: "5%",
    padding: 20,
  },
  bottom: {
    marginTop: "5%",
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
  },
});
