/* eslint-disable react/prop-types */

import './ScheduleSummary.css'; // Make sure to create a CSS file for styling

export const ScheduleSummary = ({ summaryDetails }) => {
    console.log(summaryDetails);
    if (!summaryDetails) {
      return <div>No order details found</div>;
    }
  return (
    <div className="order-summary">
      <h2>Order Summary</h2>
      <hr />
      <div className="summary-item">
        <strong>Meal For:</strong> {summaryDetails.mealFor}
      </div>
      <div className="summary-item">
        <strong>Meal Type:</strong> {summaryDetails.mealType}
      </div>
      <div className="summary-item">
        <strong>Lunch Plan:</strong> {summaryDetails.mealPlans.lunch.join(", ")}
      </div>
      <div className="summary-item">
        <strong>Dinner Plan:</strong> {summaryDetails.mealPlans.dinner.join(", ")}
      </div>
      <div className="summary-item">
        <strong>Lunch Duration:</strong> {summaryDetails.duration.lunch}
      </div>
      <div className="summary-item">
        <strong>Dinner Duration:</strong> {summaryDetails.duration.dinner}
      </div>
      <div className="summary-item">
        <strong>Meals Per Week:</strong> {summaryDetails.mealsPerWeek}
      </div>
      <div className="summary-item">
        <strong>Quantity:</strong> {summaryDetails.quantity}
      </div>
      <div className="summary-item">
        <strong>Chapati Count:</strong> {summaryDetails.chapatiCount}
      </div>
      <div className="summary-item">
        <strong>Rice Type:</strong> {summaryDetails.riceType}
      </div>
      <div className="summary-item">
        <strong>Start Date:</strong> {summaryDetails.startDate}
      </div>
      <div className="summary-item">
        <strong>Total Price:</strong> ₹{summaryDetails.totalPrice}
      </div>
    </div>
  );
};


