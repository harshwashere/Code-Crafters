import { useEffect, useState } from "react";
import "./ScheduleSummary.css"; // Make sure to create a CSS file for styling
import axios from "axios";
import Navbar from "../navbar/Navbar";
import DateSelector from "../DateSelector/DateSelector";
import MealCard from "../MealCard/MealCard";

export const ScheduleSummary = () => {
  const [summaryDetails, setSummaryDetails] = useState([]);



  const getScheduleSummary = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      if (token) {
        const response = await axios.get(
          "http://localhost:7000/scheduleapi/getScheduleData",
          {
            headers: {
              Authorization: token,
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

  const deleteSchedule = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await axios.delete(
          `http://localhost:7000/scheduleapi/deleteSchedule/${id}`,
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);

        if (response.status === 200) {
          alert("Schedule deleted successfully!");
          setSummaryDetails((prevDetails) =>
            prevDetails.filter((schedule) => schedule._id !== id)
          );
        }
      }
    } catch (error) {
      console.error("Error deleting schedule:", error);
      alert("Failed to delete the schedule.");
    }
  };

  useEffect(() => {
    getScheduleSummary([]);
  }, []);

  return (
    <>
      <Navbar />
      <div className="order-summary">
        {Array.isArray(summaryDetails) &&
          summaryDetails.map((curElem) => {
            const isLunchSelected =
              curElem.mealFor === "lunch" || curElem.mealFor === "both";
            const isDinnerSelected =
              curElem.mealFor === "dinner" || curElem.mealFor === "both";
            return (
              <div className="order-left-side" key={curElem.id}>
                <div className="summary-left-side">
                  <h2>Order Summary</h2>
                  {/* <hr /> */}
                  <div className="summary-item">
                    <strong>Meal For:</strong> {curElem.mealFor}
                  </div>
                  <div className="summary-item">
                    <strong>Meal Type:</strong> {curElem.mealType}
                  </div>
                  {isLunchSelected && (
                    <>
                      <div className="summary-item">
                        <strong>Lunch Plan:</strong> {curElem.mealPlans.lunch}
                      </div>
                      <div className="summary-item">
                        <strong>Lunch Duration:</strong>{" "}
                        {curElem.duration.lunch}
                      </div>
                    </>
                  )}

                  {isDinnerSelected && (
                    <>
                      <div className="summary-item">
                        <strong>Dinner Plan:</strong> {curElem.mealPlans.dinner}
                      </div>
                      <div className="summary-item">
                        <strong>Dinner Duration:</strong>{" "}
                        {curElem.duration.dinner}
                      </div>
                    </>
                  )}

                  <div className="summary-item">
                    <strong>Meals Per Week:</strong> {curElem.mealsPerWeek}
                  </div>
                  <div className="summary-item">
                    <strong>Quantity:</strong> {curElem.quantity}
                  </div>
                  <div className="summary-item">
                    <strong>Start Date:</strong> {curElem.startDate}
                  </div>
                  <hr />
                  <div className="summary-item total-price">
                    <strong>Total Price:</strong> {curElem.totalPrice}
                  </div>
                </div>
                <button
                  className="cta-button"
                  onClick={() => deleteSchedule(curElem._id)}
                >
                  Clear Schedules
                </button>
              </div>
            );
          })}

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
