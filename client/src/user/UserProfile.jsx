import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import '../styles/MyProfile.css';
import SendIcon from "@mui/icons-material/Send";

const UserProfile = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [crushcount, setCrushCount] = useState("");
  const [dms, setDms] = useState([]);
  const [newDm, setNewDm] = useState("");
  const [id, setId] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  useEffect(() => {
    const getSingleUser = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API}/user/profiles/${params.username}`
        );
        setName(data.user.name);
        setUsername(data.user.username);
        setBio(data.user.bio);
        setGender(data.user.gender);
        setCrushCount(data.user.crushcount);
        setId(data.user._id);
        setDms(data.user.dms || []);
        setIsPrivate(data.user.isPrivate);
      } catch (error) {
        console.log(error);
      }
    };

    getSingleUser();
    document.title = `${params.username} @Kitty-Love 💕`;
  }, [params.username]);

  const handleAddDm = async () => {
    try {
      if (newDm.trim() === "") {
        toast.error("DM cannot be empty");
        return;
      }
      const { data } = await axios.post(
        `${import.meta.env.VITE_API}/user/message/${username}`,
        {
          dm: newDm,
        }
      );
      setDms([...dms, newDm]);
      setNewDm("");
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.data.message);
    }
  };

  const handleAddToCrushList = async () => {
    try {
      await axios.put(`${import.meta.env.VITE_API}/user/like/${username}`);
      setCrushCount(crushcount + 1); // Assuming crushcount is incremented on successful addition
      toast.success("Added to crush list!");
      navigate("/profiles/dashboard");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <Layout>
      <div className="pt-[100px] flex h-[100vh] px-3 max-[800px]:flex-col">
        <div className="min-[800px]:border-r-2 max-[800px]:border-b-2 pb-5 border-[rgba(255,255,255,0.1)]">
          <div>
            <div className="flex flex-wrap items-center">
              <img
                src={`${import.meta.env.VITE_API}/user/profile-photo/${id}`}
                alt="profile photo"
                className="rounded-full m-2 h-[200px] w-[200px] max-[800px]:h-[100px] max-[800px]:w-[100px] object-cover"
              />
              <img
                src={`https://robohash.org/${username}?set=set4`}
                alt="Avatar"
                className="h-[200px] m-2 max-[800px]:h-[100px]"
              />
            </div>
          </div>
          <div className="text-white pl-1 pr-5 flex flex-col space-y-2">
            <h2 className="text-3xl">{name}</h2>
            <p className="text-xl text-[rgba(255,255,255,0.5)]">
              {/* <span>Username :</span>  */}
              {username}
            </p>
            <p className="bg-[#1b1735] p-3 rounded-md">
              {/* <span>Bio:</span>  */}
              {bio}
            </p>
            {/* <p>
              <span>Gender:</span> {gender}
            </p> */}
            <p>
              <span>Crush Count :</span> {crushcount}
            </p>

            <button
              className="gradient_bg font-semibold px-3 py-2 rounded-md"
              onClick={handleAddToCrushList}
            >
              Add to Crush List
            </button>
          </div>
        </div>
        <div className="text-white flex-1 p-3">
          <div>
            <h3 className="text-2xl mb-3">Direct Messages</h3>
            <div className="flex items-center mb-3">
              <input
                type="text"
                maxLength={180}
                placeholder="Enter your message"
                value={newDm}
                onChange={(e) => setNewDm(e.target.value)}
                className="flex-1 gradient_bg2 text-white placeholder:text-[rgba(255,255,255,0.5)] px-3 py-2 rounded-md font-semibold outline-none"
              />
              <button
                onClick={handleAddDm}
                className="rotate-[-30deg] mx-3 -translate-y-1"
              >
                <SendIcon />
              </button>
            </div>
            <div>
              {isPrivate ? (
                <p>Message received to this profile are private</p>
              ) : (
                <ul>
                  {dms
                    .slice()
                    .reverse()
                    .map((dm, index) => (
                      <li
                        key={index}
                        className="text-lg bg-[#1b1735] my-2 px-3 py-2 rounded-md"
                      >
                        {dm}
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserProfile;
