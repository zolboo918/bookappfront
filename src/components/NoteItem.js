import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { PRIMARY_FONT } from "../../constants";
import MyButton from "./MyLoginButton";

const NoteItem = (props) => {
  const navigation = useNavigation();
  const date = new Date(props.data.writedAt);
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("NoteDetails", { ...props.data })}
    >
      <ScrollView>
        <View style={css.container}>
          <View style={css.outer}>
            <Text style={css.title}>{props.data.title}</Text>
            <TextInput
              style={css.input}
              multiline={true}
              numberOfLines={5}
              autoCorrect={false}
              editable={false}
              value={props.data.note}
              maxHeight={100}
            />
            <View style={css.bottom}>
              <View style={css.author}>
                <Text style={css.bottomText}>{props.data.bookName}</Text>
                <Text>{props.data.authorName}</Text>
              </View>
              <Text style={css.bottomText}>
                {date.getFullYear() +
                  "-" +
                  (date.getMonth() + 1) +
                  "-" +
                  date.getDate()}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </TouchableOpacity>
  );
};

export default NoteItem;
const css = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  outer: {
    width: "80%",
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "#C4C4C4",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: "5%",
    marginTop: "10%",
  },
  input: {
    padding: 15,
    margin: 15,
    textAlign: "justify",
    fontSize: 14,
    borderRadius: 10,
    fontWeight: "100",
    color: "#2F2F2F",
  },
  title: {
    fontFamily: PRIMARY_FONT,
    fontSize: 16,
    color: "black",
    marginHorizontal: 30,
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  bottomText: {
    fontFamily: PRIMARY_FONT,
  },
  author: {
    width: "50%",
  },
});
