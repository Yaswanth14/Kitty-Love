import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/Auth";
import { toast } from "react-toastify";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [mobNav, setmobNav] = useState(false);
  const handleSignout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfull");
  };

  return (
    <>
      <nav
        className="w-screen fixed top-0 gradient_bg2 text-black"
        style={{ zIndex: 9999 }}
      >
        <div className="flex h-[70px]">
          <div className="flex items-center justify-between w-screen px-5 max-[1000px]:px-2">
            {/* */}
            <div className="min-[1000px]:hidden absolute right-5 flex items-center justify-center">
              {mobNav ? (
                <CloseIcon
                  className="absolute right-3 text-white cursor-pointer"
                  fontSize="large"
                  onClick={() => setmobNav(false)}
                />
              ) : (
                <MenuIcon
                  className="absolute right-3 text-white cursor-pointer"
                  fontSize="large"
                  onClick={() => setmobNav(true)}
                />
              )}
            </div>

            <Link
              to="/"
              className="flex bg-white px-3 py-2 rounded-md max-[1000px]:-translate-x-7"
            >
              <h1 className="text-4xl font-bold text-[rgba(253,47,166,1)]">
                Kitty-
              </h1>
              <h1 className="text-4xl font-bold text-[rgba(248,75,77,1)]">
                Love💕
              </h1>
            </Link>
            <ul
              className="flex space-x-5 text-2xl text-white font-semibold max-[1000px]:hidden
            "
            >
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              {!auth.user ? (
                <>
                  <li>
                    <NavLink to="/signup">Register</NavLink>
                  </li>
                  <li>
                    <NavLink to="/signin">Login</NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink to="/profiles/all">Profiles</NavLink>
                  </li>
                  <li>
                    <NavLink to="/profiles/dashboard">Dashboard</NavLink>
                  </li>
                  <li>
                    <NavLink to={`/profiles/myprofile/${auth?.user?.username}`}>
                      Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink onClick={handleSignout} to="/signin">
                      Logout
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
        {/*  */}
        {mobNav && (
          <div>
            <ul
              className="flex space-y-3 text-2xl text-white font-semibold h-[calc(100vh-90px)] w-screen fixed gradient_bg flex-col items-center justify-center
            "
            >
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              {!auth.user ? (
                <>
                  <li>
                    <NavLink to="/signup">Register</NavLink>
                  </li>
                  <li>
                    <NavLink to="/signin">Login</NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink to="/profiles/all">Profiles</NavLink>
                  </li>
                  <li>
                    <NavLink to="/profiles/dashboard">Dashboard</NavLink>
                  </li>
                  <li>
                    <NavLink to={`/profiles/myprofile/${auth?.user?.username}`}>
                      Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink onClick={handleSignout} to="/signin">
                      Logout
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </nav>
    </>
  );
};

export default Header;
