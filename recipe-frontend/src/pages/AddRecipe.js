import React, { useState } from "react";
import Header from "../components/Header";

const AddRecipe = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    cuisine: "",
    image: "",
    ingredients: "",
    instructions: "",
  });

  const inputChangeHandler = (e) => {
    let { name, value } = e.target;
    //console.log("name", name, "value", value)
    // if(name === "ingredients" || name === "instruction"){
    //   value = value ? value.split(", ") : value
    // }
    setFormData((preValue) => ({
      ...preValue,
      [name]: value,
    }));
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (formData.ingredients) {
        formData.ingredients = formData.ingredients
          ? formData.ingredients.split(",")
          : formData.ingredients;
      }
      if (formData.instructions) {
        formData.instructions = formData.instructions
          ? formData.instructions.split(",")
          : formData.instructions;
      }
      console.log(formData);

      const response = await fetch(
        "https://recipe-backend-azure.vercel.app/recipe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add a recipe.");
      }
      const data = await response.json();
      console.log("Recipe added: ", data);

      setFormData({
        name: "",
        cuisine: "",
        image: "",
        instructions: "",
        ingredients: "",
      });
      setSuccessMessage("Recipe added successfully.");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <Header />
      <main className="container">
        <h1>Add Recipe</h1>
        {successMessage && (
          <div class="alert alert-success" role="alert">
            {successMessage}
          </div>
        )}
        <form className="w-25" onSubmit={formSubmitHandler}>
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control mb-4"
            value={formData.name}
            onChange={inputChangeHandler}
            required
          />
          <label htmlFor="cuisine" className="form-label">
            Cuisine Type:
          </label>
          <input
            type="text"
            id="cuisine"
            name="cuisine"
            className="form-control mb-4"
            value={formData.cuisine}
            onChange={inputChangeHandler}
            required
          />
          <label htmlFor="image" className="form-label">
            Image Link:
          </label>
          <input
            type="text"
            id="image"
            name="image"
            className="form-control mb-4"
            value={formData.image}
            onChange={inputChangeHandler}
            required
          />
          <label htmlFor="ingredients">Ingredients</label>
          <textarea
            class="form-control mb-4"
            placeholder="Write your Ingredients..."
            id="ingredients"
            name="ingredients"
            value={formData.ingredients}
            onChange={inputChangeHandler}
          ></textarea>

          <label htmlFor="instructions">Instructions</label>
          <textarea
            name="instructions"
            class="form-control mb-4"
            placeholder="Write your Instructions..."
            id="instructions"
            value={formData.instructions}
            onChange={inputChangeHandler}
          ></textarea>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </main>
    </div>
  );
};

export default AddRecipe;
