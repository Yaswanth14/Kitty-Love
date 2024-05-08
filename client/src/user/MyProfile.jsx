import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Layout from "./../components/Layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
// import '../styles/MyProfile.css'

const MyProfile = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");

  const getSingleUser = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/user/profiles/${params.username}`
      );
      setEmail(data.user.email);
      setName(data.user.name);
      setUsername(data.user.username);
      setBio(data.user.bio);
      setGender(data.user.gender);
      setId(data.user._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleUser();
    //eslint-disable-next-line
    document.title = "My profile @Kitty-Love 💕";
  }, []);

  //create product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const userData = new FormData();
      userData.append("name", name);
      userData.append("gender", gender);
      userData.append("bio", bio);
      if (photo) {
        userData.append("photo", photo);
        userData.append("hasphoto", true); // Update hasphoto state
      }
      const data = await axios.put(
        `${import.meta.env.VITE_API}/user/update/${id}`,
        userData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        navigate("/profiles/all");
      }
    } catch (error) {
      console.log(error.response.data.message);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <Layout>
      <div className="pt-[90px]">
        <h1 className="text-center text-white font-semibold text-2xl mt-3">
          Update your profile
        </h1>
        <div className="bg-[#1b1735] my-3 mx-10 p-5 rounded-md flex flex-col items-center">
          <form onSubmit={handleUpdate}>
            <div className="flex flex-col items-center space-y-3 my-3">
              {photo ? (
                <div>
                  <div>
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="profile_photo"
                      height={"200px"}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex flex-wrap justify-center">
                    <img
                      src={`${
                        import.meta.env.VITE_API
                      }/user/profile-photo/${id}`}
                      alt="profile photo"
                      // height={"200px"}
                      className="h-[200px] rounded-full m-1"
                    />
                    <img
                      src={`https://robohash.org/${username}?set=set4`}
                      alt="Avatar"
                      className="h-[200px] m-1"
                    />
                  </div>
                </div>
              )}
              <div>
                <label className="text-black bg-white py-2 px-3 rounded font-semibold">
                  Change picture
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
            </div>

            {/* <div className=""> */}
            <div className="flex flex-col items-center">
              <div className="flex flex-col items-end space-y-3">
                <div>
                  <label className="text-[rgba(250,250,250,0.5)]">
                    Username
                  </label>
                  <input
                    type="text"
                    className="bg-transparent w-[200px] pl-1 text-white font-normal ml-3 outline-none placeholder:text-white text-xl my-2"
                    value={username}
                    placeholder="Enter your username"
                    readOnly
                  />
                </div>
                <div>
                  <label className="text-[rgba(250,250,250,0.5)]">Email</label>
                  <input
                    className="bg-transparent w-[200px] pl-1 text-white font-normal ml-3 outline-none placeholder:text-white text-xl my-2"
                    type="text"
                    value={email}
                    placeholder="Enter your email"
                    readOnly
                  />
                </div>
                <div>
                  <label className="text-[rgba(250,250,250,0.5)]">Gender</label>
                  <select
                    className="bg-transparent w-[200px] text-white font-normal ml-3 outline-none placeholder:text-white text-xl my-2"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                  >
                    <option
                      value={gender ? gender : "Gender"}
                      className="text-black"
                    >
                      {gender}
                    </option>
                    <option value="female" className="text-black">
                      Female
                    </option>
                    <option value="male" className="text-black">
                      Male
                    </option>
                  </select>
                </div>
                {/* </div> */}
                {/* <div> */}
                <div>
                  <label className="text-[rgba(250,250,250,0.5)]">Name</label>
                  <input
                    className="bg-transparent w-[200px] pl-1 text-white font-normal ml-3 outline-none placeholder:text-white text-xl my-2"
                    type="text"
                    value={name}
                    maxLength={25}
                    placeholder="Enter your name"
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                {/* </div> */}
                <div>
                  <label className="text-[rgba(250,250,250,0.5)]">Bio</label>
                  <input
                    className="bg-transparent w-[200px] pl-1 text-white font-normal ml-3 outline-none placeholder:text-white text-xl my-2"
                    type="text"
                    value={bio}
                    maxLength={50}
                    placeholder="Enter a short bio"
                    onChange={(e) => setBio(e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-3">
                <button
                  type="submit"
                  className="gradient_bg text-white font-semibold px-3 py-2 rounded-md"
                >
                  Update Profile
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default MyProfile;
