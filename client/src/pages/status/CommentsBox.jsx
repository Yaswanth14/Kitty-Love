import React from "react";
import SendIcon from "@mui/icons-material/Send";
import Comment from "./Comment";

function CommentsBox({ msg }) {
  return (
    <div className="mt-3">
      <div className="flex items-center justify-between space-x-2">
        <input
          type="text"
          placeholder={`replying to "${msg}..."`}
          className="w-full text-md bg-[#151128] outline-none rounded-md px-3 py-2"
        />

        <div>
          <button
            // onClick={handleSubmit}
            className="gradient_bg font-extrabold text-white rounded-full w-[40px] h-[40px] flex justify-center items-center"
          >
            <SendIcon className="rotate-[-45deg]" fontSize="small" />
          </button>
        </div>
      </div>
      {/* prev comments */}
      <div className="my-2 bg-[#151128] py-2 px-3 rounded-md overflow-y-scroll max-h-[300px]">
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
      </div>
    </div>
  );
}

export default CommentsBox;
