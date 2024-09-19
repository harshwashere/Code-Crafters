import "./home.css";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import Peekmenu from "../../components/peekmenu/Peekmenu";
import { Homeabout } from "../../components/homeAbout/Homeabout";
// import { Swipers } from "../../components/swiper/Swiper";
// import { Chef } from "../../components/chef's/Chef";
import { Footer } from "../../components/footer/Footer";
import Mealplan from "../../components/MealPlan/Mealplan";

export const Home = () => {
  return (
    <>
      <Navbar />
      <div>
        <Header />
        <Peekmenu />
        <Mealplan />
        <Homeabout />
        {/* <Swipers /> */}
        {/* <Chef /> */}
      </div>
      <Footer/>
    </>
  );
};
