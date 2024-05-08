import React, { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/Auth";
import { toast } from "react-toastify";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Header = () => {
  const location = useLocation();
  const [path, setpath] = useState(location.pathname);
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

  useEffect(() => {
    setpath(location.pathname);
  }, [location]);

  return (
    <>
      <nav
        className="w-screen fixed top-0 gradient_bg2 text-black"
        style={{ zIndex: 9999 }}
      >
        <div className="flex h-[70px]">
          <div className="flex items-center justify-between w-screen px-5 max-[1000px]:px-2">
            {/* */}
            <div className="min-[1000px]:hidden absolute right-0 flex items-center justify-center">
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
              <li
                className={
                  path == "/"
                    ? "border-b-2 px-2 py-1 rounded-t-md"
                    : "opacity-80 hover:bg-[#ffffff45] hover:opacity-100 px-2 py-1 rounded-md"
                }
              >
                <NavLink to="/">Home</NavLink>
              </li>
              {!auth.user ? (
                <>
                  <li
                    className={
                      path == "/signup"
                        ? "border-b-2 px-2 py-1 rounded-t-md"
                        : "opacity-80 hover:bg-[#ffffff45] hover:opacity-100 px-2 py-1 rounded-md"
                    }
                  >
                    <NavLink to="/signup">Register</NavLink>
                  </li>
                  <li
                    className={
                      path == "/signin"
                        ? "border-b-2 px-2 py-1 rounded-t-md"
                        : "opacity-80 hover:bg-[#ffffff45] hover:opacity-100 px-2 py-1 rounded-md"
                    }
                  >
                    <NavLink to="/signin">Login</NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li
                    className={
                      path == "/profiles/all"
                        ? "border-b-2 px-2 py-1 rounded-t-md"
                        : "opacity-80 hover:bg-[#ffffff45] hover:opacity-100 px-2 py-1 rounded-md"
                    }
                  >
                    <NavLink to="/profiles/all">Profiles</NavLink>
                  </li>
                  <li
                    className={
                      path == "/profiles/dashboard"
                        ? "border-b-2 px-2 py-1 rounded-t-md"
                        : "opacity-80 hover:bg-[#ffffff45] hover:opacity-100 px-2 py-1 rounded-md"
                    }
                  >
                    <NavLink to="/profiles/dashboard">Dashboard</NavLink>
                  </li>
                  <li
                    className={
                      path.includes("/profiles/myprofile/")
                        ? "border-b-2 px-2 py-1 rounded-t-md"
                        : "opacity-80 hover:bg-[#ffffff45] hover:opacity-100 px-2 py-1 rounded-md"
                    }
                  >
                    <NavLink to={`/profiles/myprofile/${auth?.user?.username}`}>
                      Profile
                    </NavLink>
                  </li>
                  <li className="opacity-80 hover:bg-[#ffffff45] hover:opacity-100 px-2 py-1 rounded-md">
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
              className="flex space-y-3 text-2xl text-white font-semibold fixed bg-[#fd2fa6] flex-col items-end justify-start p-3 pl-7 rounded-bl-md right-0
            "
            >
              <li
                className={
                  path == "/"
                    ? "border-b-2 px-2 py-1 rounded-t-md"
                    : "opacity-80 px-2 py-1 rounded-md"
                }
              >
                <NavLink to="/">Home</NavLink>
              </li>
              {!auth.user ? (
                <>
                  <li
                    className={
                      path == "/signup"
                        ? "border-b-2 px-2 py-1 rounded-t-md"
                        : "opacity-80 px-2 py-1 rounded-md"
                    }
                  >
                    <NavLink to="/signup">Register</NavLink>
                  </li>
                  <li
                    className={
                      path == "/signin"
                        ? "border-b-2 px-2 py-1 rounded-t-md"
                        : "opacity-80 px-2 py-1 rounded-md"
                    }
                  >
                    <NavLink to="/signin">Login</NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li
                    className={
                      path == "/profiles/all"
                        ? "border-b-2 px-2 py-1 rounded-t-md"
                        : "opacity-80 px-2 py-1 rounded-md"
                    }
                  >
                    <NavLink to="/profiles/all">Profiles</NavLink>
                  </li>
                  <li
                    className={
                      path == "/profiles/dashboard"
                        ? "border-b-2 px-2 py-1 rounded-t-md"
                        : "opacity-80 px-2 py-1 rounded-md"
                    }
                  >
                    <NavLink to="/profiles/dashboard">Dashboard</NavLink>
                  </li>
                  <li
                    className={
                      path.includes("/profiles/myprofile/")
                        ? "border-b-2 px-2 py-1 rounded-t-md"
                        : "opacity-80 px-2 py-1 rounded-md"
                    }
                  >
                    <NavLink to={`/profiles/myprofile/${auth?.user?.username}`}>
                      Profile
                    </NavLink>
                  </li>
                  <li className="opacity-80 px-2 py-1 rounded-md">
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
