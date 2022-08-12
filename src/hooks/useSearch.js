import { useContext, useState } from "react";
import { formatter } from "../utils/bookFormatter";
import UserContext from "../contexts/UserContext";
import axios from "axios";

export default () => {
  const [searchedBook, setSearchedBook] = useState([]);
  const [foreignBooks, setForeignBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const state = useContext(UserContext);

  const searchMongolianBook = (value) => {
    setLoading(true);
    axios
      .get(
        `https://bookappapi.herokuapp.com/api/v1/books/?limit=10&search=${value}`,
        {
          headers: { Authorization: `Bearer ${state.token}` },
        }
      )
      .then((res) => {
        setSearchedBook(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log("error", error);
      });
  };

  const searchForeignBook = (value) => {
    setLoading(true);
    axios
      .get(`https://www.googleapis.com/books/v1/volumes?q={${value}}`)
      .then((res) => {
        res.data.items.forEach((el) => {
          setForeignBooks((foreignBooks) => [...foreignBooks, formatter(el)]);
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
        setLoading(false);
      });
  };

  const onIconPress = () => {
    setForeignBooks([]);
    setSearchedBook([]);
  };
  return [
    loading,
    searchedBook,
    foreignBooks,
    searchMongolianBook,
    searchForeignBook,
    onIconPress,
  ];
};
