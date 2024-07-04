import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Layout from "../../Components/Layout/Layout";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [otp, setOtp] = useState("");
  const [otpScreen, setOtpScreen] = useState(false);
  const navigate = useNavigate();

  const sendOTP = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API}/user/forgot-password`,
        {
          email,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setOtpScreen(true);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      return toast.error("Password's didn't match!");
    }
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API}/user/forgot-password/verify`,
        { email, otp, password }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate(`/signin`);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  useEffect(() => {
    document.title = "Forgot Password @Kitty-Love 💕";
  }, []);

  return (
    <Layout>
      <div className="mt-[50px] flex flex-col justify-center items-center h-screen w-screen text-[white] font-semibold">
        <form
          onSubmit={handleSubmit}
          className="gradient_bg py-3 rounded-lg flex flex-col px-5"
        >
          <h1 className="-translate-y-10 text-3xl font-extrabold flex justify-center text_shadow text-center">
            Forgot Password
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
              <input
                value={password}
                type="password"
                placeholder="New password"
                className="bg-transparent outline-none placeholder:text-white text-xl py-2 border-b-2 my-2"
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                value={password2}
                type="password"
                placeholder="Confirm password"
                className="bg-transparent outline-none placeholder:text-white text-xl py-2 border-b-2 my-2"
                onChange={(e) => setPassword2(e.target.value)}
              />
            </div>
          ) : (
            <div className="flex">
              <input
                value={email}
                type="email"
                placeholder="Domain Email"
                className="bg-transparent w-full outline-none placeholder:text-white text-xl py-2 border-b-2 my-2"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
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
              onClick={sendOTP}
              className="bg-[#1a1635] px-3 py-2 rounded-md mt-5 mb-3"
            >
              Verify OTP
            </button>
          )}
        </form>
        <br />
        <p>
          Remembered your password?{" "}
          <Link to={"/signin"} className="font-bold">
            Signin
          </Link>{" "}
        </p>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
