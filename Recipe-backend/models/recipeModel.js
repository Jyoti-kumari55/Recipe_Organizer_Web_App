const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cuisine: {
    type: String,
    enum: [
      "Italian",
      "Asian",
      "American",
      "Mexican",
      "Mediterranean",
      "Pakistani",
      "Japanese",
      "Moroccan",
      "Korean",
      "Greek",
      "Thai",
      "Indian",
      "Turkish",
      "Chinese",
      "Brazilian"
    ],
  },
  ingredients: {
    type: Array,
    default:[]
  },
  instructions: {
    type: Array,
    default:[]
  },
  image: {
    type: String,
    required: true
  }
}, {timestamps: true});

const Recipe = mongoose.model("TestRecipe", recipeSchema);
module.exports = Recipe
