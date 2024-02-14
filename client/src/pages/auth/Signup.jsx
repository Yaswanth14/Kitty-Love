import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import "../../styles/AuthStyles.css"
import Layout from '../../components/Layout/Layout'
import { useAuth } from '../../context/Auth'

const Signup = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [otp, setOtp] = useState("")
    const navigate = useNavigate()
    const [auth, setAuth] = useAuth()


    // Function to send OTP
    const sendOTP = async () => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_API}/user/signup`, { email });
            if (res.data.success) {
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    // Form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${import.meta.env.VITE_API}/user/signup/verify`, {email, otp, password});
            if(res.data.success){
                toast.success(res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                })
                localStorage.setItem('auth', JSON.stringify(res.data))
                setTimeout(() => {
                    navigate(`/profiles/myprofile/${auth?.user?.username}`)
                }, 1000);
            } else{
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error.response.data.message);
            if (error.response && error.response.data) {
              toast.error(error.response.data.message);
            } else {
              toast.error("Something went wrong");
            }
        }
    }
    
  return (
    <Layout>
        <div className="form-container">
        <form onSubmit={handleSubmit}>
            <h4 className="title">Register</h4>
            <div className="mb-2">
                <span><label className="form-label">Email</label><button id='otp-button' type="button" onClick={sendOTP}>Verify</button></span>
                <input value={email} type="email" placeholder='sample@xyz.com' className="form-control"
                onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="mb-2">
                <label className="form-label">Password</label>
                <input value={password} type="password" placeholder='secret' className="form-control" 
                onChange={(e)=>setPassword(e.target.value)} />
            </div>
            <div className="mb-2">
                <label className="form-label">Otp</label>
                <input value={otp} type="text" placeholder='12345' className="form-control"
                onChange={(e) => setOtp(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>

        </div>
    </Layout>
  )
}

export default Signup