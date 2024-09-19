import { useState } from "react";
import "./mealplan.css";
import { NavLink } from "react-router-dom";

const Mealplan = () => {
  const [click, setClick] = useState('Veg')

  return (
    <>
      <div className="mainMeal">
        <div className="ourMealTitle">
          <div className="mealTitleHead">
            <h1>
              Our <span>Meal</span> Plan
            </h1>
            <p>
              Preparations to temperature controlled packaging and
              transportation of food.
            </p>
          </div>
          <div className="ourMealNav">
            <button onClick={() => setClick('Veg')} className={click === 'Veg' ? "clicked" : "catBtn"}>Veg</button>
            <button onClick={() => setClick('Non-Veg')} className={click === 'Non-Veg' ? "clicked" : "catBtn"}>Non-Veg</button>
          </div>
        </div>
        <div className="mainMealCard" >
          <div className="mainMealChild">
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      </div>
    </>
  );
};

const Card = () => {
  return (<>
    <div className="mealCard">
      <div className="ourMealImg">
        <NavLink to='meal-single.html'><img src="images/img14.png" alt="our-meal-img" className="img-fluid w-100" /></NavLink>
      </div>
      <div className="ourMealContent">
        <div className="ourMealHead">
          <div className="ourMealTitle">
            <h2>
              <NavLink to="meal-single.html">Regular Thali</NavLink>
            </h2>
          </div>
          <div className="ourMealPrice">
            <span>$ 05</span>
          </div>
        </div>
        <div className="ourMealPara">
          <p>
            {" "}
            Papad / Dalfry / 5 Roti / Jeera Rice / Raita / 1 Sweet / Salad
            / Paneer Chatpata
          </p>
        </div>
        <div className="ourMealBtn">
          <NavLink to="check-out.html" className="btn btnPrimary">
            Add To Cart
          </NavLink>
          <NavLink to="javascript:void(0);" className="ourMealWishlist">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
            >
              <path
                d="M2.09519 9.17766C0.148184 6.57021 0.797187 2.65904 4.0422 1.35532C7.28721 0.0515967 9.23422 2.65904 9.88322 3.96277C10.5322 2.65904 13.1282 0.0515967 16.3732 1.35532C19.6183 2.65904 19.6183 6.57021 17.6712 9.17766C15.7242 11.7851 9.88322 17 9.88322 17C9.88322 17 4.0422 11.7851 2.09519 9.17766Z"
                stroke="#999999"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </NavLink>
        </div>
      </div>
    </div>
  </>)
}

export default Mealplan;
