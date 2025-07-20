import React from 'react'
import { Link } from 'react-router-dom'; // Assuming you might add actual links later

const Footer = () => {
    return (
        <div className='footer'> {/* Main container for the footer */}
            <div className="footer-content">
                <div className="footer-section about">
                    <h3>E-COMM Dashboard</h3>
                    <p>Your one-stop solution for managing products efficiently. Streamline your inventory and sales with ease.</p>
                </div>
                <div className="footer-section links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link to="/">Products</Link></li>
                        <li><Link to="/add">Add New</Link></li>
                        <li><Link to="/profile">Profile</Link></li>
                        <li><Link to="/contact">Contact Us</Link></li> {/* Placeholder link */}
                    </ul>
                </div>
                <div className="footer-section contact">
                    <h3>Contact</h3>
                    <p>Email: support@ecomm.com</p>
                    <p>Phone: +1 (123) 456-7890</p>
                </div>
            </div>
            <div className="footer-bottom">
                &copy; {new Date().getFullYear()} E-COMM Dashboard. All rights reserved.
            </div>
        </div>
    )
}

export default Footer;
