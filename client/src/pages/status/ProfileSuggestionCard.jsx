import React from "react";

import { NavLink } from "react-router-dom";

function ProfileSuggestionCard({ data }) {
  return (
    <div className="flex justify-between px-3 bg-[#1b1735] rounded-md py-3 items-center my-2">
      <div className="flex space-x-3">
        <img
          src={
            data.hasphoto == true
              ? `${import.meta.env.VITE_API}/user/profile-photo/${data._id}`
              : `https://robohash.org/${data.username}?set=set4`
          }
          className="h-[70px] w-[70px] rounded-full object-cover"
          alt=""
        />

        <div className="w-[100px]">
          <p>{data.name}</p>
          <p className="text-sm font-light">{data.username}</p>
        </div>
      </div>
      <div>
        <NavLink
          to={`/profile/${data.username}`}
          className="gradient_bg px-3 py-2 rounded-md font-semibold"
        >
          View profile
        </NavLink>
      </div>
    </div>
  );
}

export default ProfileSuggestionCard;
