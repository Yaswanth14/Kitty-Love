import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import Layout from './../components/Layout/Layout'
import { useNavigate, useParams } from "react-router-dom";
import '../styles/MyProfile.css'

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
        const {data} = await axios.get(`${import.meta.env.VITE_API}/user/profiles/${params.username}`);
        setEmail(data.user.email);
        setName(data.user.name)
        setUsername(data.user.username)
        setBio(data.user.bio)
        setGender(data.user.gender)
        setId(data.user._id)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleUser();
    //eslint-disable-next-line
  }, [])

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
        <div className="container">
            <h1 className="text-center my-5 title">Update User Profile</h1>
            <div className="title-card">
                <form onSubmit={handleUpdate}>
                    <div className="mb-3 text-center">
                        <label className="btn btn-outline-secondary col-md-4">Upload Photo 1mb
                            <input
                                type="file"
                                name="photo"
                                accept="image/*"
                                onChange={(e) => setPhoto(e.target.files[0])}
                                hidden
                            />
                        </label>
                    </div>
                    {photo ? (
                        <div className="mb-3">
                            <div className="text-center">
                                <img
                                    src={URL.createObjectURL(photo)}
                                    alt="profile_photo"
                                    height={"200px"}
                                    className="img img-responsive profile-img"
                                />
                            </div>
                        </div>
                      ) : (
                        <div className="mb-3">
                        <div className="text-center">
                          <img
                            src={`${import.meta.env.VITE_API}/user/profile-photo/${id}`}
                            alt="profile photo"
                            height={"180px"}
                            className="img img-responsive profile-img"
                          />
                          <img
                            src={`https://robohash.org/${username}?set=set4`}
                            alt="Avatar"
                            height={"200px"}
                            className="img img-responsive"
                          />
                        </div>
                        </div>
                      )}
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label className="form-label side-heading">Username</label>
                            <input
                                type="text"
                                value={username}
                                placeholder="Enter your username"
                                className="form-control"
                                readOnly
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label side-heading">Gender</label>
                            <select
                                className="form-select form-control"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                required
                            >
                                <option value={gender?gender:"Gender"}>{gender}</option>
                                <option value="female">Female</option>
                                <option value="male">Male</option>
                            </select>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6">
                          <label className="form-label side-heading">Name</label>
                          <input
                              type="text"
                              value={name}
                              maxLength={25}
                              placeholder="Enter your name"
                              className="form-control"
                              onChange={(e) => setName(e.target.value)}
                              required
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label side-heading">Email</label>
                          <input
                              type="text"
                              value={email}
                              placeholder="Enter your email"
                              className="form-control"
                              readOnly
                          />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label side-heading">Bio</label>
                        <input
                            type="text"
                            value={bio}
                            maxLength={50}
                            placeholder="Enter a short bio"
                            className="form-control"
                            onChange={(e) => setBio(e.target.value)}
                        />
                    </div>
                    <div className="mb-3 text-center">
                        <button type="submit" className="btn btn-primary">
                            Update Profile
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </Layout>
)



}

export default MyProfile