import { useState } from 'react';
import useAuth from '../../store/useAuth';
import './Profile.css';
import { URL } from '../../pages(1)/helper/helper';
import { toast } from 'react-toastify';
import axios from 'axios';

const Profile = () => {
    const { authorizationToken, user } = useAuth()
    // const [userData, setUserData] = useState(true)
    const [User, setUser] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        city: "",
        country: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        // if(userData && user) {
        //     setUser({
        //         firstname: user.firstname,
        //         lastname: user.lastname,
        //         email: user.email,
        //         phone: user.phone,
        //         city: user.city,
        //         country: user.country
        //     })
        // }
        // setUserData(false);
        setUser((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }

    const updatedetails = async () => {
        try {
            console.log(`${URL}/api/updateuserdetails`)
            const response = await axios(`${URL}/api/updateuserdetails`, user, User, {
                method: 'PATCH',
                headers: {
                    "Authorization": authorizationToken,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(User)
            })

            if (response.status === 200) {
                // await response.json()
                console.log(response)
                toast.success('Details Updated')
            } else {
                toast.error('Something went wrong, please try again')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        updatedetails()
    }
    return (
        <div className="profile-container">
            {/* Sidebar */}
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


                    <form onSubmit={handleSubmit} className="form-contents">
                        <div className="form-group">
                            <label>First Name</label>
                            <input onChange={handleChange} value={user.firstname} type="text" placeholder='John' />
                        </div>

                        <div className="form-group">
                            <label>Last Name</label>
                            <input onChange={handleChange} value={user.lastname} type="text" placeholder='Doe' />
                        </div>

                        <div className="form-group email-row">
                            <label>Email address</label>
                            <input onChange={handleChange} value={user.email} type="email" placeholder='johndoe@example.com' />
                        </div>

                        <div className="form-group">
                            <label>Email address</label>
                            <input onChange={handleChange} value={user.phone} type="tel" placeholder='7498XXXX83' />
                        </div>

                        <div className="form-group">
                            <label>Country</label>
                            <input onChange={handleChange} value={user.city} type="text" placeholder='London' />
                        </div>

                        <div className="form-group">
                            <label>City</label>
                            <input onChange={handleChange} value={user.country} type="text" placeholder='United Kingdom' />
                        </div>

                        <button className="btn-save">Save</button>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default Profile;
