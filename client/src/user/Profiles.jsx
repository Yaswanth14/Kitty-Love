import React, {useState, useEffect} from 'react'
import Layout from './../components/Layout/Layout';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify'
import "../styles/CardStyle.css"

const Profiles = () => {

  const [profiles, setProfiles] = useState([]);
  
  // Fetch all profiles
  const getAllProfiles = async () => {
    try {
      const {data} = await axios.get(`${import.meta.env.VITE_API}/user/profiles`);
      setProfiles(data.users);

    } catch (error) {
      console.log(error);
      toast.error('Something went wrong!');
    }
  } 

  useEffect(() => {
    getAllProfiles();
  }, []);

  return (
    <Layout>
        <div className='container'>
    <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4'>
            {profiles?.map((user) => (
                <Link className='user-link col' to={`/profile/${user.username}`} key={user._id}>
                    <div className="card">
                    <p className='card-text username'>{user.username}, {user.gender}</p>
                        <img 
                            src={user.hasphoto ? `${import.meta.env.VITE_API}/user/profile-photo/${user._id}` : `https://robohash.org/${user.username}?set=set4`}
                            className="card-img-top" alt={user.gender} />
                        <div className="card-body">
                            <h5 className="card-title">{user.name}</h5>
                            <p className="card-text">{user.bio}</p>
                            <button href="#" className="btn btn-primary">{user.gender?user.gender:"unknown"}</button>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    </div>

    </Layout>
  );
}

export default Profiles