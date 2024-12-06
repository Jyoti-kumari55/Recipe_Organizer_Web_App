import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import App from './App';
import AddRecipe from './pages/AddRecipe';
import RecipeDetail from './pages/RecipeDetail';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/recipe/:recipeId",
    element: <RecipeDetail/>
  },
  {
    path: "/addRecipe",
    element: <AddRecipe/>
  },
  {

  }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

