import React from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  };

  const add = () => {
    setRecipes({ ...recipes, ingredients: [...recipes.ingredients, ""] });
  };

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post("http://localhost:3000/recipes", recipes)
      toast.success("Recipes Create Successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="bg-secondary text-first flex justify-center sm:py-16 py-6 px-6">
      <div className="xl:max-w-[1280px] sm:w-fit w-full  bg-primary sm:py-16 py-6 sm:px-16 px-6 rounded-xl">
        <form onSubmit={onSubmit} className="flex flex-col gap-10">
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
                onChange={(e) => handleIngredientChange(e,index)}
                className="bg-secondary rounded-lg py-4 px-4 outline-none border-none mt-4"
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
              type="number"
              name="cookingTime"
              onChange={handleChange}
              className="bg-secondary rounded-lg py-4 px-4 outline-none border-none mt-4"
            />
          </div>
          <button
              type="submit"
              className="bg-second hover:bg-teal-600 text-white font-bold py-2 px-4 rounded mt-4"
            >
              {" "}
              Create Recipes
            </button>
        </form>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Create;
