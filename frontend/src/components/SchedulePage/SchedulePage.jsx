/* eslint-disable no-unused-vars */
import { useState } from "react";
import "./SchedulePage.css";
import Navbar from "../navbar/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { URL } from "../../pages/helper/helper";
import useAuth from "../../store/useAuth";

const SchedulePage = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [summaryDetails, setSummaryDetails] = useState("");
  const [selectedMeal, setSelectedMeal] = useState("");
  const [selectedMealType, setSelectedMealType] = useState("");
  const [selectedMealButton, setSelectedMealButton] = useState("");
  const [selectedMealTypeButton, setSelectedMealTypeButton] = useState("");
  const [selectedMealPlanButton, setSelectedMealPlanButton] = useState({
    lunch: "",
    dinner: "",
  });
  const [selectedMealPlan, setSelectedMealPlan] = useState({
    lunch: "",
    dinner: "",
  });
  const [selectedDuration, setSelectedDuration] = useState({
    lunch: "",
    dinner: "",
  });
  const [selectedMealsPerWeek, setSelectedMealsPerWeek] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { authorizationToken } = useAuth();
  const mealPlanPrices = {
    eco: 130,
    mini: 150,
    executive: 180,
  };

  const discounts = {
    "1-week": 0.05, // 5% discount
    "1-month": 0.1, // 10% discount
  };

  const handleMealSelection = (meal) => {
    setSelectedMeal(meal);
    setSelectedMealButton(meal);
    setSelectedMealPlan({ lunch: "", dinner: "" });
    setSelectedDuration({ lunch: "", dinner: "" });
  };

  const handleMealType = (type) => {
    setSelectedMealType(type);
    setSelectedMealTypeButton(type);
  };

  const handleMealPlan = (meal, plan) => {
    setSelectedMealPlan((prev) => ({ ...prev, [meal]: plan }));
    setSelectedMealPlanButton((prev) => ({ ...prev, [meal]: plan }));
  };

  const handleDurationSelection = (meal, duration) => {
    setSelectedDuration((prev) => ({ ...prev, [meal]: duration }));
  };

  const handleMealsPerWeekSelection = (mealsPerWeek) => {
    setSelectedMealsPerWeek(mealsPerWeek);
  };

  const handleQuantityChange = (e) => {
    const value = Number(e.target.value);
    if (value >= 0 && value <= 10) {
      // Ensure value is between 0 and 10
      setSelectedQuantity(value);
    } else if (value < 0) {
      setSelectedQuantity(0); // Set to 0 if the user tries to enter a negative number
    }
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const calculatePrice = () => {
    let totalPrice = 0;

    // Total number of days based on selected duration plan for lunch and dinner
    const totalDaysLunch =
      selectedDuration.lunch === "1-week"
        ? 7
        : selectedDuration.lunch === "1-month"
        ? 30
        : selectedDuration.lunch === "3-day"
        ? 3
        : 0;
    const totalDaysDinner =
      selectedDuration.dinner === "1-week"
        ? 7
        : selectedDuration.dinner === "1-month"
        ? 30
        : selectedDuration.dinner === "3-day"
        ? 3
        : 0;

    // Get the number of meals per week
    const mealsPerWeek =
      selectedMealsPerWeek === "5-days"
        ? 5
        : selectedMealsPerWeek === "6-days"
        ? 6
        : 0;

    // Calculate total number of meals for lunch and dinner
    const totalMealsLunch =
      totalDaysLunch > 0 ? mealsPerWeek * (totalDaysLunch / 7) : 0; // Adjust meals based on total days for lunch
    const totalMealsDinner =
      totalDaysDinner > 0 ? mealsPerWeek * (totalDaysDinner / 7) : 0; // Adjust meals based on total days for dinner

    // Calculate total price for lunch
    if (selectedMealPlan.lunch) {
      totalPrice += mealPlanPrices[selectedMealPlan.lunch] * totalMealsLunch;
    }

    // Calculate total price for dinner
    if (selectedMealPlan.dinner) {
      totalPrice += mealPlanPrices[selectedMealPlan.dinner] * totalMealsDinner;
    }

    // Multiply by the quantity selected by the user
    totalPrice *= selectedQuantity;

    // Apply discounts based on duration plan (if applicable)
    // Apply discounts if applicable
    const lunchDiscount = discounts[selectedDuration.lunch] || 0;
    const dinnerDiscount = discounts[selectedDuration.dinner] || 0;
    const totalDiscount = Math.max(lunchDiscount, dinnerDiscount); // Ensure no over-discounting
    totalPrice -= totalPrice * totalDiscount;
    totalPrice = Math.round(totalPrice);
    return totalPrice;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let validationError = false;

    // Check if the user selected a meal (lunch, dinner, or both)
    if (!selectedMeal) {
      setFormError("Please select a meal (lunch, dinner, or both)!");
      validationError = true;
    }

    // Check if a meal type (healthy, jain, diabetic, etc.) was selected
    if (!selectedMealType) {
      setFormError("Please select a meal type!");
      validationError = true;
    }

    // Validate based on meal type (lunch, dinner, both)
    if (selectedMeal.includes("lunch") && !selectedMealPlan.lunch) {
      setFormError("Please select a lunch meal plan!");
      validationError = true;
    }

    if (selectedMeal.includes("dinner") && !selectedMealPlan.dinner) {
      setFormError("Please select a dinner meal plan!");
      validationError = true;
    }

    // Validate duration for lunch or dinner
    if (selectedMeal.includes("lunch") && !selectedDuration.lunch) {
      setFormError("Please select a duration for lunch!");
      validationError = true;
    }

    if (selectedMeal.includes("dinner") && !selectedDuration.dinner) {
      setFormError("Please select a duration for dinner!");
      validationError = true;
    }

    // Validate if the number of meals per week is selected
    if (!selectedMealsPerWeek) {
      setFormError("Please select how many meals you want per week!");
      validationError = true;
    }

    // Check if the start date is selected
    if (!startDate) {
      setFormError("Please select a start date!");
      validationError = true;
    }

    // Check if a quantity is selected
    if (!selectedQuantity) {
      setFormError("Please select a quantity!");
      validationError = true;
    }

    // If there are any validation errors, stop form submission
    if (validationError) {
      return;
    }

    const formData = {
      mealFor: selectedMeal,
      mealType: selectedMealType,
      mealPlans: selectedMealPlan,
      duration: selectedDuration,
      mealsPerWeek: selectedMealsPerWeek,
      quantity: selectedQuantity,
      startDate: startDate,
      totalPrice: calculatePrice(),
    };
    setSummaryDetails(formData);

    const resetForm = () => {
      setSelectedMeal("");
      setSelectedMealType("");
      setSelectedMealPlan({ lunch: "", dinner: "" });
      setSelectedDuration({ lunch: "", dinner: "" });
      setSelectedMealsPerWeek("");
      setSelectedQuantity(1);
      setStartDate("");
      setFormError("");
      setSuccessMessage("");
    };

    try {
      const response = await axios.post(
        `${URL}/scheduleapi/getSchedule`,
        formData,
        {
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      if (response.status === 200) {
        setSuccessMessage("Your meal plan has been scheduled successfully!");
        setFormError(""); // Clear any form errors
        resetForm(); // Call function to reset the form
        setSummaryDetails(formData);
        navigate("/scheduleSummary");
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      setFormError("Something went wrong. Please try again later.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="schedule-container">
        <div className="schedule-page">
          <div className="tiffin-header">
            <h1>Tiffin Service</h1>
            <p className="intro-text">
              <span>आई❤️Tiffin</span> delivers homely and healthy meals daily
              through our tiffin services.
            </p>
            <p className="sub-text">
              For our users, we also provide amazing deals.
            </p>
            <div className="discounts">
              <p className="typed-text">
                1 week orders: <span className="discount">5% discount</span>
              </p>
              <p className="typed-text">
                1 month orders: <span className="discount">10% discount</span>
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Meal and Meal Type Selection */}
            <div className="meal-selection">
              <h2>Select Meal For</h2>
              <hr />
              <div className="meal-buttons">
                <button
                  onClick={() => handleMealSelection("lunch")}
                  className={`lunch ${
                    selectedMealButton === "lunch" ? "selected" : ""
                  }`}
                >
                  <img src="https://www.happygrub.in/img/sun.png" alt="Lunch" />
                  <span>Lunch</span>
                </button>
                <button
                  onClick={() => handleMealSelection("dinner")}
                  className={`dinner ${
                    selectedMealButton === "dinner" ? "selected" : ""
                  }`}
                >
                  <img
                    src="https://www.happygrub.in/img/moon.png"
                    alt="Dinner"
                  />
                  <span>Dinner</span>
                </button>
                <button
                  onClick={() => handleMealSelection("both")}
                  className={`both ${
                    selectedMealButton === "both" ? "selected" : ""
                  }`}
                >
                  <img
                    src="https://www.happygrub.in/img/sun-moon.png"
                    alt="Both"
                  />
                  <span>Both</span>
                </button>
              </div>
            </div>

            {selectedMeal && (
              <div className="meal-type-selection">
                <h2>Select Meal Type</h2>
                <hr />
                <div className="meal-type-buttons">
                  <button
                    onClick={() => handleMealType("Veg")}
                    className={`Veg ${
                      selectedMealTypeButton === "Veg" ? "selected" : ""
                    }`}
                  >
                    <img
                      src="https://www.happygrub.in/img/healthy-meal.png"
                      alt="Veg Meal"
                    />
                    <span>Veg</span>
                  </button>
                  <button
                    onClick={() => handleMealType("Non-Veg")}
                    className={`Non-veg ${
                      selectedMealTypeButton === "Non-Veg" ? "selected" : ""
                    }`}
                  >
                    <img
                      src="https://www.happygrub.in/img/healthy-jain-meal.png"
                      alt="Non-Veg Meal"
                    />
                    <span>Non-Veg</span>
                  </button>
                  {/* Add more buttons here if needed */}
                </div>
              </div>
            )}

            {/* Meal Plan Selection */}
            {selectedMeal && selectedMealType && (
              <div className="meal-plan-selection">
                <h2>Select Your Meal Plan</h2>
                <hr />
                {selectedMeal.includes("lunch") && (
                  <>
                    <h3>Lunch Plans</h3>
                    <hr />
                    <div className="meal-plan-buttons">
                      <button
                        onClick={() => handleMealPlan("lunch", "eco")}
                        className={`eco ${
                          selectedMealPlanButton.lunch === "eco"
                            ? "selected"
                            : ""
                        }`}
                      >
                        <img
                          src="https://www.happygrub.in/img/bag.png"
                          alt=""
                        />
                        <span>Eco</span>
                      </button>
                      <p>₹130</p>

                      <button
                        onClick={() => handleMealPlan("lunch", "mini")}
                        className={`mini ${
                          selectedMealPlanButton.lunch === "mini"
                            ? "selected"
                            : ""
                        }`}
                      >
                        <img
                          src="https://www.happygrub.in/img/bag.png"
                          alt=""
                        />
                        <span>Mini</span>
                      </button>
                      <p>₹150</p>

                      <button
                        onClick={() => handleMealPlan("lunch", "executive")}
                        className={`executive ${
                          selectedMealPlanButton.lunch === "executive"
                            ? "selected"
                            : ""
                        }`}
                      >
                        <img
                          src="https://www.happygrub.in/img/bag.png"
                          alt=""
                        />
                        <span>Executive</span>
                      </button>
                      <p>₹180</p>
                    </div>
                  </>
                )}

                {selectedMeal.includes("dinner") && (
                  <>
                    <h3>Dinner Plans</h3>
                    <hr />
                    <div className="meal-plan-buttons">
                      <button
                        onClick={() => handleMealPlan("dinner", "eco")}
                        className={`eco ${
                          selectedMealPlanButton.dinner === "eco"
                            ? "selected"
                            : ""
                        }`}
                      >
                        <img
                          src="https://www.happygrub.in/img/bag.png"
                          alt=""
                        />
                        <span>Eco</span>
                      </button>
                      <p>₹130</p>

                      <button
                        onClick={() => handleMealPlan("dinner", "mini")}
                        className={`mini ${
                          selectedMealPlanButton.dinner === "mini"
                            ? "selected"
                            : ""
                        }`}
                      >
                        <img
                          src="https://www.happygrub.in/img/bag.png"
                          alt=""
                        />
                        <span>Mini</span>
                      </button>
                      <p>₹150</p>

                      <button
                        onClick={() => handleMealPlan("dinner", "executive")}
                        className={`executive ${
                          selectedMealPlanButton.dinner === "executive"
                            ? "selected"
                            : ""
                        }`}
                      >
                        <img
                          src="https://www.happygrub.in/img/bag.png"
                          alt=""
                        />
                        <span>Executive</span>
                      </button>
                      <p>₹180</p>
                    </div>
                  </>
                )}

                {selectedMeal.includes("both") && (
                  <div className="Both-side">
                    <div className="lunch-side">
                      <h3>Lunch Plans</h3>
                      <hr />
                      <div className="meal-plan-buttons">
                        <button
                          onClick={() => handleMealPlan("lunch", "eco")}
                          className={`eco ${
                            selectedMealPlanButton.lunch === "eco"
                              ? "selected"
                              : ""
                          }`}
                        >
                          <img
                            src="https://www.happygrub.in/img/bag.png"
                            alt=""
                          />
                          <span>Eco</span>
                        </button>
                        <p>₹130</p>

                        <button
                          onClick={() => handleMealPlan("lunch", "mini")}
                          className={`mini ${
                            selectedMealPlanButton.lunch === "mini"
                              ? "selected"
                              : ""
                          }`}
                        >
                          <img
                            src="https://www.happygrub.in/img/bag.png"
                            alt=""
                          />
                          <span>Mini</span>
                        </button>
                        <p>₹150</p>

                        <button
                          onClick={() => handleMealPlan("lunch", "executive")}
                          className={`executive ${
                            selectedMealPlanButton.lunch === "executive"
                              ? "selected"
                              : ""
                          }`}
                        >
                          <img
                            src="https://www.happygrub.in/img/bag.png"
                            alt=""
                          />
                          <span>Executive</span>
                        </button>
                        <p>₹180</p>
                      </div>
                    </div>

                    <div className="dinner-side">
                      <h3>Dinner Plans</h3>
                      <hr />
                      <div className="meal-plan-buttons">
                        <button
                          onClick={() => handleMealPlan("dinner", "eco")}
                          className={`eco ${
                            selectedMealPlanButton.dinner === "eco"
                              ? "selected"
                              : ""
                          }`}
                        >
                          <img
                            src="https://www.happygrub.in/img/bag.png"
                            alt=""
                          />
                          <span>Eco</span>
                        </button>
                        <p>₹130</p>

                        <button
                          onClick={() => handleMealPlan("dinner", "mini")}
                          className={`mini ${
                            selectedMealPlanButton.dinner === "mini"
                              ? "selected"
                              : ""
                          }`}
                        >
                          <img
                            src="https://www.happygrub.in/img/bag.png"
                            alt=""
                          />
                          <span>Mini</span>
                        </button>
                        <p>₹150</p>

                        <button
                          onClick={() => handleMealPlan("dinner", "executive")}
                          className={`executive ${
                            selectedMealPlanButton.dinner === "executive"
                              ? "selected"
                              : ""
                          }`}
                        >
                          <img
                            src="https://www.happygrub.in/img/bag.png"
                            alt=""
                          />
                          <span>Executive</span>
                        </button>
                        <p>₹180</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Duration Plan Selection for Lunch and Dinner */}
            {selectedMealPlan.lunch && (
              <div className="duration-plan-selection">
                <h2>Select Lunch Duration Plan</h2>
                <hr />
                <div className="duration-btn">
                  <div className="button-wrapper">
                    <button
                      onClick={() => handleDurationSelection("lunch", "3-day")}
                      className={
                        selectedDuration.lunch === "3-day" ? "selected" : ""
                      }
                      data-duration="3-day"
                    >
                      3 Day
                    </button>
                    <p></p> {/* No discount for 3-day */}
                  </div>
                  <div className="button-wrapper">
                    <button
                      onClick={() => handleDurationSelection("lunch", "1-week")}
                      className={
                        selectedDuration.lunch === "1-week" ? "selected" : ""
                      }
                      data-duration="1-week"
                    >
                      1 Week
                    </button>
                    <p>5% Discount</p>
                  </div>
                  <div className="button-wrapper">
                    <button
                      onClick={() =>
                        handleDurationSelection("lunch", "1-month")
                      }
                      className={
                        selectedDuration.lunch === "1-month" ? "selected" : ""
                      }
                      data-duration="1-month"
                    >
                      1 Month
                    </button>
                    <p>10% Discount</p>
                  </div>
                </div>
              </div>
            )}

            {selectedMealPlan.dinner && (
              <div className="duration-plan-selection">
                <h2>Select Dinner Duration Plan</h2>
                <hr />
                <div className="duration-btn">
                  <div className="button-wrapper">
                    <button
                      onClick={() => handleDurationSelection("dinner", "3-day")}
                      className={
                        selectedDuration.dinner === "3-day" ? "selected" : ""
                      }
                      data-duration="3-day"
                    >
                      3 Day
                    </button>
                    <p></p> {/* No discount for 3-day */}
                  </div>
                  <div className="button-wrapper">
                    <button
                      onClick={() =>
                        handleDurationSelection("dinner", "1-week")
                      }
                      className={
                        selectedDuration.dinner === "1-week" ? "selected" : ""
                      }
                      data-duration="1-week"
                    >
                      1 Week
                    </button>
                    <p>5% Discount</p>
                  </div>
                  <div className="button-wrapper">
                    <button
                      onClick={() =>
                        handleDurationSelection("dinner", "1-month")
                      }
                      className={
                        selectedDuration.dinner === "1-month" ? "selected" : ""
                      }
                      data-duration="1-month"
                    >
                      1 Month
                    </button>
                    <p>10% Discount</p>
                  </div>
                </div>
              </div>
            )}

            {/* Meals Per Week */}
            {selectedDuration.lunch !== "3-day" &&
              selectedDuration.dinner !== "3-day" &&
              (selectedDuration.lunch || selectedDuration.dinner) && (
                <div className="meals-per-week-selection">
                  <h2>Select Number of Meals per Week</h2>
                  <hr />
                  <div className="meals-btn-container">
                    <div className="meals-btn">
                      <button
                        onClick={() => handleMealsPerWeekSelection("5-days")}
                        className={
                          selectedMealsPerWeek === "5-days" ? "selected" : ""
                        }
                      >
                        5 Days
                      </button>
                      <p>Mon-Fri</p>
                    </div>
                    <div className="meals-btn">
                      <button
                        onClick={() => handleMealsPerWeekSelection("6-days")}
                        className={
                          selectedMealsPerWeek === "6-days" ? "selected" : ""
                        }
                      >
                        6 Days
                      </button>
                      <p>Mon-Sat</p>
                    </div>
                  </div>
                </div>
              )}

            {/* Quantity and Chapati Selection */}
            {selectedMealsPerWeek && (
              <>
                <div className="quantity-selection">
                  <h2>Select Quantity</h2>
                  <input
                    type="number"
                    value={selectedQuantity}
                    onChange={handleQuantityChange}
                    min="0"
                    max="10"
                    className="quantity-input"
                  />
                </div>
              </>
            )}

            {/* Start Date Selection */}
            {selectedQuantity && (
              <div className="start-date-selection">
                <h2>Select Start Date</h2>
                <input
                  className="date-picker"
                  type="date"
                  onChange={handleStartDateChange}
                  value={startDate}
                />
              </div>
            )}

            {/* Error and Success Messages */}
            {formError && <div className="error-message">{formError}</div>}
            {successMessage && (
              <div className="success-message">{successMessage}</div>
            )}

            {/* Submit Button */}
            <div className="submit-btn">
              <button type="submit" className="form-submit">
                Submit
              </button>
            </div>
          </form>
          <div className="total-price">
            <h2>Total Price: ₹{calculatePrice()}</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default SchedulePage;
