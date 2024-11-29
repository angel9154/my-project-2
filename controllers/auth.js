const express = require("express");
const router = express.Router();
const { User } = require("../models/snowboard.js"); 
// so i learned today about destructuring and what that means is that if you are exporting more than one model
// you have to put them in { curly brackets } and for each model i want export i have to put the name in the curly brackets

const bcrypt = require("bcrypt");
const { model } = require("mongoose");


router.get("/sign-up", (req, res) => {
    res.render("auth/sign-up.ejs")

});


router.post("/sign-up", async (req, res) => {
    console.log("Received request:", req.body); 
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (userInDatabase) {
      return res.send("Username already taken.");
    }
    
    if (req.body.password !== req.body.confirmPassword) {
      return res.send("Password and Confirm Password must match");
    }
    
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  req.body.password = hashedPassword;
  
  // validation logic
  try {
    const user = await User.create(req.body);
    res.send(`Thanks for signing up ${user.username}`);
      } catch (error) {
                console.error("Error creating user:", error);
  
                     res.status(500).send("Something went wrong. Please try again later.");
  
          1    }
  
  });
  
  router.get("/sign-in", (req, res) => {
    res.render("auth/sign-in.ejs");
  });
  
  
    
  router.post("/sign-in", async (req, res) => {
      const userInDatabase = await User.findOne({ username: req.body.username}) // this is saying to see if the username in the variable is the same one logged in the database
      if (!userInDatabase){ // if it doesnt find it then return this text
          return res.send("did not work, try again")
      }
  
      const validPassword = bcrypt.compareSync( // this is saying to compare the plain text password to the hash password in the data base 
          req.body.password, // this contains the plain text password
          userInDatabase.password // this contains the hash password in the database
      )
      if (!validPassword) {
          return res.send("try again")
      }
  
       // There is a user AND they had the correct password. Time to make a session!
    // Avoid storing the password, even in hashed format, in the session
    // If there is other data you want to save to `req.session.user`, do so here!
    req.session.user = {
      username: userInDatabase.username,
      _id: userInDatabase._id
    };
  
    req.session.save(() => {
      res.redirect("/");
    });
  })
  
  router.get("/sign-out", (req, res) => {
    req.session.destroy(() => {
      res.redirect("/");
    });
    
  });
  
  module.exports = router;