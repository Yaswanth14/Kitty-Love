import React from 'react'
import Layout from '../components/Layout/Layout'
import { Link } from 'react-router-dom'
import "../styles/Home.css"

const HomePage = () => {
  return (
    <Layout>
        <div className="container">
                <h1 className="text-center my-5">Kitty Love</h1>
                <p className="lead text-center">This Valentine's Day, we will help you express your kitty love.</p>
                <div className="row justify-content-center mt-5">
                    <div className="col-md-6 text-center">
                        <p className="h4">Login using domain mail id</p>
                    </div>
                </div>
                <div className="row justify-content-center mt-5">
                    <div className="col-md-6 text-center">
                        <p className="h4">Select your crushes</p>
                        <p>You can select upto a maximum of 3 crushes</p>
                    </div>
                </div>
                <div className="row justify-content-center mt-5">
                    <div className="col-md-6 text-center">
                        <p className="h4">Keep track of your crushes</p>
                        <p>The other person can send you a message in a secured and anonymous way</p>
                    </div>
                </div>
                <div className="row justify-content-center mt-5">
                    <div className="col-md-6 text-center">
                        <p className="h4">Connect with your kitty love</p>
                        <p>If there is a mutual crush, you'll be notified 😃</p>
                    </div>
                </div>
                <div className="row justify-content-center mt-5">
                    <div className="col-md-6 text-center">
                        <Link to="/signup" className="btn btn-primary">Get Started</Link>
                    </div>
                </div>
        </div>
    </Layout>
  )
}

export default HomePage