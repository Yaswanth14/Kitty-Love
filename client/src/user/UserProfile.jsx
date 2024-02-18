import React, { useState, useEffect } from 'react';
import Layout from './../components/Layout/Layout';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../styles/MyProfile.css'

const UserProfile = () => {
    const params = useParams();
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [username, setUsername] = useState('');
    const [gender, setGender] = useState('');
    const [crushcount, setCrushCount] = useState('');
    const [dms, setDms] = useState([]);
    const [newDm, setNewDm] = useState('');
    const [id, setId] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);

    useEffect(() => {
        const getSingleUser = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API}/user/profiles/${params.username}`);
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
    }, [params.username]);

    const handleAddDm = async () => {
        try {
            if (newDm.trim() === '') {
                toast.error('DM cannot be empty');
                return;
            }
            const {data} = await axios.post(`${import.meta.env.VITE_API}/user/message/${username}`, {
                dm: newDm
            })
            setDms([...dms, newDm]);
            setNewDm('');
            toast.success(data.message);
        } catch (error) {
            console.log(error);
            toast.error(error.data.message);
        }
    };

    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 mt-5">
                        <div className="profile-info">
                            <h2 className='title'>{name}</h2>
                            <p><span className='side-heading'>Username:</span> {username}</p>
                            <p><span className='side-heading'>Bio:</span> {bio}</p>
                            <p><span className='side-heading'>Gender:</span> {gender}</p>
                            <p><span className='side-heading'>Crush Count:</span> {crushcount}</p>

                                <div className="mb-3">
                                    <div className="images">
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
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="dm-section">
                            <h3 className='title'>Direct Messages</h3>
                            <div className="add-dm">
                                <input
                                    type="text"
                                    maxLength={180}
                                    className="form-control mb-1"
                                    placeholder="Enter your message"
                                    value={newDm}
                                    onChange={(e) => setNewDm(e.target.value)}
                                />
                                <button className="btn btn-primary mb-2" onClick={handleAddDm}>Send</button>
                            </div>
                            <div className="dms-list">
                                {isPrivate ? (
                                    <p>Message recieved to this profile are private</p>
                                ) : (
                                    <ul className="list-group">
                                    {dms.slice().reverse().map((dm, index) => (
                                        <li key={index} className="list-group-item">{dm}</li>
                                    ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
    
};

export default UserProfile;
