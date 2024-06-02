import React, { useEffect, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import Comment from "./Comment";
import axios from "axios";

function CommentsBox({ msg, postId }) {
  const [replies, setReplies] = useState([]);
  const [newReply, setNewReply] = useState("");

  useEffect(() => {
    const fetchReplies = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API}/status/replies/${postId}`
        );
        if (response.data.success) {
          setReplies(response.data.replies);
        }
      } catch (error) {
        console.error("Error fetching replies:", error);
      }
    };

    fetchReplies();
  }, [postId]);

  const handleSubmit = async () => {
    if (newReply.trim() === "") return;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API}/status/reply/${postId}`,
        { reply: newReply }
      );
      if (response.data.success) {
        setReplies([...replies, response.data.reply]);
        setNewReply("");
      }
    } catch (error) {
      console.error("Error posting reply:", error);
    }
  };

  return (
    <div className="mt-3">
      <div className="flex items-center justify-between space-x-2">
        <input
          type="text"
          placeholder={`replying to "${msg}..."`}
          className="w-full text-md bg-[#151128] outline-none rounded-md px-3 py-2"
          value={newReply}
          onChange={(e) => setNewReply(e.target.value)}
        />
        <div>
          <button
            onClick={handleSubmit}
            className="gradient_bg font-extrabold text-white rounded-full w-[40px] h-[40px] flex justify-center items-center"
          >
            <SendIcon className="rotate-[-45deg]" fontSize="small" />
          </button>
        </div>
      </div>
      <div className="my-2 bg-[#151128] py-2 px-3 rounded-md overflow-y-scroll max-h-[300px]">
        {replies.length > 0 ? (
          replies.map((reply) => <Comment key={reply._id} reply={reply} />)
        ) : (
          <p className="text-center text-gray-500">
            No one commented on this post yet
          </p>
        )}
      </div>
    </div>
  );
}

export default CommentsBox;
