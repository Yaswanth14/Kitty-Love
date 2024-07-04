import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/HomePage";
import Signup from "./pages/auth/Signup";
import Signin from "./pages/auth/Signin";
import ForgotPassword from "./pages/auth/ForgotPassowrd";
import PageNotFound from "./pages/PageNotFound";
import PrivateRoute from "./Components/Routes/Private";
import Profiles from "./user/Profiles";
import Dashboard from "./user/Dashboard";
import MyProfile from "./user/MyProfile";
import UserProfile from "./user/UserProfile";

function App() {
  return (
    <>
      <ToastContainer
        position="bottom-left"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition:Bounce
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profiles" element={<PrivateRoute />}>
          <Route path="all" element={<Profiles />} />
          <Route path="myprofile/:username" element={<MyProfile />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route path="profile/:username" element={<UserProfile />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/forgotpass" element={<ForgotPassword />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
