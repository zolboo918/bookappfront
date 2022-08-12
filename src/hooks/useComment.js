import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import Toast from "react-native-toast-message";
import UserContext from "../contexts/UserContext";

export default (id, comment, isForeign) => {
  const [comments, setComments] = useState([]);
  const [previousComment, setPreviousComment] = useState([]);
  const [writedComment, setWritedComment] = useState("");
  const [editedComment, setEditedComment] = useState("");
  const [loading, setLoading] = useState(false);
  const state = useContext(UserContext);

  useEffect(() => {
    try {
      setLoading(true);
      if (isForeign) {
        getBookComments(
          `https://bookappapi.herokuapp.com/api/v1/books/${id}/foreignbookComments`
        );
      } else {
        getBookComments(
          `https://bookappapi.herokuapp.com/api/v1/books/${id}/comments`
        );
      }
    } catch (error) {
      console.log("error", error);
      Toast.show({
        text1: "Амжилтгүй",
        type: "error",
      });
    }
  }, [previousComment]);

  const getBookComments = (url) => {
    axios
      .get(url, {
        headers: { Authorization: `Bearer ${state.token}` },
      })
      .then((res) => {
        const arr = res.data.data;

        const sorted = arr.sort((a, b) => (a.writedAt < b.writedAt ? 1 : -1));
        setComments(sorted);

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const postComment = (url) => {
    const date = new Date(Date.now());
    axios
      .post(
        url,
        {
          comment: writedComment,
          userId: state.userInfo._id,
          writedAt: date,
        },
        { headers: { Authorization: `Bearer ${state.token}` } }
      )
      .then((res) => {
        setPreviousComment([...comments, res.data.data]);
        setWritedComment("");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const writeComment = () => {
    setLoading(true);
    if (isForeign) {
      postComment(
        `https://bookappapi.herokuapp.com/api/v1/foreignbookComments/${id}`
      );
    } else {
      postComment(
        `https://bookappapi.herokuapp.com/api/v1/books/${id}/comments`
      );
    }
  };

  const deleteComment = (commentId) => {
    const url = isForeign
      ? `https://bookappapi.herokuapp.com/api/v1/foreignbookComments/${commentId}`
      : `https://bookappapi.herokuapp.com/api/v1/comments/${commentId}`;
    axios
      .delete(url, { headers: { Authorization: `Bearer ${state.token}` } })
      .then((res) => {
        setPreviousComment(
          previousComment.filter((el) => el._id !== res.data.data._id)
        );
        setLoading(false);
        Toast.show({
          text1: "Амжилттай",
          type: "success",
          position: "top",
        });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        Toast.show({
          text1: "Амжилтгүй",
          type: "error",
          position: "top",
        });
      });
  };

  const updateComment = (commentId) => {
    const url = isForeign
      ? `https://bookappapi.herokuapp.com/api/v1/foreignbookComments/${commentId}`
      : `https://bookappapi.herokuapp.com/api/v1/comments/${commentId}`;
    axios
      .put(
        url,
        { comment: editedComment },
        { headers: { Authorization: `Bearer ${state.token}` } }
      )
      .then((res) => {
        setPreviousComment(
          previousComment.map((el) => {
            if (el._id === res.data.data._id) {
              el.comment = res.data.data.comment;
            }
          })
        );
        setLoading(false);
        Toast.show({
          text1: "Амжилттай",
          type: "success",
          position: "top",
        });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        Toast.show({
          text1: "Амжилтгүй",
          type: "error",
          position: "top",
        });
      });
  };

  return [
    loading,
    comments,
    writedComment,
    editedComment,
    writeComment,
    setWritedComment,
    setEditedComment,
    deleteComment,
    updateComment,
  ];
};
