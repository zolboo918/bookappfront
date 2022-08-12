import axios from "axios";
import React, { useContext, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import StarRating from "react-native-star-rating-new";
import Toast from "react-native-toast-message";
import { PRIMARY_COLOR, PRIMARY_FONT } from "../../constants";
import UserContext from "../contexts/UserContext";
import MyNoteButton from "./MyNoteButton";

const RatingBottomModal = ({ id, rating, onSelectStar, onHide }) => {
  const [loading, setLoading] = useState(false);
  const state = useContext(UserContext);
  const sendRating = () => {
    setLoading(true);
    axios
      .post(
        `https://bookappapi.herokuapp.com/api/v1/books/${id}/rating`,
        { rating },
        { headers: { Authorization: `Bearer ${state.token}` } }
      )
      .then((res) => {
        if (res.data.success) {
          setLoading(false);
          onHide();
          Toast.show({
            type: "success",
            text1: "Амжилттай",
            text2: "Таний үнэлгээг хүлээн авлаа",
            position: "top",
          });
        }
      })
      .catch((err) => {
        onHide();
        Toast.show({
          type: "error",
          text1: "Амжилтгүй",
          text2: err.response.data
            ? err.response.data.error.message
            : err.message,
          position: "top",
        });
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <View style={css.container}>
      <Text style={css.title}>Үнэлгээ өгөх</Text>

      <Text style={css.desc}>Та номонд өөрийн үнэлгээг өгнө үү.</Text>
      <StarRating
        disabled={false}
        rating={rating}
        fullStarColor={"#E8BD0D"}
        starSize={30}
        containerStyle={{ marginTop: 10 }}
        selectedStar={onSelectStar}
      />
      <View style={css.buttons}>
        {loading ? (
          <ActivityIndicator size="large" color={PRIMARY_COLOR} />
        ) : (
          <>
            <MyNoteButton title="Хаах" onPress={onHide} />
            <MyNoteButton title="Илгээх" onPress={sendRating} />
          </>
        )}
      </View>
    </View>
  );
};

export default RatingBottomModal;

const css = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    justifyContent: "center",
    fontFamily: PRIMARY_FONT,
    color: PRIMARY_COLOR,
    fontSize: 20,
  },
  desc: {
    justifyContent: "center",
    color: "black",
    fontFamily: PRIMARY_FONT,
    fontSize: 15,
    marginTop: 40,
  },
  buttons: {
    marginTop: "12%",
    flexDirection: "row",
  },
});
