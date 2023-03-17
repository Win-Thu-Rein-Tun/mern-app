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
      <div className="sm:px-16 px-6 bg-primary text-white overflow-auto scrollbar-hide">
        <ul className="pb-16 ">
          {recipes.map((recipe) => (
            <li
              key={recipe._id}
              className="flex flex-col gap-4 bg-secondary py-6 px-6 rounded-lg my-10"
            >
              <h2 className="font-bold text-[24px] text-first">
                {recipe.name}
              </h2>
              <p>{recipe.ingredients}</p>
              <p>{recipe.instructions}</p>
              <img
                src={recipe.imgUrl}
                alt="recipe.name"
                className="object-fit rounded-xl"
              />
              <p>Cooking Time: {recipe.cookingTime} (minutes)</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
