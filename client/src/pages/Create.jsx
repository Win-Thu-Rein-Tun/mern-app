import React from "react";
import { useState } from "react";

const Create = () => {
  const [recipes, setRecipes] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imgUrl: "",
    cookingTime: 0,
    userOwner: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipes({ ...recipes, [name]: value });
  };

  const handleIngredientChange = (e, index) => {
    const { value } = e.target;
    const ingredients = recipes.ingredients;
    ingredients[index] = value;
    setRecipes({ ...recipes, ingredients });
    console.log(recipes);
  };

  const add = () => {
    setRecipes({ ...recipes, ingredients: [...recipes.ingredients, ""] });
  };

  return (
    <div className="bg-secondary text-first flex justify-center sm:py-32 py-6 px-6">
      <div className="lg:max-w-[1280px] bg-primary sm:py-16 py-6 sm:px-16 px-6 rounded-xl">
        <form className="flex flex-col gap-10">
          <h2 className="font-semibold sm:text-[60px] text-[40px]">
            Create Recipes
          </h2>

          <div className="flex flex-col">
            <label htmlFor="">Name :</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              className="bg-secondary rounded-lg py-4 px-4 outline-none border-none mt-4"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="">Ingredients :</label>
            <button
              onClick={add}
              type="button"
              className="bg-second hover:bg-teal-600 text-white font-bold py-2 px-4 rounded mt-4"
            >
              {" "}
              Add Ingredients +
            </button>
            {recipes.ingredients.map((ingredient, index) => (
              <input
                key={index}
                type="text"
                name="ingredients"
                value={ingredient}
                onChange={handleIngredientChange}
              />
            ))}
          </div>

          <div className="flex flex-col">
            <label htmlFor="">Instructions :</label>
            <textarea
              type="text"
              name="instructions"
              onChange={handleChange}
              rows={5}
              className="bg-secondary rounded-lg py-4 px-4 outline-none border-none mt-4"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="">Image URL :</label>
            <input
              type="text"
              name="imgUrl"
              onChange={handleChange}
              className="bg-secondary rounded-lg py-4 px-4 outline-none border-none mt-4"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="">Cooking Times (minutes) :</label>
            <input
              type="text"
              name="cookingTime"
              onChange={handleChange}
              className="bg-secondary rounded-lg py-4 px-4 outline-none border-none mt-4"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
