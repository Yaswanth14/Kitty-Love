import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth";
import HomeContainer from "./status/HomeContainer";
import StatusContainer from "./status/StatusContainer";
import { toast } from "react-toastify";
import axios from "axios";

const HomePage = () => {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(`${import.meta.env.VITE_API}/user/user-auth`);
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
        toast.error("Session expired!");
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return <Layout>{ok ? <StatusContainer /> : <HomeContainer />}</Layout>;
};

export default HomePage;
