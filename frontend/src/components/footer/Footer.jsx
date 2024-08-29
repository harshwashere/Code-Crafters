// import { NavLink } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import './footer.css'

export const Footer = () => {
    return(<>
        <div className='mainFooter'>
            <div>
                <h2>Menu</h2>
                <ul>
                    <li>Home</li>
                    <li>Sneakpeak to our menu</li>
                    <li>Why choose us?</li>
                    <li>Most order food</li>
                    <li>Our Special Chef's</li>
                </ul>
            </div>
            <div>
                <h2>Help</h2>
                <ul>
                    <li>Privacy</li>
                    <li>Terms & Condition</li>
                    <li>Policy</li>
                </ul>
            </div>
            <div>
                <h2>Contact</h2>
                <ul>
                    <li><NavLink to='tel:+917395749204'>+91 73957 49204</NavLink></li>
                    <li><NavLink to='mailto:info@codecrafters.com'>info@codecrafters.com</NavLink></li>
                    <li><NavLink to='https://maps.app.goo.gl/mFpD5y6o54pA22oTA'>1245, Mumbai, India</NavLink></li>
                </ul>
            </div>
            <div></div>
        </div>
    </>)
}