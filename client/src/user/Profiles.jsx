import React, { useState, useEffect, useRef } from "react";
import Layout from "./../components/Layout/Layout";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import SearchIcon from "@mui/icons-material/Search";
// import "../styles/CardStyle.css";
import { useSearchParams } from "react-router-dom";

const Profiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [focussed, setfocussed] = useState(false);
  const [searchKey, setsearchKey] = useState("");

  useEffect(() => {
    fetchProfiles();
  }, [page]);

  const handleSubmit = async () => {
    try {
      const queryParams = new URLSearchParams();
      queryParams.set("q", searchKey);
      const response = await axios.get(
        `${import.meta.env.VITE_API}/user/search?${queryParams.toString()}`
      );
      console.log(response);
      setProfiles(response.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.title = "Profiles @Kitty-Love 💕";
  }, []);

  // Fetch profiles
  const fetchProfiles = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/user/profiles?page=${page}`
      );
      const { users, hasMore } = data;
      setProfiles((prevProfiles) =>
        prevProfiles ? [...prevProfiles, ...users] : users
      );
      setHasMore(hasMore);
    } catch (error) {
      console.error("Error fetching profiles:", error);
      toast.error("Something went wrong!");
    }
  };

  const loadMoreProfiles = () => {
    setPage(page + 1);
  };

  return (
    <Layout>
      <div className="pt-[90px]">
        {/*  */}
        <div className="flex justify-center">
          <div
            className="bg-[#1b1735] p-3 flex flex-col rounded-lg transition-opacity duration-50 ease-linear w-[70vw] max-[800px]:w-[90vw]"
            style={{
              border: `5px solid ${
                focussed ? "rgba(248, 75, 77, 0.9)" : "rgba(248, 75, 77, 0.2)"
              }`,
            }}
            onFocus={() => setfocussed(true)} // Set focus state to true when the div is focused
            onBlur={() => setfocussed(false)} // Set focus state to false when the div loses focus
            tabIndex={0}
          >
            <div className="flex items-center space-x-3">
              <form
                onSubmit={handleSubmit}
                className="flex-1 flex items-center"
              >
                <input
                  value={searchKey}
                  type="text"
                  placeholder="Search profiles"
                  className="w-full text-lg bg-transparent outline-none h-[50px]"
                  onChange={(e) => setsearchKey(e.target.value)}
                />
              </form>
              <button
                // onClick={handleSubmit}
                onClick={() => {
                  if (searchKey == "") {
                    toast.error("Type a name or email to search!");
                  } else {
                    handleSubmit();
                  }
                }}
                className="gradient_bg w-10 h-10 font-extrabold text-white rounded-full"
              >
                <SearchIcon />
              </button>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="flex flex-wrap p-2 items-stretch justify-evenly">
          {profiles?.map((user, index) => (
            <Link to={`/profile/${user.username}`} key={user._id}>
              <div className="bg-[#1b1735] shadow-[rgba(248,75,77,1)] shadow-md m-3 rounded-lg px-4 py-4 flex flex-col items-center space-y-2 h-[400px]">
                <p>
                  <span className="text-[rgba(248,75,77,1)]">
                    {user.username}
                  </span>{" "}
                  <span className="text-[rgba(255,255,255,0.5)]">
                    {user.gender ? ", " + user.gender : ""}
                  </span>
                </p>
                <div className="h-[250px] w-[250px] rounded-full p-5">
                  <img
                    src={
                      user.hasphoto
                        ? `${import.meta.env.VITE_API}/user/profile-photo/${
                            user._id
                          }`
                        : `https://robohash.org/${user.username}?set=set4`
                    }
                    alt={user.gender}
                  />
                </div>
                <div className="flex flex-col items-center">
                  <h3 className="text-[white] text-xl">{user.name}</h3>
                  <p className="text-[rgba(255,255,255,0.5)]">"{user.bio}"</p>
                  {/* <button>{user.gender ? user.gender : "unknown"}</button> */}
                </div>
              </div>
            </Link>
          ))}
        </div>
        {hasMore && <button onClick={loadMoreProfiles}>Load More</button>}
      </div>
    </Layout>
  );
};

export default Profiles;
