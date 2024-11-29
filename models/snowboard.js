const mongoose = require("mongoose"); // this imports the mongoose library

const snowboardSchema = new mongoose.Schema ({
    name: {
        type: String,  
        required: function() { return this.isAddingSnowboard; }, 
      },

     shape: {
        type: String,   
        required: function() { return this.isAddingSnowboard; },
      },
      profile: {
        type: String,  
        required: function() { return this.isAddingSnowboard; }, 
      },
      abilityLevel: { 
        type: String,
        require: function() { return this.isAddingSnowboard; },
      },
      review: {
        type: String,
        required: function() { return this.isAddingSnowboard; },
      }
})

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema );
const Snowboard = mongoose.model("Snowboard", snowboardSchema)  // this creates the model tha we are going to export to server.js

module.exports = { User, Snowboard };