import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

const Save = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies, setCookies] = useCookies(["access_token"]);

  const userID = useGetUserID();

  useEffect(() => {
    const fetchSaveRecipes = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_PORT}/recipes/saveRecipes/${userID}`
        );
        setSavedRecipes(response.data.saveRecipes);
      } catch (error) {
        console.log(error);
      }
    };

    if (cookies.access_token) fetchSaveRecipes();
  }, []);

  const delSaveRecipes = async (recipeID) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_PORT}/recipes/deleteSavedRecipes`,
        {
          data: { recipeID, userID },
          headers: { authorization: cookies.access_token },
        }
      );
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
      // Remove the deleted recipe from the savedRecipes state
      setSavedRecipes(savedRecipes.filter((recipe) => recipe._id !== recipeID));
    } catch (error) {
      console.log(error);
    }
  };

  // const delSaveRecipes = async (recipeID) => {
  //   try {
  //     const response = await axios.delete(
  //       "http://localhost:3000/recipes/deleteRecipes",
  //       {
  //         data: { recipeID, userID },
  //       }
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className="bg-secondary h-screen flex justify-center">
      {!cookies.access_token ? (
        <div className="flex items-center sm:text-[40px] text-[20px] text-second">
          You need to login!
        </div>
      ) : savedRecipes.length === 0 ? (
        <div className="flex items-center sm:text-[40px] text-[20px] text-second">
          No saved recipes found.
        </div>
      ) : (
        <div className="sm:px-16 lg:w-6/12 px-6 bg-primary text-white overflow-auto scrollbar-hide">
          <ul className="pb-16 ">
            {savedRecipes.map((recipe) => (
              <li
                key={recipe._id}
                className="flex flex-col gap-4 bg-secondary py-6 px-6 rounded-lg my-10"
              >
                <div className="flex justify-between items-center">
                  <h1 className="font-bold text-[24px] text-first">
                    {recipe.name}
                  </h1>
                  <button
                    type="button"
                    onClick={() => delSaveRecipes(recipe._id)}
                    className={`bg-second hover:bg-teal-600 text-white font-bold py-2 px-4 rounded flex`}
                  >
                    Delete
                  </button>
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
              </li>
            ))}
          </ul>
        </div>
      )}
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

export default Save;
