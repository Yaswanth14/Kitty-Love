import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

function Loader({ text }) {
  return (
    <div className="w-inherit flex flex-col items-center justify-center translate-y-5 p-3">
      {text && <p className="font-semibold mb-3">{text}</p>}
      <CircularProgress className="text-white" />
    </div>
  );
}

export default Loader;
