import { SignIn } from "@clerk/clerk-react";
import './signin.css'

export const Signin = () => {
  return (
    <>
      <div className="mainSignInDiv">
        <SignIn />
      </div>
    </>
  );
};
