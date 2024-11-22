const mongoose = require("mongoose"); // this imports the mongoose library

const snowboardSchema = new mongoose.Schema ({
    name: {
        type: String,   // The name is a string
        required: true  // Name is required
      },

     shape: {
        type: String,   // Height is a number (could be in centimeters or inches)
        required: true  // Height is required
      },
      profile: {
        type: String,   // Weight is a number (could be in kilograms or pounds)
        required: true  // Weight is required
      },
      abilityLevel: { // skill level is a string
        type: String,
        require: true
      },
      review: {
        type: String,
        required: true 
      }
})



const Snowboard = mongoose.model("Snowboard", snowboardSchema)  // this creates the model tha we are going to export to server.js

module.exports = Snowboard  // this declares the variable cocktails as well exports the model that we created