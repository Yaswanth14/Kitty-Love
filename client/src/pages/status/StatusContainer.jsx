import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import StatusCard from "./StatusCard";
import ProfileSuggestionCard from "./ProfileSuggestionCard";
import { useAuth } from "../../context/Auth";
import Loader from "../../Loader";

import Layout from "../../Components/Layout/Layout";

const StatusContainer = () => {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState([]);
  const [focussed, setfocussed] = useState(false);
  const [auth, setAuth] = useAuth();
  const [suggestions, setsuggestions] = useState([]);

  useEffect(() => {
    const getStatus = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API}/status/get`
        );
        const status = response.data.status;
        setStatus([...status].reverse());
      } catch (error) {
        console.log(error);
      }
    };

    getStatus();

    const getSuggestions = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API}/user/recent-users`
        );
        if (response.data.success) {
          setsuggestions(response.data.users);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getSuggestions();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API}/status/post`,
        {
          content: message,
        }
      );
      setStatus([response.data.status, ...status]);
      setMessage("");
      toast.success(response.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container mt-20">
        <div
          className="bg-[#1b1735] p-3 flex flex-1 flex-col rounded-lg transition-opacity duration-50 ease-linear fixed w-[70vw] max-[800px]:w-[90vw]
        left-[50%] -translate-x-[50%]"
          style={{
            border: `5px solid ${
              focussed ? "rgba(248, 75, 77, 0.9)" : "rgba(248, 75, 77, 0.2)"
            }`,
          }}
          onFocus={() => setfocussed(true)} // Set focus state to true when the div is focused
          onBlur={() => setfocussed(false)} // Set focus state to false when the div loses focus
          tabIndex={0}
        >
          <div className="flex items-center space-x-3">
            <form onSubmit={handleSubmit} className="flex-1 flex items-center">
              <input
                value={message}
                type="text"
                placeholder="Share your thoughts!"
                className="w-full text-lg bg-transparent outline-none h-[50px]"
                onChange={(e) => setMessage(e.target.value)}
              />
            </form>
            <button
              onClick={handleSubmit}
              className="gradient_bg px-3 py-2 font-extrabold text-white rounded-md"
            >
              Post
            </button>
          </div>
        </div>
        <div className="pt-[90px] flex min-[1050px]:space-x-5 min-[1050px]:px-5">
          <div className="flex-1">
            {status.length == 0 && <Loader text="Loading anonymous messages" />}
            {status?.map((status, index) => (
              <StatusCard data={status} key={index} userId={auth.user._id} />
            ))}
          </div>
          <div className="w-[400px] pt-3 max-[1050px]:hidden">
            {suggestions.length == 0 && <Loader text="Loading suggestions" />}
            {suggestions.map((e, i) => (
              <ProfileSuggestionCard key={i} data={e} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StatusContainer;
