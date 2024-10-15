/* eslint-disable react/prop-types */

import { useState } from "react";
import "./UserDetailsPopup.css"; // Ensure to add relevant styles for the popup

export const UserDetailsPopup = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    country: "",
    phone: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false); // Track submission status
  // eslint-disable-next-line no-unused-vars
  const [isCovering, setIsCovering] = useState(false); // Track covering animation status

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted data: ", formData);
    onSubmit(formData);
    setIsSubmitted(true); // Set submission status to true
    setTimeout(() => {
      document.querySelector(".popup-left").classList.add("covering"); // Add covering class for animation
    }, 50); // Delay to ensure the state change takes effect before adding the class
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <div
          className={`popup-left ${isSubmitted ? "submitted" : ""} ${
            isCovering ? "covering" : ""
          }`}
        >
          <div className="avatar-placeholder">
            {isSubmitted && (
              <span className="done-symbol">✓</span> // Show Done symbol
            )}
          </div>
          {isSubmitted ? ( // Display this message after submission
            <>
              <h2>Your details have been saved!</h2>
              {/* Firework effect */}
              <div className="firework-effect">
                <div className="firework-burst"></div>
                <div className="firework-burst"></div>
                <div className="firework-burst"></div>
                <div className="firework-burst"></div>
              </div>
            </>
          ) : (
            <>
              <h2>Let&apos;s get you set up</h2>
              <p>
                It should only take a couple of minutes to pair with your wish.
              </p>
            </>
          )}
          {isSubmitted && (
            <div className="proceed-container">
              <button className="proceed-button" onClick={handleClose}>
                Proceed to Payment
              </button>
            </div>
          )}
        </div>
        {!isSubmitted ? ( // Show form only if not submitted
          <div className="popup-right">
            <button className="close-button" onClick={handleClose}>
              &times;
            </button>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="input-field"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="input-field"
                required
              />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                className="input-field"
                required
              />
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Mobile"
                className="input-field"
                required
              />
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                className="input-field"
                required
              />
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Country"
                className="input-field"
                required
              />

              <div className="button-container">
                <button type="submit" className="save-button">
                  Save
                </button>
              </div>
            </form>
          </div>
        ) : null}
      </div>
    </div>
  );
};
