import './homeabout.css'
import { PiBowlFood } from "react-icons/pi";
import { TbFolderHeart, TbTruckDelivery } from "react-icons/tb";

export const Homeabout = () => {
  return (
    <>
      <div className="homeAbout">
        <div className="homeAboutHead">
          <h1>WHY CHOOSE US?</h1>
          <p>
            You will choose us becuase you get the best quality food <br /> from
            us and deliver fast.
          </p>
        </div>
        <div className='homeAboutContent'>
          <div className='homeAboutContent1'>
            <i className='aboutIcon'>
              <PiBowlFood />
            </i>
            <h1>Serve Healthy Food</h1>
            <p>
              We serve all healthy food here. You <br />
              can choose any food you like.
            </p>
          </div>
          <div className='homeAboutContent1'>
            <i>
              <TbFolderHeart />
            </i>
            <h1>Best Quality</h1>
            <p>
              Our food quality excellent. You will
              <br />
              get exactly what you want.
            </p>
          </div>
          <div className='homeAboutContent1'>
            <i>
              <TbTruckDelivery />
            </i>
            <h1>Fast Delivery</h1>
            <p>
              You can say the main goal of our delivery man is to deliver orders
              quickly.
              You will recieve it shortly after ordering.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
