import "./signin.css";
import Navbar from "../../components/navbar/Navbar";
import OtpInput from "otp-input-react";
import { useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
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

  // console.log(user);

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

      if (response.status === 200) {

        const responseData = await response.json()

        console.log(responseData);

        setUser({ email: emails });

        toast.success("OTP Sent via Email");

      } else if (response.status === 401) {
        toast.error("Invalid Credentials");
      } else if (response.status === 400) {
        toast.warn("User Doesn't Exist");
      }
      console.log(response);
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
        body: JSON.stringify({ "otp": otp })
      })

      if (verifyData.ok) {
        const otpVerify = await verifyData.json()
        console.log(otpVerify);

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
      <Navbar />
      <div className="mainSignInDiv">
        <div className="loginImage">
          <img src="https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg" alt="" />
        </div>
        <div className="loginSection">
          <h1>Login</h1>
          {showOTP ? (
            <div className="otpSection">
              <form method="POST" onSubmit={onOTPVerify}>
                <label htmlFor="otp">Enter your OTP(One-Time-Password)</label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className="opt-container"
                />
                <button type="submit">
                  <CgSpinner size={20} />
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
                  {loading && <CgSpinner size={20} />}
                  <span>Get OTP</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
