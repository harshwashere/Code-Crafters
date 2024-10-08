import { useState } from "react";
import './contact.css'
import Navbar from "../../components/navbar/Navbar";
import { Footer } from "../../components/footer/Footer";
import { URL } from "../helper/helper";
import { toast } from "react-toastify";

const Contact = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        helpType: '',
        fullName: '',
        email: '',
        mobile: '',
        message: ''
    });


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setLoading(true)
            const contact = await fetch(`${URL}/contact/contacts`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "option": formData.helpType,
                    "name": formData.fullName,
                    "email": formData.email,
                    "phone": formData.mobile,
                    "message": formData.message
                })
            })

            if (contact.status === 200) {
                await contact.json()

                setFormData(formData)
                setLoading(false)
                toast.success("Form submitted, someone will contact you shortly")
            } else {
                setLoading(false)
                toast.error('Something went wrong, Please try again')
            }

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
        console.log(formData);
    };

    return (
        <>
            <Navbar />
            <div className="page-container">
                <header className="headerCont">
                    <h1>Customer Support & Live Orders</h1>
                </header>

                <div className="content-container">
                    <div className="form-container">
                        <h2>Contact Us</h2>
                        <p>Please fill out the form below to get in touch.</p>
                        <form className="contactForm" onSubmit={handleSubmit}>
                            <label className="contactFormLabel" htmlFor="helpType">How can we help you?<span>*</span></label>
                            <select className="contactFormInput" name="helpType" value={formData.helpType} onChange={handleChange} required>
                                <option value="" disabled>Select an option</option>
                                <option value="I found incorrect/outdated information on a page">I found incorrect/outdated information on a page.</option>
                                <option value="I need help with my online order">I need help with my online order</option>
                                <option value="The website is not working the way it should">The website is not working the way it should</option>
                                <option value="I would like to give feedback/suggestions">I would like to give feedback/suggestions</option>
                                <option value="other">Other</option>
                            </select>
                            <label htmlFor="fullName" className="contactFormLabel">Full Name<span>*</span></label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="contactFormInput"
                                required
                            />
                            <label htmlFor="email" className="contactFormLabel">Email Address<span>*</span></label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="contactFormInput"
                                pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                                required
                            />
                            <label htmlFor="mobile" className="contactFormLabel">Mobile Number<span>*</span></label>
                            <input
                                type="tel"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                className="contactFormInput"
                                pattern="[0-9]{10}"
                            />
                            <label htmlFor="message" className="contactFormLabel">Additional Information<span>*</span></label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className="contactFormInput"
                                rows="4"
                            />
                            <button className="contactFormSubmit" type="submit">
                                {loading && <div className="loadingPie"></div>}
                                <span>Submit</span>
                            </button>
                        </form>
                    </div>
                    {/* <div className="live-orders">
                        <h2>Live Orders Information</h2>
                        <p>Order #1234 - Processing</p>
                        <p>Order #5678 - Shipped</p>
                        <p>Order #9101 - Delivered</p>
                        <p>Order #1121 - Awaiting Pickup</p>
                    </div> */}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Contact