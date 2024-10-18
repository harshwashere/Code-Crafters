import "./chef.css";

export const Chef = () => {
  return (
    <>
      <div className="chefSection">
        <div className="chefTitle">
          <h1>OUR SPECIAL CHEF&apos;S
            <span className="heading-underline-chef"></span>
          </h1>
          <p>
            Featured below are some of our special chefs who work
            to prepare your meals.
            <br />
            All of our chef&apos;s are certified and licesned.
          </p>
        </div>

        <div className="chefImg">
          <img src="https://i.pinimg.com/564x/be/0d/30/be0d30b0678a21d0141a55a1b6608997.jpg" alt="" className="img1" width="90%" />
          <img src="https://i.pinimg.com/564x/5f/9c/91/5f9c91fc2df3edb394de5aa2dd51e408.jpg" alt="" width="90%" />
          <img src="https://i.pinimg.com/564x/46/6a/65/466a656fc3ac34236780c0d85a345b3c.jpg" alt="" className="img3" width="90%" />
        </div>
      </div>
    </>
  );
};