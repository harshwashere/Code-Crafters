/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from 'axios'
import './AdminLogin.css'
import { URL } from '../Helper/Helper'
import { toast } from 'react-toastify'
import useAuth from "../../auth/useAuth";
import { useNavigate } from 'react-router-dom'
import OtpInput from "otp-input-react";

const AdminLogin = () => {
    const [step, setStep] = useState(1); // Step 1: Login, Step 2: OTP
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');

    const navigate = useNavigate();

    const { storeTokenInLS } = useAuth();

    const handleLogin = async (e) => {
        try {
            e.preventDefault()

            const response = await toast.promise(axios.post(`${URL}/admin/getotp`,
                {
                    "email": email,
                    "password": password
                }, {
                headers: {
                    "Content-Type": "application/json"
                },
            }), {
                pending: 'We are verifying your details',
                success: 'Verifed!! 👌 OTP has been sent via email',
            })

            if (response.status === 200) {
                setEmail(email)

                setPassword(password)
            }

            setStep(2)
        } catch (error) {
            console.error(error)
        }
    }

    const handleOtpSubmit = async (e) => {
        try {
            e.preventDefault();

            const response = await axios.post(`${URL}/admin/verifyotp`, {
                otp: otp,
                email: email
            },
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                });

            if (response.status === 200) {
                storeTokenInLS(response.data.token);
                setOtp(otp);
                toast.success('Login successfull!! 👌')
                navigate('/menu');
            } else if(response.status === 404) {
                toast.error('Invalid OTP')
            } else if(response.status === 400) {
                toast.error('OTP is expired')
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    };


    return (
        <div className="login-container">
            <h2>Admin Login</h2>

            {step === 1 ? (
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="login-btn">Verify Deatils</button>
                </form>
            ) : (
                <form onSubmit={handleOtpSubmit}>
                    <div className="input-group">
                        <label>Enter OTP</label>
                        <OtpInput
                            value={otp}
                            onChange={setOtp}
                            OTPLength={4}
                            otpType="number"
                            disabled={false}
                            autoFocus
                            className="opt-container"
                        />
                    </div>

                    <button type="submit" className="login-btn">Verify OTP</button>
                </form>
            )}
        </div>
    );
}

export default AdminLogin