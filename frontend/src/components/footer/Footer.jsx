import { NavLink } from 'react-router-dom'
import './footer.css'
import { BsInstagram, BsTwitterX } from "react-icons/bs";

export const Footer = () => {
    return (<>
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h3>About Us</h3>
                    <p>
                        We provide healthy and home-cooked meals delivered to your doorstep. Our
                        tiffin services cater to your daily nutrition needs with a focus on
                        taste and health.
                    </p>
                </div>

                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/menu">Menu</NavLink></li>
                        <li><NavLink to="/contact">Contact</NavLink></li>
                        <li><NavLink to="/schedule">Schedule Tiffin</NavLink></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>Contact Us</h3>
                    <p><NavLink to='mailto:support@aaislovetiffin.com'>Email: support@aaislovetiffin.com</NavLink></p>
                    <p><NavLink to='tel:+1 234 567 890'>Phone: +1 234 567 890</NavLink></p>
                </div>

                <div className="footer-section">
                    <h3>Follow Us</h3>
                    <div className="social-icons">
                        <NavLink to=""><BsTwitterX /></NavLink>
                        <NavLink to=""><BsInstagram /></NavLink>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© 2024 Tiffin Service. All rights reserved.</p>
            </div>
        </footer>
    </>)
}