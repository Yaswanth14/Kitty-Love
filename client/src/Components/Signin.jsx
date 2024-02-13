import React from 'react';
import './ComponentStyles/Signin.css';
import Layout from './Layout/Layout';

const Signin= () => {
    return (
        <Layout>
        <div className='wrapper'>
            <form action="">
                <h1>Signin</h1>
                <div className='input-box'>
                    <input type="text" placeholder='Username' required/>
                </div>
                <div className='input-box'>
                    <input type='password' placeholder='Password' required/>
                </div>
                <div className='remember-forgot'>
                    <label><input type='checkbox'/>Remember me</label>
                    <a href='#'>Forgot Password?</a>
                </div>
                <button type="submit">Signin</button>
                <div className="register-link">
                    <p>Don't have an account? <a href='="#'>Register</a></p>
                </div>
            </form>
        </div>
        </Layout>
    );
}

export default Signin;