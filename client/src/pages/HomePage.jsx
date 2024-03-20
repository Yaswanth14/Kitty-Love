import React from "react";
import Layout from "../components/Layout/Layout";
import { Link, useNavigate } from "react-router-dom";
// import "../styles/Home.css"

const HomePage = () => {
  const navigate = useNavigate();
  function doRedirect() {
    navigate("/signup");
  }
  return (
    <Layout>
      <div className="container">
        <h1 className="text-center my-5">Kitty Love</h1>
        <p className="lead text-center">
          Valentine's Day is over 🙁 but you still have a chance to confess, we
          will help you express your kitty love.
        </p>
        <div className="row justify-content-center mt-5">
          <div className="col-md-6 text-center">
            <Link className="homelink" to={"/signup"}>
              <p className="h4">Login using domain mail id</p>
            </Link>
            <p>
              This is to maintain the integrity.
              <br /> Eg: 21212kitty@gvpce.ac.in
            </p>
          </div>
        </div>
        <div className="row justify-content-center mt-5">
          <div className="col-md-6 text-center">
            <Link className="homelink" to={"/signup"}>
              <p className="h4">
                Select your crush and send anonymous messages
              </p>
            </Link>
            <p>
              You can send messages to any number of users and add upto 3 users
              to your crush list
            </p>
          </div>
        </div>
        <div className="row justify-content-center mt-5">
          <div className="col-md-6 text-center">
            <Link className="homelink" to={"/signup"}>
              <p className="h4">Keep track of your crushes</p>
            </Link>
            <p>
              You can know the number of people having crush on you but not who
              they are
            </p>
          </div>
        </div>
        <div className="row justify-content-center mt-5">
          <div className="col-md-6 text-center">
            <Link className="homelink" to={"/signup"}>
              <p className="h4">Connect with your kitty love</p>
            </Link>
            <p>
              If there is a mutual crush, you'll be notified through email 😃
            </p>
          </div>
        </div>
        <div className="row justify-content-center mt-5">
          <div className="col-md-6 text-center">
            <Link to="/signup" className="btn btn-primary">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
