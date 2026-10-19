import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";
import { useContext } from "react";

const UserProtectWrapper = ({ children }) => {
  const { user, setUser } = useContext(UserDataContext);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  const fetchUserProfile = async () => {
    try {
      setIsLoading(true);
      const response = await axios
        .get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setUser(response.data.user);
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
          localStorage.removeItem("token");
          navigate("/login");
          setIsLoading(false);
        });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchUserProfile();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};
export default UserProtectWrapper;
