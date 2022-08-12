import axios from "axios";
import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";

export default () => {
  const state = useContext(UserContext);
  const [userData, setUserData] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    getUserInfo();
  }, [success]);

  const getUserInfo = () => {
    setLoading(true);
    axios
      .get(
        `https:bookappapi.herokuapp.com/api/v1/users/${state.userInfo._id}`,
        {
          headers: { Authorization: `Bearer ${state.token}` },
        }
      )
      .then((res) => {
        setUserData(res.data.data);
        setSuccess(true);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setSuccess(false);
        setError(
          err.response.data.error.message
            ? err.response.data.error.message
            : err
        );
        setLoading(false);
      });
  };

  const updateUserInfo = (body) => {
    setLoading(true);
    axios
      .put(
        `https:bookappapi.herokuapp.com/api/v1/users/${state.userInfo._id}`,
        body,
        {
          headers: { Authorization: `Bearer ${state.token}` },
        }
      )
      .then((res) => {
        setUserData(res.data.user);
        setSuccess(true);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setSuccess(false);
        setLoading(false);
        setError(
          err.response.data.error.message
            ? err.response.data.error.message
            : err
        );
      });
  };

  const changePassword = (oldPassword, newPassword) => {
    debugger;
    setLoading(true);
    axios
      .post(
        `https://bookappapi.herokuapp.com/api/v1/users/${state.userInfo._id}/change-password`,
        { oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${state.token}` } }
      )
      .then((res) => {
        setLoading(false);
        setSuccess(true);
      })
      .catch((err) => {
        setSuccess(false);
        setLoading(false);
        console.log("error=>", err.response.data.error.message);
        setError(
          err.response.data.error.message
            ? err.response.data.error.message
            : err
        );
      });
  };

  return [
    userData,
    error,
    success,
    loading,
    getUserInfo,
    updateUserInfo,
    changePassword,
  ];
};
