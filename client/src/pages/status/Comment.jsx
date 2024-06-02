import React, { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

function Comment({ reply }) {
  const [like, setlike] = useState(false);

  return (
    <div className="text-sm font-light my-2 bg-[#1b1735] p-2 flex items-start justify-between rounded-md">
      <p className="">{reply.content}</p>
      <div className="flex flex-col items-center justify-center pr-2 pt-2 ml-auto">
        {like ? (
          <FavoriteIcon
            className="text-[#f84b4d] transform transition-transform duration-75 ease-linear hover:scale-150"
            // onClick={() => handleLike(true)}
            fontSize="small"
          />
        ) : (
          <FavoriteBorderIcon
            // onClick={() => handleLike(false)}
            fontSize="small"
          />
        )}
        <p className="text-[10px]">{0}</p>
      </div>
    </div>
  );
}

export default Comment;
