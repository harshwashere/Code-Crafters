import { useState } from "react";
import "./mealplan.css";
import useAuth from "../../store/useAuth";

const Mealplan = () => {
  const { Menu } = useAuth()

  const [Categories, setCategories] = useState('Veg Dishes')

  const [click, setClick] = useState('Veg')

  const filterdata = Array.isArray(Menu)
    ? Menu.filter((items) =>
      String(items.category)
        .toLowerCase()
        .includes(String(Categories).toLowerCase())
    )
    : [];

  const MealPlan = ((data, index) => {
    return (<>
      <div key={index} className="mealCard">
        <div className="ourMealImg">
          <img src={data.imageURL} alt={data.name} />
        </div>
        <div className="ourMealContent">
          <div className="ourMealHead">
            <div className="ourMealTitle">
              <h3>
                {data.name}
              </h3>
            </div>
            <div className="ourMealPrice">
              <span>${data.price}</span>
            </div>
          </div>
          <div className="ourMealPara">
            <p>
              {data.description}
            </p>
          </div>
          <div className="ourMealBtn">
            <button to="check-out.html" className="btn btnPrimary">
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </>)
  })

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
            <button onClick={() => {
              setClick('Veg');
              setCategories("Veg Dishes")
            }} className={click === 'Veg' ? "clicked" : "catBtn"}>Veg</button>
            <button onClick={() => {
              setClick('Non-Veg')
              setCategories('Fish & Chicken')
            }} className={click === 'Non-Veg' ? "clicked" : "catBtn"}>Non-Veg</button>
          </div>
        </div>
        <div className="mainMealCard" >
          <div className="mainMealChild">
            {Menu ?
              <>
                {filterdata.map(MealPlan)}
              </> :
              <>
                <div className="mainLoader">
                  <div className="loader"></div>
                </div>
              </>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Mealplan;
