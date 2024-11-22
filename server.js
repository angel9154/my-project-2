// we start by importing modules libraries and loading express 
const express = require("express") // this imports the express framework to nodejs
const app = express ();  // this creates an instance of the express application 
const dotenv = require("dotenv"); // it is saying the program to import the package in .env that would be the link i have in that file
dotenv.config(); // it is saying to configure and load the enviroments variables from the .env file 
const mongoose = require("mongoose"); // this is saying to import the mongoose library 
const morgan = require("morgan"); // this is importing the middleware morgan that logs information from http requests
const methodOverride = require("method-override"); // this is a middleware that tricks the express app into thinking that we did PUT and DELETE request from the browser
// const path = require("path") // this line imports the path module , the path module creates a path from one file to another file
const Snowboard = require ("./models/snowboard.js");




app.use(express.urlencoded({ extended: true })); // this is the middleware that extracts the data and converts it into a javascript object and then attaches it to the req.obj
app.use(methodOverride("_method")); // new
app.use(morgan("dev")); // this allows me to use the morgan middleware in my node.js and the word "dev" is a format for logging http request 
// app.use(express.static(path.join(__dirname, "public"))); // this creates a path to the public directory to retrive files from it 
mongoose.connect(process.env.MONGODB_URI); // this is saying to connect to the using the connection string in the .env file


// now we log connection status to terminal on start
mongoose.connection.on ("connected", () => {
    console.log(`mongoose is connected to ${mongoose.connection.name}.`)
});



  app.post("/snowboard", async (req, res) => {
    const { name, shape, profile, abilityLevel, review } = req.body;
  
    const newSnowboard = new Snowboard({  name, shape, profile, abilityLevel, review })
     await newSnowboard.save()

       // After saving, fetch all snowboards and render the results page with the updated data
    const snowboards = await Snowboard.find();  // Fetch all snowboards, including the newly added one

    console.log(req.body);
    res.render('snowboard/results.ejs', { snowboards });
  })

  // POST route to delete a snowboard
app.post("/snowboard/delete/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      // Find and delete the snowboard by its ID
      await Snowboard.findByIdAndDelete(id);
  
      // After deletion, redirect to the results page to show the updated list
      res.redirect("/snowboard/results");
    } catch (err) {
      console.error(err);
      res.status(500).send("Error deleting snowboard");
    }
  });

// POST route to update the snowboard details
app.post("/snowboard/update/:id", async (req, res) => {
    const { id } = req.params;
    const { name, shape, profile, abilityLevel, review } = req.body;
  
    try {
      // Find the snowboard by ID and update its details
      await Snowboard.findByIdAndUpdate(id, { name, shape, profile, abilityLevel, review });
  
      // Redirect to the results page after the update
      res.redirect("snowboard/results.ejs");
    } catch (err) {
      console.error(err);
      res.status(500).send("Error updating snowboard");
    }
  });
  

app.get("/", (req, res) => {
res.render("snowboard/index.ejs")
})

app.get("/form", (req, res) => {
    res.render("snowboard/form.ejs")
    })

    app.get("/snowboard/edit/:id", async (req, res) => {
        const { id } = req.params;

        try {
          // Find the snowboard by ID
          const snowboard = await Snowboard.findById(id);
      
          // Render the edit page with the snowboard data
          res.render("snowboard/editform.ejs", { snowboard });
        } catch (err) {
          console.error(err);
          res.status(500).send("Error fetching snowboard details");
        }
      
        })

        
    app.get("/snowboard/results", async (req, res) => {
        try {
            // Fetch all snowboards from the database
            const snowboards = await Snowboard.find();
        
            // Pass the snowboards data to the EJS view
            res.render('snowboard/results.ejs', { snowboards });  // 'snowboards' is the variable sent to the EJS view
          } catch (err) {
            console.error(err);
            res.status(500).send('Error fetching snowboards');
          }
        // res.render("snowboard/results.ejs",)
        })

 

    app.listen(3002, () => {
    console.log("snowboard project has started")
   });



