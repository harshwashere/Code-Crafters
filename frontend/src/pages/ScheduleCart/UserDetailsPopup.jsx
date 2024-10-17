/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./UserDetailsPopup.css"; // Ensure to add relevant styles for the popup
import useAuth from "../../store/useAuth";
import axios from "axios";
import { URL } from "../helper/helper";
import { toast } from "react-toastify";

export const UserDetailsPopup = ({
  onClose,
  onSubmit,
  mealData,
  summaryDetails,
}) => {
  const { user, authorizationToken } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    country: "",
    phone: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [isCovering, setIsCovering] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted data: ", formData);
    onSubmit(formData);

    const orderData = {
      formData,
      date: summaryDetails[0].startDate,
      mealTime: summaryDetails[0].mealFor,
      meal: {
        name: mealData[0].meal.name,
        type: mealData[0].meal.type,
        plan: mealData[0].meal.plan,
        mealFor: mealData[0].meal.mealFor,
        price: mealData[0].meal.price,
        meals: mealData[0].meal.meals,
      },
      quantity: mealData[0].quantity,
      totalPrice: summaryDetails[0].totalPrice,
    };

    try {
      const response = await axios.post(
        `${URL}/scheduleorder/createOrder`,
        orderData,
        {
          headers: {
            Authorization: authorizationToken,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setIsSubmitted(true);
        toast.success("Order created successfully");
      } else {
        toast.error(response.data.message || "Error creating order");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      toast.error("Error submitting order");
    }
  };

  const checkoutHandler = async () => {
    const amount = summaryDetails[0].totalPrice;
    const {
      data: { key },
    } = await axios.get(`${URL}/payment/getkey`);

    try {
      const response = await axios.post(
        `${URL}/payment/scheduleCreateOrder`,
        { amount },
        {
          headers: {
            Authorization: authorizationToken,
            "Content-Type": "application/json",
          },
        }
      );

      const order = response.data.order; // Capture Razorpay order data

      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "Aai Loves Tiffin",
        description: "Test Transaction",
        order_id: order.id, // Set the order ID here
        callback_url: `${URL}/payment/scheduleVerifyOrder`,
        prefill: formData,
        theme: { color: "#78C091" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error initiating Razorpay checkout:", error);
      toast.error("Error initiating payment");
    }
  };

  useEffect(() => {
    if (user) {
      setFormData({
        name: "",
        email: "",
        address: "",
        city: "",
        country: "",
        phone: "",
      });
    }
  }, [user]);

  return (
    <div className="popup-overlay">
      <div className={`popup-container ${isSubmitted ? "show" : ""}`}>
        <div
          className={`popup-left ${isSubmitted ? "submitted" : ""} ${
            isCovering ? "covering" : ""
          }`}
        >
          <div className="avatar-placeholder">
            {isSubmitted && <span className="done-symbol">✓</span>}
          </div>
          {isSubmitted ? (
            <>
              <h2>Your details have been saved!</h2>
              <div className="firework-effect">
                <div className="firework-burst"></div>
                <div className="firework-burst"></div>
                <div className="firework-burst"></div>
                <div className="firework-burst"></div>
              </div>
            </>
          ) : (
            <>
              <h2>Let get you set up</h2>
              <p>
                It should only take a couple of minutes to pair with your wish.
              </p>
            </>
          )}
          {isSubmitted && (
            <div className="proceed-container">
              <button className="proceed-button" onClick={checkoutHandler}>
                Proceed to Payment
              </button>
            </div>
          )}
        </div>

        {!isSubmitted && (
          <div className="popup-right">
            <button className="close-button" onClick={onClose}>
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
                name="phone"
                value={formData.phone}
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
        )}
      </div>
    </div>
  );
};
