const express = require("express");
const oauth = express.Router();
const passport = require("passport");
const GithubStrategy = require("passport-github2").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const session = require("express-session");
const oauthGithubController = require("../controller/github");
const oauthGoogleController = require("../controller/google");
const usersService = require("../services/users");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

oauth.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

oauth.use(passport.initialize());
oauth.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email =
          profile.emails?.[0]?.value || `${profile.username}@github.local`;

        const avatar = profile.photos?.[0]?.value;

        let existingUser = await usersService.findOne({ email });

        if (!existingUser) {
          const randomPassword = crypto.randomBytes(12).toString("base64");
          const hashedPassword = await bcrypt.hash(randomPassword, 10);

          const newUserData = {
            firstName: profile.displayName || profile.username || "GitHubUser",
            lastName: "GitHubUser",
            userName: profile.username || "GitHubUser",
            email,
            avatar,
            password: hashedPassword,
          };
          existingUser = await usersService.createUser(newUserData);
        }

        return done(null, existingUser);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email =
          profile.emails?.[0]?.value || `${profile.id}@google.local`;
        const avatar = profile.photos?.[0]?.value;

        let existingUser = await usersService.findOne({ email });

        if (!existingUser) {
          const generatedPassword = crypto.randomBytes(12).toString("base64");

          const hashedPassword = await bcrypt.hash(generatedPassword, 10);

          const newUserData = {
            firstName: profile.name.givenName || profile.displayName,
            lastName: profile.name.familyName || "",
            userName: profile.username || "GoogleUser",
            email,
            avatar,
            password: hashedPassword,
          };

          existingUser = await usersService.createUser(newUserData);
        }

        return done(null, existingUser);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

oauth.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

oauth.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/",
    session: false,
  }),
  oauthGithubController.manageOauthCallback
);

oauth.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

oauth.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  oauthGoogleController.authGoogle
);

module.exports = oauth;
