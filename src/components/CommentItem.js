import { Feather } from "@expo/vector-icons";
import React, { useContext, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { PRIMARY_COLOR, PRIMARY_FONT } from "../../constants";
import UserContext from "../contexts/UserContext";
import ConfirmModal from "./ConfirmModal";
import MySendButton from "./MySendButton";

const CommentItem = (props) => {
  const { _id, comment, userId, writedAt } = props.comment;
  const [isEditable, setIsEditable] = useState(false);
  const [confirmModalShow, setConfirmModalShow] = useState(false);
  const [post, setPost] = useState(false);
  const [edit, setEdit] = useState(false);

  const date = new Date(writedAt);
  const state = useContext(UserContext);
  const editRef = useRef();

  const handleUpdate = () => {
    setIsEditable(true);
    setTimeout(() => {
      editRef.current.focus();
    }, 200);
    setPost(true);
  };

  return (
    <KeyboardAvoidingView
      style={css.writeComment}
      behavior={Platform.OS == "ios" ? "padding" : null}
    >
      <View style={css.userIcon}>
        <Feather name="user" size={24} color="black" />
        <Text style={css.user}>{userId.firstName}</Text>
      </View>
      <View style={css.rightSection}>
        <TextInput
          ref={editRef}
          style={css.comment}
          defaultValue={comment}
          editable={isEditable}
          multiline={true}
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={(val) => props.onChangeText(val)}
        />
        <Text style={css.date}>
          {date.getFullYear() +
            "-" +
            (date.getMonth() + 1) +
            "-" +
            date.getDate() +
            " " +
            date.getHours() +
            ":" +
            date.getMinutes() +
            ":" +
            date.getSeconds()}
        </Text>
      </View>

      {userId._id == state.userInfo._id ? (
        !edit && !post ? (
          <TouchableOpacity onPress={() => setEdit(true)} style={css.myButton}>
            <Feather name="more-horizontal" size={18} color={PRIMARY_COLOR} />
          </TouchableOpacity>
        ) : edit && !post ? (
          <>
            <View style={css.delete}>
              <TouchableOpacity
                onPress={() => {
                  setConfirmModalShow(true);
                }}
              >
                <Feather name="trash" size={18} color="#BF3325" />
                <ConfirmModal
                  confirmModalVisible={confirmModalShow}
                  hide={() => setConfirmModalShow(false)}
                  getResult={(res) => {
                    if (res) {
                      props.onDelete(_id);
                    } else {
                      setConfirmModalShow(false);
                    }
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={css.delete}>
              <TouchableOpacity onPress={handleUpdate}>
                <Feather name="edit" size={18} color={PRIMARY_COLOR} />
              </TouchableOpacity>
            </View>
          </>
        ) : edit && post ? (
          <View style={css.myButton}>
            <MySendButton
              iconName="paper-plane"
              onPress={() => {
                setEdit(false);
                setPost(false);
                setIsEditable(false);
                props.onUpdate();
              }}
            />
          </View>
        ) : null
      ) : null}
    </KeyboardAvoidingView>
  );
};

export default CommentItem;

const css = StyleSheet.create({
  writeComment: {
    borderColor: "#D8D8D8",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    flexDirection: "row",
    marginVertical: 10,
    width: "100%",
  },
  userIcon: {
    alignSelf: "flex-start",
    marginTop: 8,
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
  rightSection: {
    flexDirection: "column",
    height: "100%",
    marginHorizontal: 10,
    width: "55%",
  },
  user: {
    fontSize: 11,
    paddingHorizontal: 5,
  },
  comment: {
    fontSize: 13,
    fontFamily: PRIMARY_FONT,
    color: "black",
    paddingVertical: 5,
  },
  date: {
    fontSize: 11,
  },
  delete: {
    marginTop: 10,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginHorizontal: 5,
  },
  myButton: {
    justifyContent: "flex-start",
    alignItems: "flex-end",
    marginLeft: "10%",
    marginTop: 10,
  },
});
