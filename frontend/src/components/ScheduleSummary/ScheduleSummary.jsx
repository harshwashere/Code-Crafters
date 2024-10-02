import { useEffect, useState } from "react";
import "./ScheduleSummary.css"; // Make sure to create a CSS file for styling
import axios from "axios";
import Navbar from "../navbar/Navbar";
import DateSelector from "../DateSelector/DateSelector";
import MealCard from "../MealCard/MealCard";

export const ScheduleSummary = () => {
  // eslint-disable-next-line no-unused-vars
  const [summaryDetails, setSummaryDetails] = useState([]);

  const getScheduleSummary = async () => {
    try {
      const token = localStorage.getItem("token");
      // console.log(token);
      if (token) {
        const response = await axios.get(
          "http://localhost:7000/api/getScheduleData",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log(response.data); // Log the response directly
        // If you want to set summary details when the request is successful
        if (response.status === 200) {
          setSummaryDetails(response.data); // Assuming response.data has the required data
        }
        // console.log(summaryDetails);
      }
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  useEffect(() => {
    getScheduleSummary([]);
  }, []);

  return (
    // <div className="order-summary">
    //   {Array.isArray(summaryDetails) && summaryDetails.map((curElem) => {
    //     console.log(curElem);
    //     return(
    //   <div className="summary-left-side" key={curElem.id}>
    //   <h2>Order Summary</h2>
    //   <hr />
    //   <div className="summary-item">
    //     <strong>Meal For:</strong> {curElem.mealFor}
    //   </div>
    //   <div className="summary-item">
    //     <strong>Meal Type:</strong> {curElem.mealType}
    //   </div>
    //   <div className="summary-item">
    //     <strong>Lunch Plan:</strong> {curElem.mealPlans.lunch}
    //   </div>
    //   <div className="summary-item">
    //     <strong>Dinner Plan:</strong> {curElem.mealPlans.dinner}
    //   </div>
    //   <div className="summary-item">
    //     <strong>Lunch Duration:</strong> {curElem.duration.lunch}
    //   </div>
    //   <div className="summary-item">
    //     <strong>Dinner Duration:</strong> {curElem.duration.dinner}
    //   </div>
    //   <div className="summary-item">
    //     <strong>Meals Per Week:</strong> {curElem.mealsPerWeek}
    //   </div>
    //   <div className="summary-item">
    //     <strong>Quantity:</strong> {curElem.quantity}
    //   </div>
    //   <div className="summary-item">
    //     <strong>Chapati Count:</strong> {curElem.chapatiCount}
    //   </div>
    //   <div className="summary-item">
    //     <strong>Rice Type:</strong> {curElem.riceType}
    //   </div>
    //   <div className="summary-item">
    //     <strong>Start Date:</strong> {curElem.startDate}
    //   </div>
    //   <div className="summary-item">
    //     <strong>Total Price:</strong> ₹{curElem.totalPrice}
    //   </div>
    //   </div>
    //     )
    //   })}

    // </div>
    <>
      <Navbar />
      <div className="order-summary">
        <div className="order-left-side">
          <div className="summary-left-side">
            <h2>Order Summary</h2>
            {/* <hr /> */}
            <div className="summary-item">
              <strong>Meal For:</strong> lunch
            </div>
            <div className="summary-item">
              <strong>Meal Type:</strong> Veg
            </div>
            <div className="summary-item">
              <strong>Lunch Plan:</strong> Eco
            </div>
            <div className="summary-item">
              <strong>Dinner Plan:</strong> Eco
            </div>
            <div className="summary-item">
              <strong>Lunch Duration:</strong> 1week
            </div>
            <div className="summary-item">
              <strong>Dinner Duration:</strong> 1week
            </div>
            <div className="summary-item">
              <strong>Meals Per Week:</strong> 5days
            </div>
            <div className="summary-item">
              <strong>Start Date:</strong> 22-09-2024
            </div>
            <hr />
            <div className="summary-item total-price">
              <strong>Total Price:</strong> ₹150
            </div>
          </div>
        </div>

        <div className="order-right-side">
            <div className="menu-container">
              <header>
                <h2>
                  Here is your
                  <span>Next Seven Days Of Chef-Curated Menu.</span>
                </h2>
              </header>
              <DateSelector />
              <section className="food-preference">
                <p>Food Preference</p>
                <button className="edit">Edit ✎</button>
              </section>
              <MealCard />
              <button className="cta-button">Submit Meals</button>
            </div>
          </div>
        </div>
    </>
  );
};
