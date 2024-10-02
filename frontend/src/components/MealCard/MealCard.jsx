// import React from 'react';
import './MealCard.css';

const MealCard = () => {
  return (
    <section className="meal-card">
      <h3>
        Lunch <span className="badge">Lite</span>
      </h3>
      <p className="high-protein">High Protein</p>
      <p>North Indian Lite (Nonveg)</p>
      <p>Andhara Ginger Chicken, Dal Tadka, Aloo Dum Pulao</p>
      <div className="delivery-time">
        <p>Standard Delivery</p>
        <p>11:30 am - 01:30 pm</p>
      </div>
    </section>
  );
};

export default MealCard;
