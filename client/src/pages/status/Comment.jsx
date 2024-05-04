import React, { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

function Comment() {
  const [like, setlike] = useState(false);

  return (
    <div className="text-sm font-light my-2 bg-[#1b1735] p-2 flex items-start space-x-1 rounded-md">
      <p className="">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. In esse,
        similique itaque illum ducimus asperiores sit laudantium, obcae
      </p>
      <div className="flex flex-col items-center justify-center pr-2 pt-2">
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
