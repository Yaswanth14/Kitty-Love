import React from "react";

function ProfileSuggestionCard() {
  return (
    <div className="flex justify-between px-3 bg-[#1b1735] rounded-md py-3 items-center">
      <div className="flex space-x-3">
        <img
          src="https://robohash.org/test?set=set4"
          className="h-[70px] w-[70px]"
          alt=""
        />
        <div>
          <p>{"Full Name"}</p>
          <p className="text-sm font-light">{"username"}</p>
        </div>
      </div>
      <div>
        <a className="gradient_bg px-3 py-2 rounded-md font-semibold">
          View profile
        </a>
      </div>
    </div>
  );
}

export default ProfileSuggestionCard;
