import { useEffect, useState } from "react";
import "./ScheduleSummary.css"; // Make sure to create a CSS file for styling
import axios from "axios";
import Navbar from "../navbar/Navbar";
import DateSelector from "../DateSelector/DateSelector";
import MealCard from "../MealCard/MealCard";
import { UserDetailsPopup } from "../../pages/ScheduleCart/UserDetailsPopup";

export const ScheduleSummary = () => {
  const [summaryDetails, setSummaryDetails] = useState([]);

  const [mealData, setMealData] = useState([]); // Store all meals from backend
  const [selectedDateMeals, setSelectedDateMeals] = useState([]); // Meals for selected date
  const [startDate, setStartDate] = useState("");
  const [mealsPerWeek, setmealsPerWeek] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmitMeals = () => {
    setShowPopup(true); // Show the popup when meals are submitted
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleUserDetailsSubmit = (userDetails) => {
    console.log("User Details Submitted:", userDetails);
    // Here you can handle the submitted user details (e.g., send to server)
    // axios.post('/api/userdetails', userDetails)...
  };

  const getScheduleSummary = async () => {
    try {
      const token = localStorage.getItem("token");
      // console.log(token);
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

        console.log("response", response.data); // Log the response directly
        // If you want to set summary details when the request is successful
        if (response.status === 200) {
          setSummaryDetails(response.data); // Assuming response.data has the required data
        }
        if (response.data.length > 0) {
          fetchMeals(response.data[0]); // Use the first schedule for meals fetching
        }
      }
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  //*---------------------------------------------------------------------
  //*---------------------------------------------------------------------

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

  //*----------------------------------------------------------------------
  //*----------------------------------------------------------------------

  const fetchMeals = async (schedule) => {
    try {
      const mealPlans = {}; // To hold meal plans
      const durations = {}; // To hold durations

      // Utility function to capitalize the first letter of a string
      const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
      };

      // Determine which meal plans to fetch based on user selection
      if (schedule.mealPlans.lunch) {
        mealPlans.lunch = capitalizeFirstLetter(schedule.mealPlans.lunch);
        durations.lunch = schedule.duration.lunch;
      }
      if (schedule.mealPlans.dinner) {
        mealPlans.dinner = capitalizeFirstLetter(schedule.mealPlans.dinner);
        durations.dinner = schedule.duration.dinner;
      }

      const combinedMeals = []; // Store all meal responses

      // Prepare the payload to match the backend expected structure
      const payload = {
        mealType: schedule.mealType, // Example: "Veg"
        startDate: schedule.startDate, // Example: "2024-10-15"
        mealsPerWeek: schedule.mealsPerWeek, // Example: "5-days"
        quantity: schedule.quantity, // Example: 1
        duration: durations, // Pass durations object
        mealPlans: mealPlans, // Pass meal plans object
      };

      // Send request for meal schedule
      const response = await axios.post(
        "http://localhost:7000/api/schedule",
        payload
      );

      combinedMeals.push(...response.data); // Collect all meal responses

      // Update state with fetched meal data
      // console.log("combinedMeals", combinedMeals);
      setMealData(combinedMeals);
      setStartDate(schedule.startDate);
      setmealsPerWeek(schedule.mealsPerWeek);
    } catch (error) {
      console.error(
        "Error fetching meals:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleDateChange = (selectedDate) => {
    try {

      const validDate = new Date(selectedDate);
      if (isNaN(validDate)) throw new Error("Invalid date format");

      // Format date as "YYYY-MM-DD"
      const year = validDate.getFullYear();
      const month = (validDate.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
      const day = validDate.getDate().toString().padStart(2, "0");

      const formattedDate = `${year}-${month}-${day}`;

      const filteredMeals = mealData.filter((meal) => {
        console.log("formattedDate", formattedDate);
        console.log(`Checking meal startDate: ${meal.date === formattedDate}`); // Log each meal's date
        return meal.date === formattedDate;
      });
      
      setSelectedDateMeals(filteredMeals);
    } catch (error) {
      console.error("Error handling date:", error.message);
    }
  };

  useEffect(() => {
    getScheduleSummary([]);
    // fetchMeals();
  }, []);

  useEffect(() => {
    if (startDate) {
      handleDateChange(startDate); // Fetch meals for the initial startDate
    }
  }, [mealData, startDate]);

  return (
    <>
      <Navbar />
      <div className="order-summary">
        {Array.isArray(summaryDetails) &&
          summaryDetails.map((curElem, index) => {
            const isLunchSelected =
              curElem.mealFor === "lunch" || curElem.mealFor === "both";
            const isDinnerSelected =
              curElem.mealFor === "dinner" || curElem.mealFor === "both";
            return (
              <div className="order-left-side" key={index}>
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
                    <strong>Total Price:</strong>₹{curElem.totalPrice}
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
            <DateSelector
              mealsPerWeek={mealsPerWeek}
              startDate={startDate}
              onDateChange={handleDateChange}
            />
            <section className="food-preference">
              <p>Food Preference</p>
              <button className="edit">Edit ✎</button>
            </section>
            {console.log("Selected Date Meals:", selectedDateMeals)}
            {selectedDateMeals.length > 0 ? (
              selectedDateMeals.map((meal, index) => (
                <MealCard key={index} meal={meal.meal} />
              ))
            ) : (
              <p>you have only selected Meals for {mealsPerWeek}</p>
            )}
            <button className="cta-button" onClick={handleSubmitMeals}>
              Continue
            </button>

            {showPopup && (
              <UserDetailsPopup
                onClose={handlePopupClose}
                onSubmit={handleUserDetailsSubmit}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
