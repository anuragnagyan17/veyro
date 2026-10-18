import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserLogout = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  axios
    .get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      if (res.status === 200 || res.status === 201) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    })
    .catch((err) => console.log(err));

  return <div>UserLogout</div>;
};
export default UserLogout;
