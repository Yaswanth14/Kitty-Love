import React, { useState, useEffect, useRef } from 'react';
import Layout from './../components/Layout/Layout';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import "../styles/CardStyle.css";

const Profiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [fetchedIds, setFetchedIds] = useState([]);
  const loader = useRef(null);

  // Fetch profiles
  const fetchProfiles = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API}/user/profiles?page=${page}`);
      const newProfiles = data.users.filter(profile => !fetchedIds.includes(profile._id));
      if (newProfiles.length === 0) {
        setHasMore(false);
      } else {
        setProfiles(prevProfiles => [...prevProfiles, ...newProfiles]);
        setPage(prevPage => prevPage + 1);
        setFetchedIds(prevIds => [...prevIds, ...newProfiles.map(profile => profile._id)]);
      }
    } catch (error) {
      console.error("Error fetching profiles:", error);
      toast.error('Something went wrong!');
    }
  };

  // Intersection observer to trigger fetchProfiles when loader is visible
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        fetchProfiles();
      }
    }, { threshold: 1 });

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [hasMore]);

  useEffect(() => {
    fetchProfiles();
  }, []);

  return (
    <Layout>
      <div className='container'>
        <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4'>
          {profiles?.map((user, index) => (
            <Link className='user-link col' to={`/profile/${user.username}`} key={user._id}>
              <div className="card">
                <p className='card-text username'>{user.username}, {user.gender}</p>
                <img
                  src={user.hasphoto ? `${import.meta.env.VITE_API}/user/profile-photo/${user._id}` : `https://robohash.org/${user.username}?set=set4`}
                  className="card-img-top" alt={user.gender} />
                <div className="card-body">
                  <h5 className="card-title">{user.name}</h5>
                  <p className="card-text">{user.bio}</p>
                  <button href="#" className="btn btn-primary">{user.gender ? user.gender : "unknown"}</button>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {hasMore && <div ref={loader}></div>}
      </div>
    </Layout>
  );
}

export default Profiles;
