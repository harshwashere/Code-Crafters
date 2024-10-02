import { useState } from 'react';
import useAuth from '../../store/useAuth';
import './Profile.css';
import { URL } from '../helper/helper';
import { toast } from 'react-toastify';

const Profile = () => {
    const { authorizationToken  } = useAuth()
    const [User, setUser] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        city: "",
        country: ""
    })

    const handleChange = (e) => {
        const name= e.target.name
        const value = e.target.value
        setUser({ ...User, [name]: value })
    }

    const updatedetails = async () => {
        try {
            const response = await fetch(`${URL}/api/updateuserdetails`, {
                method: 'PATCH',
                headers: {
                    "Authorization": authorizationToken,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(User)
            })

            if (response.ok) {
                await response.json()
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
                            <input onChange={handleChange} value={User.firstname} type="text" placeholder='John' />
                        </div>

                        <div className="form-group">
                            <label>Last Name</label>
                            <input onChange={handleChange} value={User.lastname} type="text" placeholder='Doe' />
                        </div>

                        <div className="form-group email-row">
                            <label>Email address</label>
                            <input onChange={handleChange} value={User.email} type="email" placeholder='johndoe@example.com' />
                        </div>

                        <div className="form-group">
                            <label>Email address</label>
                            <input onChange={handleChange} value={User.phone} type="tel" placeholder='7498XXXX83' />
                        </div>

                        <div className="form-group">
                            <label>Country</label>
                            <input onChange={handleChange} value={User.city} type="text" placeholder='London' />
                        </div>

                        <div className="form-group">
                            <label>City</label>
                            <input onChange={handleChange} value={User.country} type="text" placeholder='United Kingdom' />
                        </div>

                        <button className="btn-save">Save</button>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default Profile;
