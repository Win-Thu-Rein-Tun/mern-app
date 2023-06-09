import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PacmanLoader } from "react-spinners";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const [cookies, setCookies] = useCookies(["access_token"]);

  const userID = useGetUserID();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_PORT}/recipes`
        );
        setRecipes(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaveRecipes = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_PORT}/recipes/saveRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.saveRecipes);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRecipes();
    if (cookies.access_token) fetchSaveRecipes();
  }, []);

  const saveRecipes = async (recipeID) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_PORT}/recipes`,
        {
          recipeID,
          userID,
        },
        { headers: { authorization: cookies.access_token } }
      );
      setSavedRecipes(response.data.saveRecipes);
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // const delRecipe = async (recipeID) => {
  //   try {
  //     const response = await axios.delete(
  //       "http://localhost:3001/recipes/deleteRecipes",
  //       {
  //         recipeID,
  //       },
  //       { headers: { authorization: cookies.access_token } }
  //     );
  //     toast.success(response.data.message, {
  //       position: "top-center",
  //       autoClose: 1000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "dark",
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const isSavedRecipes = (id) => savedRecipes.includes(id);

  if (loading) {
    return (
      <div className="flex justify-center items-center bg-secondary h-screen">
        <PacmanLoader color="#14FFEC" size={40} />
      </div>
    );
  }

  return (
    <div className="bg-secondary h-screen flex justify-center">
      <div className="sm:px-16 lg:w-6/12 px-6 bg-primary text-white overflow-auto scrollbar-hide">
        <ul className="pb-16">
          {recipes.map((recipe) => (
            <li
              key={recipe._id}
              className="flex flex-col gap-4 bg-secondary py-6 px-6 rounded-lg my-10"
            >
              <div className="flex justify-between items-center">
                <h1 className="font-bold text-[24px] text-first">
                  {recipe.name}
                </h1>
                {!cookies.access_token ? (
                  <div></div>
                ) : (
                  <button
                    type="button"
                    onClick={() => saveRecipes(recipe._id)}
                    disabled={isSavedRecipes(recipe._id)}
                    className={`bg-second hover:bg-teal-600 text-white font-bold py-2 px-4 rounded justify-end flex ${
                      isSavedRecipes(recipe._id)
                        ? "disabled:opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {isSavedRecipes(recipe._id) ? "Saved" : "Save"}
                  </button>
                )}
              </div>
              <h2 className="font-semibold"> Ingredients :</h2>
              <ul className="px-8 list-disc">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>

              <p>{recipe.instructions}</p>
              <img
                src={recipe.imgUrl}
                alt={recipe.name}
                className="rounded-xl"
              />
              <p>Cooking Time: {recipe.cookingTime} (minutes)</p>
              {/* {recipe.userOwner.toString() !== userID ? (
                <div></div>
              ) : (
                <button
                  type="button"
                  onClick={() => delRecipe(recipe._id)}
                  className={`bg-red-700 hover:bg-red-500 text-white font-bold py-2 px-4 rounded w-fit flex`}
                >
                  Delete
                </button>
              )} */}
            </li>
          ))}
        </ul>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={1000}
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

export default Home;
