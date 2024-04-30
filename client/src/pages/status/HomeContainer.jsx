import React from "react";
import { Link } from "react-router-dom";

const HomeContainer = () => {
  return (
    <div className="container">
      <h1 className="text-center my-5">Kitty Love</h1>
      <p className="lead text-center">
        You have a secret crush on a person that you can't express, right?{" "}
        <br />
        Welcome to Kitty-Love, A place where you are free to express you love.
        Don't worry it's secure and anonymous 🤫
      </p>
      <div className="row justify-content-center mt-5">
        <div className="col-md-6 text-center">
          <Link className="homelink" to={"/signup"}>
            <p className="h4">Login using your mail id</p>
          </Link>
          <p>
            This is to maintain the integrity.
            <br /> Eg: kitty@gmail.com
          </p>
        </div>
      </div>
      <div className="row justify-content-center mt-5">
        <div className="col-md-6 text-center">
          <Link className="homelink" to={"/signup"}>
            <p className="h4">Select your crush and send anonymous messages</p>
          </Link>
          <p>
            You can send messages to any number of users and add upto 3 users to
            your crush list
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
          <p>If there is a mutual crush, you'll be notified through email 😃</p>
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
  );
};

export default HomeContainer;
