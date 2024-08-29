import { FaArrowRight } from "react-icons/fa";
import "./header.css";

const Header = () => {
  return (
    <>
      <div id="home" className="header">
        <div className="div1header">
          <div className="hungrydiv">
            <h3>Hungry?</h3>
          </div>
          <div className="tagline">
            <h1>
              JUST COME TO
              <br />
              CODE CRAFTERS & ORDER
            </h1>
          </div>
          <p>
            Here You Will Find All the Best Quality And Pure Food. Order
            <br /> Now To Satisfy Your Hunger Pangs
          </p>
          <div className="orderNowGroup">
            <button className="orderNowBtn">Order Now</button>
            <button>
              Explore More{" "}
              <i>
                <FaArrowRight />
              </i>
            </button>
          </div>
        </div>
        <div className="headerImg">
          <img src="./src/assets/Header-Image.jpg" alt="Header-Image.jpg" />
        </div>
      </div>
    </>
  );
};

export default Header;
