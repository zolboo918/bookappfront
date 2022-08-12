import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { PRIMARY_COLOR, PRIMARY_FONT } from "../../constants";
import BookItem from "./BookItem";

const BookGroup = ({ title, data }) => {
  return (
    <View>
      <Text style={css.title}>{title}</Text>
      <View style={css.list}>
        <FlatList
          keyExtractor={(item) => item._id}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data}
          renderItem={({ item }) => <BookItem item={item} />}
        />
      </View>
    </View>
  );
};

export default BookGroup;

const css = StyleSheet.create({
  title: {
    fontFamily: PRIMARY_FONT,
    color: PRIMARY_COLOR,
    fontSize: 18,
    marginHorizontal: 10,
    marginTop: "10%",
  },
  list: {
    height: 300,
  },
});
