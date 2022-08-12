import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import StarRating from "react-native-star-rating-new";
import { PRIMARY_FONT } from "../../constants";
import SearchArea from "../components/SearchArea";
import TopBar from "../components/TopBar";
import useSearch from "../hooks/useSearch";

const Search = () => {
  const [value, setValue] = useState("");
  const [isMongolianBook, setIsMongolianBook] = useState(true);
  const [
    loading,
    searchedBook,
    foreignBooks,
    searchMongolianBook,
    searchForeignBook,
    onIconPress,
  ] = useSearch();

  const navigation = useNavigation();

  const onSearch = () => {
    try {
      if (isMongolianBook) {
        searchMongolianBook(value);
      } else {
        searchForeignBook(value);
      }
    } catch (error) {
      console.log("error->", error);
    }
  };

  const onCloseIconPress = () => {
    setValue("");
    onIconPress();
  };

  const pressCircle = (value) => {
    setIsMongolianBook(value);
  };

  return (
    <>
      <TopBar
        leftIconName="arrow-back-outline"
        middleText="Хайх"
        leftIconEvent={() => navigation.goBack()}
      />
      <ScrollView>
        <View style={css.container}>
          <SearchArea
            value={value}
            onChangeText={setValue}
            onSearch={onSearch}
            onIconPress={onCloseIconPress}
            pressCircle={pressCircle}
          />
          {loading ? (
            <View style={css.loader}>
              <ActivityIndicator size="large" color="##3A8096" />
            </View>
          ) : isMongolianBook ? (
            searchedBook.map((el) => {
              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate("Detail", { item: el })}
                  key={el._id}
                >
                  <View style={css.itemWrapper}>
                    <Image
                      source={{ uri: `${el.cover}` }}
                      style={css.itemImage}
                      resizeMode="center"
                    />
                    <View style={css.itemRight}>
                      <Text style={css.title}>{el.title}</Text>
                      <Text style={css.publisher}>{el.publisher.name}</Text>
                      <View style={css.itemStar}>
                        <StarRating
                          disabled={true}
                          rating={el.rating}
                          fullStarColor={"#E8BD0D"}
                          starSize={20}
                        />
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })
          ) : (
            foreignBooks.map((el) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Detail", {
                      item: el,
                      isForeign: true,
                    })
                  }
                  key={el._id}
                >
                  <View style={css.itemWrapper}>
                    <Image
                      source={{ uri: `${el.cover}` }}
                      style={css.itemImage}
                      resizeMode="center"
                    />
                    <View style={css.itemRight}>
                      <Text style={css.title}>{el.title}</Text>
                      <Text style={css.publisher}>{el.publisher.name}</Text>
                      <View style={css.itemStar}>
                        <StarRating
                          disabled={true}
                          rating={el.rating}
                          fullStarColor={"#E8BD0D"}
                          starSize={20}
                        />
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default Search;

const css = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  itemWrapper: {
    flexDirection: "row",
    padding: 20,
  },
  itemImage: { width: 50, height: 100, marginRight: 20 },
  itemRight: { width: "80%" },
  itemStar: { alignItems: "flex-start", marginTop: 20 },

  title: {
    fontFamily: PRIMARY_FONT,
    fontSize: 15,
    paddingVertical: 5,
  },
  publisher: {
    fontSize: 11,
  },
  loader: {
    marginTop: "50%",
  },
});
