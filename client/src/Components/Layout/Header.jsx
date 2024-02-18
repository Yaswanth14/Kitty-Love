import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useAuth } from '../../context/Auth'
import { toast } from 'react-toastify'

const Header = () => {
  const [auth, setAuth] = useAuth();
  const handleSignout = () => {
    setAuth({
      ...auth, user: null, token: ""
    })
    localStorage.removeItem('auth')
    toast.success('Logout Successfull');
  }


  return (
    <>
       <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to='/' className="navbar-brand">Kitty-Love💕</Link>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to='/' className="nav-link">Home</NavLink>
            </li>
            {!auth.user ? (
              <>
              <li className="nav-item">
                <NavLink to='/signup' className="nav-link">Register</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to='/signin' className="nav-link">Login</NavLink>
              </li>
              </>
            ) : (
              <>
              <div className="nav-item">
                <NavLink to='/profiles/all' className="nav-link">Profiles</NavLink>
              </div>
              <div className="nav-item">
                <NavLink to='/profiles/dashboard' className="nav-link">Dashboard</NavLink>
              </div>
              <div className="nav-item">
                <NavLink to={`/profiles/myprofile/${auth?.user?.username}`} className="nav-link">Profile</NavLink>
              </div>
              <li className="nav-item">
                <NavLink onClick={handleSignout} to='/signin' className="nav-link">Logout</NavLink>
              </li>
              </>
            )
            }
          </ul>
          </div>
        </div>
    </nav>

    </>
  )
}

export default Header