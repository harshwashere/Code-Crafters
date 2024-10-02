import { useState } from 'react';
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import './DateSelector.css';


// Generate a sequence of dates dynamically
const generateDates = (numDays = 30) => {
  const today = new Date();
  const dates = [];
  for (let i = 0; i < numDays; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const day = date.getDate().toString().padStart(2, '0'); // Format day with 2 digits
    const label = date.toLocaleDateString('en-US', { weekday: 'short' });
    dates.push({ day, label });
  }
  return dates;
};

const DateSelector = () => {
  const allDates = generateDates();
  const [activeDate, setActiveDate] = useState(allDates[0].day); // Initially, the first date is active
  const [startIndex, setStartIndex] = useState(0); // Track visible starting index of the 7 dates
  const totalDates = allDates.length; // Total number of generated dates

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1); // Slide left
    }
  };

  const handleNext = () => {
    if (startIndex + 7 < totalDates) {
      setStartIndex(startIndex + 1); // Slide right
    }
  };

  return (
    <div className="date-selector">
      <button
        className="prev-arrow"
        onClick={handlePrev}
        disabled={startIndex === 0} // Disable left arrow when at the first date
      >
        <FaAngleLeft />
      </button>
      <div className="dates-container">
        <div
          className="date-track"
          style={{
            transform: `translateX(-${(startIndex * 100) / 7}%)`, // Adjust for visible dates
            transition: 'transform 0.3s ease', // Smooth transition
            display: 'flex', // Ensure the track is a flex container
          }}
        >
          {allDates.slice(startIndex, startIndex + 7).map((date, index) => (
            <button
              key={index}
              className={`date ${activeDate === date.day ? 'active' : ''}`}
              onClick={() => setActiveDate(date.day)}
            >
              {date.day} <br /> {date.label}
            </button>
          ))}
        </div>
      </div>
      <button
        className="next-arrow"
        onClick={handleNext}
        disabled={startIndex + 7 >= totalDates} // Disable right arrow when at the last set of dates
      >
        <FaAngleRight />
      </button>
    </div>
  );
};

export default DateSelector;
