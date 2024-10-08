import { useState } from "react";
import "./SchedulePage.css";
import Navbar from "../navbar/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ScheduleSummary } from "../ScheduleSummary/ScheduleSummary";
// import axios from "axios";

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
  // const [chapatiCount, setChapatiCount] = useState(1);
  // const [riceType, setRiceType] = useState("normal");
  const [startDate, setStartDate] = useState("");
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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

  const handleQuantityChange = (event) => {
    setSelectedQuantity(parseInt(event.target.value));
  };

  // const handleChapatiCountChange = (event) => {
  //   setChapatiCount(parseInt(event.target.value));
  // };

  // const handleRiceTypeChange = (type) => {
  //   setRiceType(type);
  // };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const calculatePrice = () => {
    let totalPrice = 0;

    if (selectedMealPlan.lunch) {
      totalPrice += mealPlanPrices[selectedMealPlan.lunch];
    }
    if (selectedMealPlan.dinner) {
      totalPrice += mealPlanPrices[selectedMealPlan.dinner];
    }

    totalPrice *= selectedQuantity;

    if (selectedDuration.lunch && discounts[selectedDuration.lunch]) {
      totalPrice -= totalPrice * discounts[selectedDuration.lunch];
    }
    if (selectedDuration.dinner && discounts[selectedDuration.dinner]) {
      totalPrice -= totalPrice * discounts[selectedDuration.dinner];
    }

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

    // Validate if chapati count is selected
    // if (!chapatiCount) {
    //   setFormError("Please select how many chapatis you want!");
    //   validationError = true;
    // }

    // Validate if a rice type is selected
    // if (!riceType) {
    //   setFormError("Please select a rice type!");
    //   validationError = true;
    // }

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
      // chapatiCount: chapatiCount,
      // riceType: riceType,
      startDate: startDate,
      totalPrice: calculatePrice(),
    };

    console.log("Form Data:", formData);
    setSummaryDetails(formData);

    // Log the updated summaryDetails state after setting it
    console.log("Updated Summary Details:", summaryDetails);

    const resetForm = () => {
      setSelectedMeal("");
      setSelectedMealType("");
      setSelectedMealPlan({ lunch: "", dinner: "" });
      setSelectedDuration({ lunch: "", dinner: "" });
      setSelectedMealsPerWeek("");
      setSelectedQuantity(1);
      // setChapatiCount(1);
      // setRiceType("normal");
      setStartDate("");
      setFormError("");
      setSuccessMessage("");
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:7000/scheduleapi/getSchedule",
        formData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response);
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
            <p>
              Happy Grub delivers homely and healthy meals daily through our
              tiffin services.
            </p>
            <p>For our users we also provide amazing deals.</p>
            <p>1 week orders: 5% discount</p>
            <p>1 month orders: 10% discoun</p>
            <p>3 month order: 15% discount</p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Meal and Meal Type Selection */}
            <div className="meal-selection">
              <h2>Select Meal For</h2>
              <hr />
              <button
                onClick={() => handleMealSelection("lunch")}
                className={`lunch ${
                  selectedMealButton === "lunch" ? "selected" : ""
                }`}
              >
                <img src="https://www.happygrub.in/img/sun.png" alt="" />{" "}
                <span>Lunch</span>
              </button>
              <button
                onClick={() => handleMealSelection("dinner")}
                className={`dinner ${
                  selectedMealButton === "dinner" ? "selected" : ""
                }`}
              >
                <img src="https://www.happygrub.in/img/moon.png" alt="" />{" "}
                <span>Dinner</span>
              </button>
              <button
                onClick={() => handleMealSelection("both")}
                className={`both ${
                  selectedMealButton === "both" ? "selected" : ""
                }`}
              >
                <img src="https://www.happygrub.in/img/sun-moon.png" alt="" />{" "}
                <span>Both</span>
              </button>
            </div>

            {selectedMeal && (
              <div className="meal-type-selection">
                <h2>Select Meal Type</h2>
                <hr />
                <button
                  onClick={() => handleMealType("Veg")}
                  className={`Veg ${
                    selectedMealTypeButton === "Veg" ? "selected" : ""
                  }`}
                >
                  <img
                    src="https://www.happygrub.in/img/healthy-meal.png"
                    alt=""
                  />{" "}
                  <span>Veg </span>
                </button>
                <button
                  onClick={() => handleMealType("Non-Veg")}
                  className={`Non-veg ${
                    selectedMealTypeButton === "Non-Veg" ? "selected" : ""
                  }`}
                >
                  <img
                    src="https://www.happygrub.in/img/healthy-jain-meal.png"
                    alt=""
                  />{" "}
                  <span>Non-Veg</span>
                </button>
                <button
                  onClick={() => handleMealType("diabetic")}
                  className="diabetic"
                >
                  <img
                    src="https://www.happygrub.in/img/diabetiv-meal.png"
                    alt=""
                  />{" "}
                  <span>Diabetic Meals</span>
                </button>
              </div>
            )}

            {/* Meal Plan Selection */}
            {selectedMeal && selectedMealType && (
              <div className="meal-plan-selection">
                <h2>Select Your Meal Plan</h2>
                {selectedMeal.includes("lunch") && (
                  <>
                    <h3>Lunch Plans</h3>
                    <hr />
                    <button
                      onClick={() => handleMealPlan("lunch", "eco")}
                      className={`eco ${
                        selectedMealPlanButton.lunch === "eco" ? "selected" : ""
                      }`}
                    >
                      <img src="https://www.happygrub.in/img/bag.png" alt="" />
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
                      <img src="https://www.happygrub.in/img/bag.png" alt="" />
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
                      <img src="https://www.happygrub.in/img/bag.png" alt="" />
                      <span>Executive</span>
                    </button>
                    <p>₹180</p>
                  </>
                )}
                {selectedMeal.includes("dinner") && (
                  <>
                    <h3>Dinner Plans</h3>
                    <hr />
                    <button
                      onClick={() => handleMealPlan("dinner", "eco")}
                      className={`eco ${
                        selectedMealPlanButton.lunch === "eco" ? "selected" : ""
                      }`}
                    >
                      <img src="https://www.happygrub.in/img/bag.png" alt="" />{" "}
                      <span>Eco</span>
                    </button>
                    <p>₹130</p>
                    <button
                      onClick={() => handleMealPlan("dinner", "mini")}
                      className={`mini ${
                        selectedMealPlanButton.lunch === "mini"
                          ? "selected"
                          : ""
                      }`}
                    >
                      <img src="https://www.happygrub.in/img/bag.png" alt="" />{" "}
                      <span>Mini</span>
                    </button>
                    <p>₹150</p>
                  </>
                )}
                {selectedMeal.includes("both") && (
                  <>
                    <div className="Both-side">
                      <div className="lunch-side">
                        <h3>Lunch Plans</h3>
                        <hr />
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
                          />{" "}
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
                          />{" "}
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
                          />{" "}
                          <span>Executive</span>
                        </button>
                        <p>₹180</p>
                      </div>

                      <div className="dinner-side">
                        <h3>Dinner Plans</h3>
                        <hr />
                        <button
                          onClick={() => handleMealPlan("dinner", "eco")}
                          className="eco"
                        >
                          <img
                            src="https://www.happygrub.in/img/bag.png"
                            alt=""
                          />{" "}
                          <span>Eco</span>
                        </button>
                        <p>₹130</p>
                        <button
                          onClick={() => handleMealPlan("dinner", "mini")}
                          className="mini"
                        >
                          <img
                            src="https://www.happygrub.in/img/bag.png"
                            alt=""
                          />{" "}
                          <span>mini</span>
                        </button>
                        <p>₹150</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Duration Plan Selection for Lunch and Dinner */}
            {selectedMealPlan.lunch && (
              <div className="duration-plan-selection">
                <h2>Select Lunch Duration Plan</h2>
                <div className="duration-btn">
                  <div className="button-wrapper">
                    <button
                      onClick={() => handleDurationSelection("lunch", "3-day")}
                    >
                      3 Day
                    </button>
                    <p></p> {/* No discount for 3-day */}
                  </div>
                  <div className="button-wrapper">
                    <button
                      onClick={() => handleDurationSelection("lunch", "1-week")}
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
                <div className="duration-btn">
                  <div className="button-wrapper">
                    <button
                      onClick={() => handleDurationSelection("dinner", "3-day")}
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
                    >
                      1 Month
                    </button>
                    <p>10% Discount</p>
                  </div>
                </div>
              </div>
            )}

            {/* Meals Per Week */}
            {(selectedDuration.lunch || selectedDuration.dinner) && (
              <div className="meals-per-week-selection">
                <h2>Select Number of Meals per Week</h2>
                <div className="meals-btn-container">
                  <div className="meals-btn">
                    <button
                      onClick={() => handleMealsPerWeekSelection("5-days")}
                    >
                      5 Days
                    </button>
                    <p>Mon-Sat</p>
                  </div>
                  <div className="meals-btn">
                    <button
                      onClick={() => handleMealsPerWeekSelection("6-days")}
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
                    min="1"
                    max="10"
                  />
                </div>

                {/* <div className="chapati-selection">
                  <h2>Select Chapati Count</h2>
                  <input
                    type="number"
                    value={chapatiCount}
                    onChange={handleChapatiCountChange}
                    min="1"
                    max="10"
                  />
                </div> */}

                {/* Rice Options */}
                {/* <div className="rice-selection">
                  <h2>Select Rice Type</h2>
                  <button onClick={() => handleRiceTypeChange("normal")}>
                    Normal Rice
                  </button>
                  <button onClick={() => handleRiceTypeChange("brown")}>
                    Brown Rice
                  </button>
                </div> */}
              </>
            )}

            {/* Start Date Selection */}
            {selectedQuantity && (
              <div className="start-date-selection">
                <h2>Select Start Date</h2>
                <input
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
            <button type="submit" className="form-submit">
              Submit
            </button>
          </form>
          <div className="total-price">
            <h2>Total Price: ₹{calculatePrice()}</h2>
          </div>

          {summaryDetails && (
            <ScheduleSummary summaryDetails={summaryDetails} />
          )}
        </div>
      </div>
    </>
  );
};

export default SchedulePage;
