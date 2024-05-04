import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import axios from "axios";

function StatusCard({ data }) {
  const [like, setlike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    setLikeCount(data.likes);
    setCommentCount(data.comments.length);
  }, [data]);

  const handleLike = async (like) => {
    if (like === true) {
      setlike(false);
      setLikeCount(likeCount - 1);
      let res = await axios.post(
        `${import.meta.env.VITE_API}/status/like/${data._id}/0`
      );
    } else if (like === false) {
      setlike(true);
      setLikeCount(likeCount + 1);
      let res = await axios.post(
        `${import.meta.env.VITE_API}/status/like/${data._id}/1`
      );
    }
  };

  // date and time formatter function
  function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) {
      return years === 1 ? "1 year ago" : `${years} years ago`;
    } else if (months > 0) {
      return months === 1 ? "1 month ago" : `${months} months ago`;
    } else if (days > 0) {
      return days === 1 ? "1 day ago" : `${days} days ago`;
    } else if (hours > 0) {
      return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
    } else if (minutes > 0) {
      return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
    } else {
      return "Just now";
    }
  }

  return (
    <div className="bg-[#1b1735] my-3 p-2 pb-3 px-3 rounded-md">
      <p className="font-semibold text-md my-2">{data.content}</p>
      {/* btns and createdAt */}
      <div className="flex justify-between items-end">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
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
            <p className="text-[10px]">{likeCount} likes</p>
          </div>
          <div className="flex items-center space-x-1">
            <CommentIcon fontSize="small" />
            <p className="text-[10px]">{commentCount} replies</p>
          </div>
        </div>
        <p className="text-[10px] text-right">{formatDate(data.createdAt)}</p>
      </div>
    </div>
  );
}

export default StatusCard;
