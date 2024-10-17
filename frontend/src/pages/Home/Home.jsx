import "./home.css";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import Peekmenu from "../../components/peekmenu/Peekmenu";
import { Homeabout } from "../../components/homeAbout/Homeabout";
import { Footer } from "../../components/footer/Footer";
import Mealplan from "../../components/MealPlan/Mealplan";
import { Chef } from "../../components/chef's/Chef";
import Team from "../../components/Team/Team";
// import { useLocation } from "react-router-dom";
// import { useEffect } from "react";
// import useAuth from "../../store/useAuth";

export const Home = () => {
  // const location = useLocation()
  // const { setIsloggedin } = useAuth();

  // const queryParams = new URLSearchParams(location.search)
  // const token = queryParams.get('token');
  // console.log("tokem", token)
  // useEffect(() => {
  //   localStorage.setItem("token", token)
  //   setIsloggedin(true)
  // }, [setIsloggedin, token])

  return (
    <>
      <Navbar />
      <div>
        <Header />
        <Peekmenu />
        <Mealplan />
        <Homeabout />
        <Chef />
        <Team />
      </div>
      <Footer />
    </>
  );
};
