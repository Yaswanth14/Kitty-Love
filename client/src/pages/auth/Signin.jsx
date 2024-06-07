import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
// import "../../styles/AuthStyles.css"
import { useAuth } from "../../context/Auth";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();

  // Form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API}/user/signin`, {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/profiles/all");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(res.data.message);
    }
  };

  useEffect(() => {
    document.title = "Login @Kitty-Love 💕";
  }, []);

  return (
    <Layout>
      <div className="flex flex-col justify-center items-center h-screen w-screen text-[white] font-semibold">
        <form
          onSubmit={handleSubmit}
          className="gradient_bg py-3 rounded-lg flex flex-col px-5"
        >
          <h1 className="-translate-y-10 text-5xl font-extrabold flex justify-center text_shadow">
            LOGIN
          </h1>
          <div>
            {/* <label>email</label> */}
            <input
              value={email}
              type="email"
              placeholder="Email"
              className="bg-transparent outline-none placeholder:text-white text-xl py-2 border-b-2 my-2"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            {/* <label>Password</label> */}
            <input
              value={password}
              type="password"
              placeholder="Password"
              className="bg-transparent outline-none placeholder:text-white text-xl py-2 border-b-2 my-2"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-[#1a1635] px-3 py-2 rounded-md mt-5 mb-3"
          >
            Login
          </button>
        </form>

        <br />
        <p>
          Don't have an account? <Link to={"/signup"}>Signup</Link>
        </p>
      </div>
    </Layout>
  );
};

export default Signin;
