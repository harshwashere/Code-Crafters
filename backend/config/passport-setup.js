import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import "./key";
import { key } from "./key";

export const Passport = passport.use(
  new GoogleStrategy(
    {
      callbackURL: "/auth/google/redirect",
      clientID: key.google.clientID,
      clientSecret: key.google.clientSecret,
    },
    () => {}
  )
);
