import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const StatusContainer = () => {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState([]);

  useEffect(() => {
    const getStatus = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API}/status/get`
        );
        const status = response.data.status;
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
      console.log("submit clicked");
      setStatus([response.status, ...status]);
      toast.success(response.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-20">
      <div className="bg-[#1b1735] p-3 flex flex-1 flex-col">
        <div className="flex items-center space-x-3">
          <form onSubmit={handleSubmit} className="flex-1 flex items-center">
            <textarea
              value={message}
              type="text"
              placeholder="inki pinki ponki"
              className="w-full text-lg bg-transparent outline-none h-[30px]"
              onChange={(e) => setMessage(e.target.value)}
            />
          </form>
          <button
            onClick={handleSubmit}
            className="gradient_bg text-white px-3 py-2 font-extrabold text-white rounded-md"
          >
            Post
          </button>
        </div>
      </div>
      <h1 className="lead text-center">This is status container</h1>
      <ul>
        {status?.map((status, index) => (
          <li>
            {index}. {status.content} - {status.username}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StatusContainer;
