import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Layout from './../components/Layout/Layout';
import { useNavigate } from "react-router-dom";
import '../styles/MyProfile.css';
import { useAuth } from '../context/Auth'

const UserDetailsCard = ({ user, removeFromCrushlist }) => (
  <tr key={user._id}>
  <td>{user.name}</td>
  <td>{user.username}</td>
  <td>{user.gender}</td>
  <td>
    <button className="btn btn-danger" onClick={() => removeFromCrushlist(user._id)}>Remove</button>
  </td>
  </tr>
);


const Dashboard = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth()
  const [crushlist, setCrushlist] = useState([]);
  const [crushUsers, setCrushUsers] = useState([]);
  const [dms, setDms] = useState([]);
  const [isPrivate, setIsPrivate] = useState(false);

  useEffect(() => {
    const getDms = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API}/user/dms/${auth.user._id}`);
        setDms(data.dms || []);
        setIsPrivate(data.isPrivate);
        setCrushlist(data.crushlist || []);
      } catch (error) {
        console.log(error);
        toast.error(error.data.message);
      }
    }
    getDms();
  }, [])

  useEffect(() => {
    // Fetch user details based on the IDs in crushlist
    const fetchCrushUsers = async () => {
      try {
        const promises = crushlist.map(userId => {
          return axios.get(`${import.meta.env.VITE_API}/user/crush/${userId}`);
        }
        );
        const usersData = await Promise.all(promises);
        const users = usersData.map(res => res.data);
        setCrushUsers(users);
      } catch (error) {
        console.error("Error fetching crush users:", error);
        toast.error("Failed to fetch crush users");
      }
    };

    fetchCrushUsers();
  }, [crushlist]);

   // Function to toggle isPrivate status
   const toggleIsPrivate = async () => {
    try {
      const updatedIsPrivate = isPrivate === 1 ? 0 : 1; // Toggle the value
      await axios.put(`${import.meta.env.VITE_API}/user/private/${auth.user._id}`, { isPrivate: updatedIsPrivate });
      setIsPrivate(updatedIsPrivate); // Update the state
      toast.success("Privacy setting updated successfully");
    } catch (error) {
      console.error("Error updating privacy setting:", error);
      toast.error("Failed to update privacy setting");
    }
  };

  // Function to remove a user from crushlist
  const removeFromCrushlist = async (userId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API}/user/unlike/${userId}`);
      setCrushlist(crushlist.filter(id => id !== userId));
      toast.success("User removed from crushlist");
      navigate('/profiles/all');
    } catch (error) {
      console.error("Error removing user from crushlist:", error);
      toast.error("Failed to remove user from crushlist");
    }
  };

  return (
    <Layout>
      <div className="row mt-3">
        <div className="col-md-5 mt-2">
          <h2 className='title'>Your Crush List</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Gender</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {crushUsers.map(user => (
                <UserDetailsCard key={user._id} user={user} removeFromCrushlist={removeFromCrushlist}/>
              ))}
            </tbody>
            </table>
        </div>
        <div className="col-md-6 mt-2"> 
          <div className="dm-section">
                  <h3 className='title'>Messages for you</h3>
                  <div className="toggle-is-private mb-2">
                    <label>
                      <input
                        type="checkbox"
                        checked={isPrivate === true}
                        onChange={toggleIsPrivate}
                      />
                        Make Private (Others cannot see your dms in your public profile)
                    </label>
                  </div>
                  <div className="dms-list">
                    <ul className="list-group">
                        {dms.slice().reverse().map((dm, index) => (
                        <li key={index} className="list-group-item">{dm}</li>
                      ))}
                    </ul>
                  </div>
          </div>
        </div>
      </div>
    </Layout>
  )};

export default Dashboard;
