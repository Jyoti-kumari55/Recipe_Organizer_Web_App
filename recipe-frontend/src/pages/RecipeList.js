import React, { useState } from "react";
import useFetch from "../useFetch";
import { Link } from "react-router";

const RecipeList = () => {
  const { data, loading, error } = useFetch(
    "https://recipe-backend-azure.vercel.app/recipe"
  );
  // console.log(data);

  const [searchRecipe, setSearchRecipe] = useState("");

  const filteredRecipes = data?.filter((dish) =>
    dish.name.toLowerCase().includes(searchRecipe.toLowerCase())
  );
  const [successMessage, setSuccessMessage] = useState("");
  const deleteHandler = async (recipeId) => {
    try {
      const response = await fetch(
        `https://recipe-backend-azure.vercel.app/recipe/${recipeId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete recipe.");
      }
      const data = await response.json();
      if (data) {
        setSuccessMessage("Recipe deleted successfully.");
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="container">
      <form className="my-3">
        <input
          type="search"
          placeholder="Search by recipe name..."
          className="form-control w-50"
          value={searchRecipe}
          onChange={(e) => setSearchRecipe(e.target.value)}
        />
      </form>

      <h1>All Recipes</h1>

      {loading && <p>Loading...</p>}
      {error && <p>An error occurred...</p>}
      {successMessage && (
        <div class="alert alert-danger" role="alert">
          {successMessage}
        </div>
      )}
      <div className="row mt-3">
        {filteredRecipes && filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <div className="col-md-4">
              <div className="card mb-4">
                <div>
                  <Link>
                    <img
                      className="card-img-top img-fluid"
                      alt="img"
                      src={recipe.image}
                    />
                  </Link>
                </div>
                <div className="card-body">
                  <h4 className="card-title">{recipe.name}</h4>
                  <p>
                    <b>Cuisine Type: </b>
                    {recipe.cuisine}
                  </p>
                  <p>
                    <b>Ingredients: </b>
                    <Link to={`/recipe/${recipe._id}`}>See Recipe &#62;</Link>
                  </p>
                  <p>
                    <b>Instructions: </b>
                    <Link to={`/recipe/${recipe._id}`}>See Recipe &#62;</Link>
                  </p>
                  <button
                    type="submit"
                    className="btn btn-danger"
                    onClick={() => deleteHandler(recipe._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No Data found.</p>
        )}
      </div>
    </div>
  );
};

export default RecipeList;
