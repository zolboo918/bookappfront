import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { PRIMARY_COLOR, PRIMARY_FONT } from "../../constants";

const BookItem = ({ item }) => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  return (
    <>
      {loading ? (
        <ActivityIndicator
          size="large"
          color={PRIMARY_COLOR}
          style={css.loader}
        />
      ) : (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Detail", { item });
          }}
        >
          <View style={css.container}>
            <Image
              source={{ uri: `${item.cover}` }}
              style={css.image}
              resizeMode="center"
            />
            <View style={{ height: "15%" }}>
              <Text style={css.title}>{item.title} </Text>
            </View>
            <Text style={css.publisher}>{item.publisher.name} </Text>
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};

export default BookItem;

const css = StyleSheet.create({
  container: {
    flex: 1,
    width: 100,
    marginHorizontal: 10,
  },
  image: {
    height: 200,
    width: 100,
    borderRadius: 20,
  },
  title: {
    fontFamily: PRIMARY_FONT,
    fontSize: 13,
    fontWeight: "700",
  },
  publisher: {
    fontSize: 11,
    top: 20,
  },
});
