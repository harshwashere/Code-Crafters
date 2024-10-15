/* eslint-disable react/prop-types */
import "./MealCard.css";

const MealCard = ({ meal }) => {
  // Check if both data is coming (mealFor and type)
  const isDinner = meal.mealFor === "Dinner"; // Example condition, adjust as needed
  const isVeg = meal.type === "Non-Veg";

  return (
    <section className="meal-card">
      <h3>
        {meal.mealFor} <span className="badge">{meal.plan}</span>
      </h3>
      <div className="meal-typeImg">
        {isVeg ? (
          <img
            src="https://www.vhv.rs/dpng/d/437-4370761_non-veg-icon-non-veg-logo-png-transparent.png"
            alt=""
            width="15px"
            height="15px"
          />
        ) : (
          <img
            src="https://www.clipartmax.com/png/middle/299-2998556_vegetarian-food-symbol-icon-non-veg-symbol-png.png"
            alt=""
            width="15px"
            height="15px"
          />
        )}

        <p>{meal.type}</p>
      </div>
      <p>{meal.name}</p>
      <p className="meals">{meal.meals.join(", ")}</p>
      <div className="delivery-time">
        <p>{isDinner ? "Dinner Delivery" : "Standard Delivery"}</p>
        <p>{isDinner ? "7:00 pm - 09:00 pm" : "11:30 am - 01:30 pm"}</p>
      </div>
    </section>
  );
};

export default MealCard;
