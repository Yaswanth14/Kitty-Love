import React from "react";
import { Link, NavLink } from "react-router-dom";
import girlImage from "../../assets/2.jpg";
import boyImage from "../../assets/1.jpg";
import anonymousImage from "../../assets/3.jpg";
import crushListImage from "../../assets/4.jpg";
import profilesImage from "../../assets/5.jpg";
import msgImage from "../../assets/6.jpg";
import searchCrushImage from "../../assets/7.jpg";
import notificationImage from "../../assets/8.jpg";

const HomeContainer = () => {
  return (
    <div className="pt-[100px] px-3">
      <p className="lead text-center">
        You have a secret crush on a person that you can't express, right?
      </p>
      <h1 className="text-5xl font-bold text-center text-pink-600 mt-5">
        Welcome to KITTY LOVE 💕
      </h1>
      <p className="text-center mb-5 mt-2">
        A dating site espeacially made for GVPians.
      </p>
      <p className="lead text-center">
        A place where you are free to express your love. Don't worry it's secure
        and anonymous 🤫
      </p>
      {/*  */}
      <div className="flex h-[64] my-5 p-3 text-xl space-x-2 flex-wrap max-[1300px]:flex-col items-center">
        <div className="flex space-x-2">
          <img
            src={girlImage}
            alt=""
            className="w-64 h-64 rounded-md max-[600px]:w-[150px] max-[600px]:h-[150px]"
          />
          <img
            src={boyImage}
            alt=""
            className="w-64 h-64 rounded-md max-[600px]:w-[150px] max-[600px]:h-[150px]"
          />
        </div>

        <div className="mt-8 text-center flex-1">
          <h3 className="text-3xl font-bold text-pink-600">Spread the Love</h3>
          <p className="text-gray-600 mt-2">
            "Love is in the air! Sign up now and find your special someone at
            GVP"
          </p>
          <p className="text-gray-600 mt-2">
            "A simple crush could lead to a beautiful relationship. Don't miss
            out!"
          </p>
          <p className="text-gray-600 mt-2">
            "Find your match, make a connection, and start a story worth
            telling."
          </p>
        </div>
      </div>
      {/*  */}

      <NavLink
        className="gradient_bg flex justify-center p-3 rounded-md mb-5 font-bold text-3xl"
        to={"/signup"}
      >
        Register Now
      </NavLink>

      <div className="flex flex-col items-center space-y-8">
        <h1>Features we added just for you!</h1>
        <div className="bg-[#1b1735] p-3 rounded-lg shadow-lg flex items-center space-x-3 w-[70vw] max-[1000px]:w-[90vw] max-[1000px]:flex-col-reverse">
          <div className="ml-2">
            <h2 className="text-3xl font-semibold text-gray-400 mb-2">
              Anonymous Messages
            </h2>

            <p className="text-gray-600">
              Share your thoughts and public confessions with your crush
              anonymously. No one will ever know it's you. Add replies and likes
              to messages to keep the conversation going.
            </p>
          </div>
          <img
            src={anonymousImage}
            alt="Anonymous Messages"
            className="min-[600px]:h-56 rounded-md max-[1000px]:mb-5 max-[600px]:w-[90%]"
          />
        </div>
        {/*  */}
        <div className="bg-[#1b1735] p-3 rounded-lg shadow-lg flex items-center space-x-5 w-[70vw] max-[1000px]:w-[90vw] max-[1000px]:flex-col">
          <img
            src={crushListImage}
            alt="Crush List"
            className="min-[600px]:h-56 rounded-md max-[1000px]:mb-5 max-[600px]:w-[90%]"
          />
          <div className="ml-2">
            <h2 className="text-3xl font-semibold text-gray-400 mb-2">
              Crush List
            </h2>

            <p className="text-gray-600">
              Add up to 3 people to your crush list. Update your crushes anytime
              from your dashboard and see who else is crushing on you.
            </p>
          </div>
        </div>
        {/*  */}
        <div className="bg-[#1b1735] p-3 rounded-lg shadow-lg flex items-center space-x-3 w-[70vw] max-[1000px]:w-[90vw] max-[1000px]:flex-col-reverse">
          <div className="ml-2">
            <h2 className="text-3xl font-semibold text-gray-400 mb-2">
              User Profiles
            </h2>

            <p className="text-gray-600">
              View profiles of all users on the app. Check out their crush
              counts, display pictures, and public messages. Find your potential
              match easily!
            </p>
          </div>
          <img
            src={profilesImage}
            alt="User profiles"
            className="min-[600px]:h-56 rounded-md max-[1000px]:mb-5 max-[600px]:w-[90%]"
          />
        </div>

        {/*  */}
        <div className="bg-[#1b1735] p-3 rounded-lg shadow-lg flex items-center space-x-5 w-[70vw] max-[1000px]:w-[90vw] max-[1000px]:flex-col">
          <img
            src={msgImage}
            alt="Messages"
            className="min-[600px]:h-56 rounded-md max-[1000px]:mb-5 max-[600px]:w-[90%]"
          />
          <div className="ml-2">
            <h2 className="text-3xl font-semibold text-gray-400 mb-2">
              Anonymous Messages to Crush
            </h2>

            <p className="text-gray-600">
              Send anonymous messages directly to your crush. Express your
              feelings without revealing your identity.
            </p>
          </div>
        </div>

        {/*  */}
        <div className="bg-[#1b1735] p-3 rounded-lg shadow-lg flex justify-between items-center space-x-3 w-[70vw] max-[1000px]:w-[90vw] max-[1000px]:flex-col-reverse">
          <div className="ml-2">
            <h2 className="text-3xl font-semibold text-gray-400 mb-2">
              Search Your Crush
            </h2>

            <p className="text-gray-600">
              Find your crush by searching their name or college mail ID. Get
              closer to making a connection.
            </p>
          </div>
          <img
            src={searchCrushImage}
            alt="Search"
            className="min-[600px]:h-56 rounded-md max-[1000px]:mb-5 max-[600px]:w-[90%]"
          />
        </div>

        <div className="bg-[#1b1735] p-3 rounded-lg shadow-lg flex items-center space-x-5 w-[70vw] max-[1000px]:w-[90vw] max-[1000px]:flex-col">
          <img
            src={notificationImage}
            alt="notification"
            className="min-[600px]:h-56 rounded-md max-[1000px]:mb-5 max-[600px]:w-[90%]"
          />
          <div className="ml-2">
            <h2 className="text-3xl font-semibold text-gray-400 mb-2">
              Mutual Crush Notification
            </h2>

            <p className="text-gray-600">
              If you and your crush have mutual feelings, both of you will be
              notified via email. Take the next step and start chatting!
            </p>
          </div>
        </div>
      </div>

      <div className="my-8 mt-20 text-center">
        <h3 className="text-2xl font-bold text-red-600">Important Note</h3>
        <p className="text-gray-600 mt-2">
          Please don't use the application to express anger or hatred towards
          each other. The application was developed for spreading love.
        </p>
        <p className="text-gray-600 mt-2">
          If you find any message disturbing or abusive, kindly report it to{" "}
          <a href="mailto:kittylove.team@gmail.com" className="text-blue-500">
            kittylove.team@gmail.com
          </a>{" "}
          with an image of the message.
        </p>
      </div>
    </div>
  );
};

export default HomeContainer;
