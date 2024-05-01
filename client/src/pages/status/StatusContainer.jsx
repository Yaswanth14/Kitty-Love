import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import StatusCard from "./StatusCard";

const StatusContainer = () => {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState([]);
  const [focussed, setfocussed] = useState(false);

  useEffect(() => {
    const getStatus = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API}/status/get`
        );
        const status = response.data.status;
        // console.log(status);
        setStatus([...status]);
      } catch (error) {
        console.log(error);
      }
    };

    getStatus();
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
      toast.success(response.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
      <div className="pt-[90px]">
        {status?.map((status, index) => (
          <StatusCard data={status} key={index} />
        ))}
      </div>
    </div>
  );
};

export default StatusContainer;
