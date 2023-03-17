import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/recipes");
        setRecipes(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="bg-secondary h-screen flex justify-center">
      <div className="sm:py-16 py-6 sm:px-16 px-6 bg-primary text-white overflow-auto">
        <ul className="py-6 ">
          {recipes.map((recipe) => (
            <li key={recipe._id}>
              <h2>{recipe.name}</h2>
              <p>{recipe.ingredients}</p>
              <p>{recipe.instructions}</p>
              <img src={recipe.imgUrl} alt="recipe.name" className="object-fit"/>
              <p>{recipe.cookingTime}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
