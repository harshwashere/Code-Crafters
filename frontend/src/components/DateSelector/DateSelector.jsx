/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import "./DateSelector.css";

// Generate a sequence of dates dynamically
const generateDates = (startDate, numDays = 60) => {
  const today = new Date(startDate);
  const dates = [];
  for (let i = 0; i < numDays; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const day = date.getDate().toString().padStart(2, "0"); // Format day with 2 digits
    const label = date.toLocaleDateString("en-US", { weekday: "short" });
    dates.push({ date, day, label });
  }
  return dates;
};

// Get valid dates based on meals per week
const getValidDates = (dates, mealsPerWeek) => {
  const validDays = {
    "5-days": [1, 2, 3, 4, 5], // Monday to Friday
    "6-days": [1, 2, 3, 4, 5, 6], // Monday to Saturday
    "7-days": [0, 1, 2, 3, 4, 5, 6], // All days
  };

  const selectedDays = validDays[mealsPerWeek] || [];
  return dates.filter((dateObj) =>
    selectedDays.includes(dateObj.date.getDay())
  );
};

const DateSelector = ({ startDate, onDateChange, mealsPerWeek }) => {
  const allDates = generateDates(startDate, 40); // Generate more dates for testing
  const validDates = getValidDates(allDates, mealsPerWeek);

  const [activeDateIndex, setActiveDateIndex] = useState(0); // Track active date index
  const [displayedDateIndex, setDisplayedDateIndex] = useState(0); // Track displayed date index

  useEffect(() => {
    if (validDates.length > 0) {
      onDateChange(validDates[activeDateIndex].date); // Notify parent about the active date change
    }
  }, [activeDateIndex, validDates, onDateChange]);

  const handlePrev = () => {
    if (displayedDateIndex > 0) {
      setDisplayedDateIndex((prevIndex) => prevIndex - 1); // Move one slide to the left
    }
  };

  const handleNext = () => {
    if (displayedDateIndex < validDates.length - 1) {
      setDisplayedDateIndex((prevIndex) => prevIndex + 1); // Move one slide to the right
    }
  };

  // Function to handle date selection manually
  const handleDateClick = (index) => {
    setActiveDateIndex(index); // Set active date index based on the clicked date
  };

  return (
    <div className="date-selector">
      <button
        className="prev-arrow"
        onClick={handlePrev}
        disabled={displayedDateIndex === 0} // Disable left arrow when at the first date
      >
        <FaAngleLeft />
      </button>
      <div className="dates-container">
        <div
          className="date-track"
          style={{
            transform: `translateX(-${
              (displayedDateIndex / validDates.length) * 100
            }%)`, // Adjust for visible dates
            transition: "transform 0.3s ease", // Smooth transition
            display: "flex", // Ensure the track is a flex container
            width: `${validDates.length * 100}vw`, // Set width for all valid dates
          }}
        >
          {validDates.map((dateObj, index) => (
            <button
              key={index}
              className={`date ${activeDateIndex === index ? "active" : ""}`}
              onClick={() => handleDateClick(index)} // Set active index on click
            >
              {dateObj.day} <br /> {dateObj.label}
            </button>
          ))}
        </div>
      </div>
      <button
        className="next-arrow"
        onClick={handleNext}
        disabled={displayedDateIndex + 1 >= validDates.length} // Disable right arrow when at the last set of dates
      >
        <FaAngleRight />
      </button>
    </div>
  );
};

export default DateSelector;
