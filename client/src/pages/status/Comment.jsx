import React, { useState, useEffect } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";

function Comment({ reply, userId }) {
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    setLikeCount(reply.likes ?? 0);
    setLike(reply.likedBy?.includes(userId) ?? false);
  }, [reply, userId]);

  const handleLike = async (like) => {
    try {
      if (like) {
        await axios.post(
          `${import.meta.env.VITE_API}/status/reply/like/${reply._id}/0`
        );
        setLike(false);
        setLikeCount(likeCount - 1);
      } else {
        await axios.post(
          `${import.meta.env.VITE_API}/status/reply/like/${reply._id}/1`
        );
        setLike(true);
        setLikeCount(likeCount + 1);
      }
    } catch (error) {
      console.error("Error updating like status:", error);
    }
  };

  return (
    <div className="text-sm font-light my-2 bg-[#1b1735] p-2 flex items-start justify-between rounded-md">
      <p className="">{reply.content}</p>
      <div className="flex flex-col items-center justify-center pr-2 pt-2 ml-auto">
        {like ? (
          <FavoriteIcon
            className="text-[#f84b4d] transform transition-transform duration-75 ease-linear hover:scale-150"
            onClick={() => handleLike(true)}
            fontSize="small"
          />
        ) : (
          <FavoriteBorderIcon
            onClick={() => handleLike(false)}
            fontSize="small"
          />
        )}
        <p className="text-[10px]">{likeCount}</p>
      </div>
    </div>
  );
}

export default Comment;
