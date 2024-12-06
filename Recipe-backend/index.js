require("./db/dbConnect");
const express = require("express");
const cors = require("cors");
const Recipe = require("./models/recipeModel");
const fs = require("fs");
const path = require("path");
const app = express();

const corsOption = ({
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
});

app.use(express.json());
app.use(cors(corsOption));
app.get("/", (req, res) => {
  res.send("Hello Recipe Organiser...");
});

const filePath = path.resolve(__dirname, "recipe.json");
const jsonData = fs.readFileSync(filePath, "utf8");

const recipeData = JSON.parse(jsonData);

// function seedData() {
//     try {
//         for(const recipes of recipeData){
//             const newRecipe = new Recipe({
//                 name: recipes.name,
//                 cuisine: recipes.cuisine,
//                 ingredients: recipes.ingredients,
//                 instructions: recipes.instructions,
//                 image: recipes.image
//             });
//             newRecipe.save();
//             // console.log('All Recipe: ', newRecipe.name);
//         }
//     } catch (error) {
//         if(error.code === "ENOENT") {
//             console.error("File not found: ", filePath);
//         }else {
//             console.error("An error occurred: ", error.message);
//         }

//     }

// }
// seedData();

// add a recipe, get all recipe, get a recipe by id, delete a recipe, update a recipe

// Post a Recipe
app.post("/recipe", async (req, res) => {
  try {
    const { name, cuisine, ingredients, instructions, image } = req.body;

    const newRecipe = new Recipe({
      name,
      cuisine,
      ingredients: ingredients || [],
      instructions: instructions || [],
      image,
    });
    await newRecipe.save();

    if (!name || !cuisine || !image) {
      res.status(400).json("Name, Cuisine and Image of a recipe are required.");
    }

    res
      .status(200)
      .json({ message: "Recipe added successfully.", recipe: newRecipe });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while fetching the data.",
      error: error.message,
    });
  }
});

// Get all recipe
app.get("/recipe", async (req, res) => {
  try {
    console.log(req.params,  req.query);
    const recipes = await Recipe.find().limit(req.query.limit);
    res.status(200).json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while fetching the data.",
      error: error.message,
    });
  }
});

// Get a recipe by id
app.get("/recipe/:id", async (req, res) => {
  const recipeId = req.params.id;
  try {
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(400).json({ error: "No recipe found with this ID." });
    }
    return res.status(200).json({ message: "Recipe Found", detail: recipe });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while fetching the data.",
      error: error.message,
    });
  }
});

//Delete a recipe
app.delete("/recipe/:id", async (req, res) => {
  const recipeId = req.params.id;
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(recipeId);
    if (!deletedRecipe) {
      return res.status(404).json({ error: "No recipe found with this ID." });
    }
    res
      .status(200)
      .json({ message: "Recipe deleted successfully.", detail: deletedRecipe });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while fetching the data.",
      error: error.message,
    });
  }
});

// Update a recipe
app.put("/recipe/:id", async (req, res) => {
  const recipeId = req.params.id;
  const updatedRecipeData = req.body;
  try {
    const updateRecipe = await Recipe.findByIdAndUpdate(
      recipeId,
      updatedRecipeData,
      { new: true }
    );
    if (!updateRecipe) {
      return res.status(404).json({ error: "No recipe found with this ID." });
    }
    res
      .status(200)
      .json({ message: "Recipe updated successfully,", detail: updateRecipe });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while fetching the data.",
      error: error.message,
    });
  }
});

const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}.`);
});
