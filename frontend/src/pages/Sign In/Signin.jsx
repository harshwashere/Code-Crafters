/* eslint-disable no-unused-vars */
import "./signin.css";
import OtpInput from "otp-input-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from '../../store/useAuth'
import { toast } from 'react-toastify'
import { URL } from '../helper/helper'

export const Signin = () => {
  const [otp, setOtp] = useState("");
  const [emails, setEmails] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState({
    email: "",
    otps: "",
  });

  const navigate = useNavigate();

  const { storeTokenInLS } = useAuth();

  const onGetOTP = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const response = await fetch(`${URL}/api/otp`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ "email": emails })
      });

      if (response.ok) {

        await response.json()

        setUser({ email: emails });

        toast.success("OTP sent via Email");

      } else if (response.status === 404) {
        toast.error("Error sending OTP");
      } else if (response.status === 400) {
        toast.warn("User Doesn't Exist");
      }

      setShowOTP(true);
    } catch (error) {
      console.error('Error fetching OTP:', error);
    } finally {
      setLoading(false);
    }
  };


  const onOTPVerify = async (e) => {
    try {
      e.preventDefault()
      setLoading(true)

      const verifyData = await fetch(`${URL}/api/login`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ "otp": otp, "email": emails })
      })

      if (verifyData.ok) {
        const otpVerify = await verifyData.json()

        storeTokenInLS(otpVerify.token)
        setUser({ otps: otp })

        toast.success('Login Succesful')
        navigate('/')
      } else if (verifyData.status === 401) {
        toast.error("Invalid Credentials");
        console.error("Invalid Credentials");

      }

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
      <div className="mainSignInDiv">
        <div className="loginSection">
          <h1>Login with email</h1>
          {showOTP ? (
            <div className="otpSection">
              <form method="POST" onSubmit={onOTPVerify}>
                <label htmlFor="otp">Enter your OTP(One-Time-Password)</label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={4}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className="opt-container"
                />
                <button type="submit">
                  {loading && <div className="loadingPie"></div>}
                  <span>Verify OTP</span>
                </button>
              </form>
            </div>
          ) : (
            <div className="emailSection">
              <form method='POST' onSubmit={onGetOTP}>
                <label htmlFor="email">Enter Your Email</label>
                <input
                  type="email"
                  name="email"
                  value={emails}
                  onChange={(e) => setEmails(e.target.value)}
                  placeholder="example@example.com"
                  pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                  required
                />
                <button type="submit">
                  {loading && <div className="loadingPie"></div>}
                  <span>Get OTP</span>
                </button>
                <p>Or</p>
                <div className="googleLogin"><NavLink to={`${URL}/auth/google`} className="googleLink"><img src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" alt="" /> <p>Log In with Google</p></NavLink></div>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
