import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import UserContext from "../contexts/UserContext";

export default () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successPosted, setSuccessPosted] = useState(false);

  const state = useContext(UserContext);

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    setLoading(true);
    try {
      axios
        .get(
          `https://bookappapi.herokuapp.com/api/v1/users/${state.userInfo._id}/notes`,
          { headers: { Authorization: `Bearer ${state.token}` } }
        )
        .then((res) => {
          setNotes(res.data.data);
          setLoading(false);
          setSuccessPosted(true);
        })
        .catch((error) => {
          console.log("error=>", error);
          setError(error);
          setLoading(false);
        });
    } catch (error) {
      console.log("error=>", error);
      setError(error);
      setLoading(false);
    }
  };

  const writeNote = (body) => {
    try {
      setLoading(true);
      axios
        .post("https://bookappapi.herokuapp.com/api/v1/notes/", body, {
          headers: { Authorization: `Bearer ${state.token}` },
        })
        .then((res) => {
          setSuccessPosted(true);
          setNotes((notes) => [...notes, res.data.data]);
          setLoading(false);
        })
        .catch((err) => {
          console.log("error=>", err);
          setError(err);
        });
    } catch (error) {
      console.log("error->", error);
    }
  };

  const deleteNote = (id) => {
    try {
      setLoading(true);
      axios
        .delete(`https://bookappapi.herokuapp.com/api/v1/notes/${id}`, {
          headers: { Authorization: `Bearer ${state.token}` },
        })
        .then((res) => {
          setSuccessPosted(true);
          setNotes(notes.filter((el) => el._id !== res.data.data._id));
          setLoading(false);
        })
        .catch((err) => {
          console.log("error=>", error.message);
          setError(error.message);
          setLoading(false);
        });
    } catch (error) {
      console.log("error->", error);
    }
  };

  const editNote = (id, body) => {
    setLoading(true);
    axios
      .put(`https://bookappapi.herokuapp.com/api/v1/notes/${id}`, body, {
        headers: { Authorization: `Bearer ${state.token}` },
      })
      .then((res) => {
        console.log("resss", res.data);
        setSuccessPosted(true);
        setNotes(notes.filter((el) => el._id !== id));
        setNotes((notes) => [...notes, res.data.data]);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err=> ", err);
        setError(error.message);
        setLoading(false);
      });
  };

  return [
    notes,
    loading,
    error,
    successPosted,
    writeNote,
    deleteNote,
    getNotes,
    editNote,
  ];
};
