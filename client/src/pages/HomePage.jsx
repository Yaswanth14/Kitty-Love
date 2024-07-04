import React, { useEffect } from "react";
import Layout from "../Components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth";
import HomeContainer from "./status/HomeContainer";
import StatusContainer from "./status/StatusContainer";

const HomePage = () => {
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  function doRedirect() {
    navigate("/signup");
  }

  useEffect(() => {
    document.title = "Kitty-Love 💕";
  }, []);

  return <Layout>{auth.user ? <StatusContainer /> : <HomeContainer />}</Layout>;
};

export default HomePage;
