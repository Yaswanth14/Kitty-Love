import React, { useState, useEffect, useRef } from "react";
import Layout from "./../components/Layout/Layout";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
// import "../styles/CardStyle.css";

const Profiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    fetchProfiles();
  }, [page]);

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
        <div className="flex flex-wrap p-5 items-stretch justify-evenly">
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
