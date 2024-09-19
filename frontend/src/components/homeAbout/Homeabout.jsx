import './homeabout.css'
import { PiBowlFood } from "react-icons/pi";
import { TbFolderHeart, TbTruckDelivery } from "react-icons/tb";

export const Homeabout = () => {
  return (
    <>
      <div className="homeAbout">
        <div className="homeAboutHead">
          <h1>How <span>Scheduling </span>works</h1>
          <p>
            We made our website very easy to navigate while ordering.
          </p>
        </div>
        <div className='homeAboutContent'>
          <div className='homeAboutContent1'>
            <i className='aboutIcon'>
              <PiBowlFood />
            </i>
            <h1>Choose your preferences</h1>
            <p>
              You can easily choose the your preferences for tiffin. <br />
              You have to define the frequency for your tiffin. 
            </p>
          </div>
          <div className='homeAboutContent1'>
            <i>
              <TbFolderHeart />
            </i>
            <h1>Choose your plan</h1>
            <p>
              You can choose from plans that we crafted specialy keeping in mind of your taste.
              Payment is very easy in this stage.
            </p>
          </div>
          <div className='homeAboutContent1'>
            <i>
              <TbTruckDelivery />
            </i>
            <h1>Your tiffin is scheduled</h1>
            <p>
              Your tiffin is scheduled and now we will deliver it at the given frequency. <br />
              Happy eating and Healthy eating.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
