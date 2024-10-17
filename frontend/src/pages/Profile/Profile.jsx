import { useState, useEffect } from 'react'; // Added useEffect for initialization
import useAuth from '../../store/useAuth';
import './profile.css';
import { URL } from '../../pages/helper/helper';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Footer } from '../../components/footer/Footer';
import Navbar from '../../components/navbar/Navbar';

const Profile = () => {
    const { authorizationToken, user } = useAuth();
    const [User, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        city: "",
        country: "",
        address: ""
    });
    const [loading, setLoading] = useState(false);

    // Initialize User state with data from user
    useEffect(() => {
        if (user) {
            setUser({
                name: user.name || "",
                email: user.email || "",
                phone: user.phone || "",
                city: user.city || "",
                country: user.country || "",
                address: user.address || ""
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const updatedetails = async (e) => {
        try {
            e.preventDefault();
            setLoading(true);
            const response = await axios.patch(`${URL}/api/updateuserdetails`, User, {
                headers: {
                    Authorization: authorizationToken,
                    "Content-Type": "application/json"
                }
            });

            if (response.status === 200) {
                console.log(response);
                toast.success('Details Updated');
            } else {
                toast.error('Something went wrong, please try again');
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong, please try again');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="profile-container">
                <div className="profile-sidebar">
                    <h2 className="logo">My Profile</h2>
                    <hr />
                    <ul className="menu-list">
                        <li className="active">Profile</li>
                    </ul>
                </div>

                {/* Main Content */}
                <div className="main-content">
                    {/* Profile Form */}
                    <div className="profile-form">
                        <form onSubmit={updatedetails} className="form-contents">
                            <div className="form-group">
                                <label>Name</label>
                                <input name="name" onChange={handleChange} value={User.name} type="text" placeholder='John Doe' />
                            </div>

                            <div className="form-group email-row">
                                <label>Email address</label>
                                <input name="email" onChange={handleChange} value={User.email} type="email" placeholder='johndoe@example.com' />
                            </div>

                            <div className="form-group">
                                <label>Mobile Number</label>
                                <input name="phone" onChange={handleChange} value={User.phone} type="tel" placeholder='7498XXXX83' />
                            </div>

                            <div className="form-group">
                                <label>Address</label>
                                <input name="address" onChange={handleChange} value={User.address} type="text" placeholder='4th Avenue, Cornelia Street' />
                            </div>

                            <div className="form-group">
                                <label>City</label>
                                <input name="city" onChange={handleChange} value={User.city} type="text" placeholder='London' />
                            </div>

                            <div className="form-group">
                                <label>Country</label>
                                <input name="country" onChange={handleChange} value={User.country} type="text" placeholder='United Kingdom' />
                            </div>

                            <button type='submit' className="btn-save">{loading && <div className="loadingPie"></div>}Save</button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Profile;