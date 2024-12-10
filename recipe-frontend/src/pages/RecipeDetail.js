import React from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import useFetch from "../useFetch";

const RecipeDetail = () => {
  const { recipeId } = useParams();

  const { data, loading, error } = useFetch(
    `https://recipe-backend-azure.vercel.app/recipe/${recipeId}`
  );
  //console.log("Recipe detail: ", data);

  if (loading) {
    return <div> Loading...</div>;
  }

  if (error) {
    return <div> Error: {error.message}</div>;
  }

  return (
    <div>
      <Header />
      <main className="container mt-4">
        {data ? (
          <div>
            <h3>{data.detail.name}</h3>
            <div className="card mb-3 mt-2">
              <div className="row g-4">
                <div className="col-md-4">
                  <img
                    src={data.detail.image}
                    alt={data.name}
                    className="img-fluid"
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">Cuisine: {data.detail.cuisine}</h5>
                    <div className="card-text my-3">
                      <h5>Ingredients: </h5>
                      {data.detail.ingredients.join(", ")}
                    </div>
                    <div>
                      <h5>Instructions: </h5>
                      <ol>
                        {data.detail.instructions.map((steps, index) => (
                          <li key={index}>{steps}</li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>No Details</p>
        )}
      </main>
    </div>
  );
};

export default RecipeDetail;
