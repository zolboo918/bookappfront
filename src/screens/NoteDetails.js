import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";
import { PRIMARY_FONT } from "../../constants";
import ConfirmModal from "../components/ConfirmModal";
import MyNoteButton from "../components/MyNoteButton";
import SuccessModal from "../components/SuccessModal";
import TopBar from "../components/TopBar";
import useNotes from "../hooks/useNotes";

const NoteDetails = (props) => {
  const [successModalShow, setSuccessModalShow] = useState(false);
  const [confirmModalShow, setConfirmModalShow] = useState(false);

  const [editClicked, setEditClicked] = useState(false);

  const data = props.route.params;
  const date = new Date(data.writedAt);

  const [editedNote, setEditedNote] = useState(data.note);

  const editRef = useRef();

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

  const handleDelete = () => {
    setConfirmModalShow(true);
  };

  const handleEditNote = () => {
    const body = {
      note: editedNote,
    };

    editNote(data._id, body);
    if (successPosted) {
      Toast.show({
        text1: "Амжилттай",
        text2: "Та refresh хийнэ үү",
        type: "success",
        position: "top",
      });
      navigation.goBack();
    }
    setEditClicked(false);
  };

  return (
    <>
      <TopBar
        leftIconName="arrow-back-outline"
        middleText="Тэмдэглэлийн дэлгэрэнгүй"
        leftIconEvent={() => navigation.goBack()}
      />
      <ScrollView>
        <View style={css.container}>
          <View style={css.body}>
            <View style={css.titleSection}>
              <Text style={css.title}>{data.title}</Text>
            </View>
            <View style={css.middle}>
              <View style={css.bookTitle}>
                <Text style={css.title}>{data.bookName}</Text>
              </View>
              <Text style={css.title}>
                {date.getFullYear() +
                  "-" +
                  (date.getMonth() + 1) +
                  "-" +
                  date.getDate()}
              </Text>
            </View>
            <View style={css.note}>
              <TextInput
                ref={editRef}
                style={css.input}
                multiline={true}
                editable={editClicked}
                defaultValue={data.note}
                value={editedNote}
                onChangeText={setEditedNote}
              />
            </View>
          </View>
          {!editClicked ? (
            <View style={css.bottom}>
              <MyNoteButton
                title="Засах"
                onPress={() => {
                  setEditClicked(true);
                  setTimeout(() => editRef.current.focus(), 200);
                }}
              />
              <MyNoteButton title="Устгах" onPress={handleDelete} />
            </View>
          ) : (
            <View style={css.bottom}>
              <MyNoteButton title="Илгээх" onPress={handleEditNote} />
            </View>
          )}

          <SuccessModal
            modalVisible={successModalShow}
            hide={(val) => {
              setSuccessModalShow(val);
              navigation.goBack();
            }}
          />
          <ConfirmModal
            confirmModalVisible={confirmModalShow}
            hide={setConfirmModalShow}
            getResult={(res) => {
              if (res) {
                deleteNote(data._id);
                if (successPosted) {
                  Toast.show({
                    text1: "Амжилттай",
                    text2: "Та refresh хийнэ үү",
                    type: "success",
                    position: "top",
                  });
                  navigation.navigate("Бичсэн тэмдэглэлүүд");
                }
              }
            }}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default NoteDetails;

const css = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  titleSection: {
    justifyContent: "center",
    alignItems: "center",
  },
  body: {
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "#C4C4C4",
    padding: 20,
    margin: 10,
  },
  title: {
    fontFamily: PRIMARY_FONT,
    fontSize: 16,
  },
  middle: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  note: {
    padding: 5,
    borderRadius: 10,
  },
  input: {
    textAlign: "justify",
    color: "black",
  },
  bottom: {
    flexDirection: "row",
  },
  bookTitle: {
    width: "40%",
  },
});
