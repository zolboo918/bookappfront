import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useState, useContext, useEffect, useRef } from "react";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import StarRating from "react-native-star-rating-new";
import { PRIMARY_COLOR, PRIMARY_FONT } from "../../constants";
import Comment from "../components/Comment";
import RatingBottomModal from "../components/RatingBottomModal";
import TopBar from "../components/TopBar";
import UserContext from "../contexts/UserContext";

const BookDetail = (props) => {
  const [comment, setComment] = useState([]);
  const [givingRate, setGivingRate] = useState(0);
  const navigation = useNavigation();
  const state = useContext(UserContext);
  const ratingRef = useRef();

  if (!props.route.params.item) {
    return;
  }

  const {
    _id,
    cover,
    category,
    description,
    isbn,
    publisher,
    rating,
    release_date,
    title,
  } = props.route.params.item;

  const { isForeign } = props.route.params;

  useEffect(() => {
    if (isForeign) {
      try {
        axios
          .get(
            `https://bookappapi.herokuapp.com/api/v1/books/${_id}/foreignbookComments`,
            {
              headers: { Authorization: `Bearer ${state.token}` },
            }
          )
          .then((res) => {
            res.data.data.forEach((el) => {
              setComment((comment) => [...comment, el]);
            });
          })
          .catch((err) => console.log("err", err));
      } catch (error) {
        console.log("error", error);
      }
    }
  }, []);

  const rate = () => {
    ratingRef.current.open();
  };

  const handleRating = (val) => {
    setGivingRate(val);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "position" : "padding"}
      style={css.container}
    >
      <TopBar
        leftIconName="arrow-back-outline"
        middleText="Номын дэлгэрэнгүй"
        leftIconEvent={() => navigation.goBack()}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={css.top}>
          <Image
            source={{ uri: cover }}
            style={css.image}
            resizeMode="contain"
          />
          <View style={css.info}>
            <Text style={css.title}>{title}</Text>
            <Text style={css.title}>{publisher.name}</Text>
            <Text style={css.title}>
              {category.includes(",") ? category.split(", ")[1] : category}
            </Text>
            <Text style={css.title}>{isbn ? isbn : "ISBN:"}</Text>
            <Text style={css.title}>{release_date.slice(0, 10)}</Text>
            <Text style={css.title}>Үнэлгээ:</Text>
            <StarRating
              disabled={true}
              rating={rating}
              fullStarColor={"#E8BD0D"}
              starSize={20}
            />
          </View>
        </View>
        <View style={css.desc}>
          <Text style={css.title}>Тайлбар</Text>
          <Text style={css.description}>{description}</Text>
        </View>

        <TouchableOpacity onPress={rate}>
          <Text style={css.rating}>Үнэлгээ өгөх</Text>
          <RBSheet
            ref={ratingRef}
            height={250}
            animationType="fade"
            closeOnDragDown={true}
            closeOnPressMask={false}
            customStyles={{
              container: {
                borderTopRightRadius: 40,
                borderTopLeftRadius: 40,
              },
            }}
          >
            <RatingBottomModal
              id={_id}
              rating={givingRate}
              onSelectStar={handleRating}
              onHide={() => ratingRef.current.close()}
            />
          </RBSheet>
        </TouchableOpacity>

        <Comment comments={comment} id={_id} isForeign={isForeign} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default BookDetail;

const css = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  info: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "55%",
  },
  image: {
    width: 100,
    height: 200,
    borderRadius: 10,
  },
  title: {
    fontFamily: PRIMARY_FONT,
    fontSize: 15,
    paddingVertical: 5,
  },
  desc: {
    paddingTop: 10,
  },
  description: {
    textAlign: "justify",
  },
  rating: {
    alignSelf: "flex-end",
    marginTop: "5%",
    color: PRIMARY_COLOR,
    fontSize: 15,
    fontFamily: PRIMARY_FONT,
  },
});
