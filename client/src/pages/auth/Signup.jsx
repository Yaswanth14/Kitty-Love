import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
// import "../../styles/AuthStyles.css";
import Layout from "../../Components/Layout/Layout";
import { useAuth } from "../../context/Auth";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [otpScreen, setOtpScreen] = useState(false);

  // Function to send OTP
  const sendOTP = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API}/user/signup`, {
        email,
      });
      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      // console.log(error);
      // toast.error(error.message);
      toast.error(error.response.data.message);
    }
  };

  // Form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API}/user/signup/verify`,
        { email, otp, password }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(`/profiles/myprofile/${res?.data?.user.username}`);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      // console.log(error);
      console.log(error.response.data.message);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  useEffect(() => {
    document.title = "Register @Kitty-Love 💕";
  }, []);

  return (
    <Layout>
      <div className="flex flex-col justify-center items-center h-screen w-screen text-[white] font-semibold">
        <form
          onSubmit={handleSubmit}
          className="gradient_bg py-3 rounded-lg flex flex-col px-5"
        >
          <h1 className="-translate-y-10 text-5xl font-extrabold flex justify-center text_shadow">
            Register
          </h1>

          {otpScreen ? (
            <div className="flex flex-col">
              <label className="text-center mb-3">
                Check your email for the OTP!
              </label>
              <input
                value={otp}
                type="text"
                placeholder="Enter OTP"
                className="bg-transparent outline-none placeholder:text-white text-xl py-2 border-b-2 my-2"
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
          ) : (
            <>
              <div>
                <input
                  value={email}
                  type="email"
                  placeholder="Domain Email"
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
                  placeholder="Create password"
                  className="bg-transparent outline-none placeholder:text-white text-xl py-2 border-b-2 my-2"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </>
          )}

          {otpScreen ? (
            <button
              type="submit"
              className="bg-[#1a1635] px-3 py-2 rounded-md mt-5 mb-3"
            >
              Submit
            </button>
          ) : (
            <button
              onClick={() => {
                sendOTP();
                if ((email !== "") & (password !== "")) {
                  setOtpScreen(true);
                }
              }}
              className="bg-[#1a1635] px-3 py-2 rounded-md mt-5 mb-3"
            >
              Verify OTP
            </button>
          )}
        </form>
        <br />
        <p>
          Already have an account? <Link to={"/signin"}>Signin</Link>{" "}
        </p>
      </div>
    </Layout>
  );
};

export default Signup;
