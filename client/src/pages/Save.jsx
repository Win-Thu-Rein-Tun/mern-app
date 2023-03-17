import React from "react";
import { useState, useEffect } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

const Save = () => {
  // const [recipes, setRecipes] = useState([]);
  // const [saveRecipes, setSaveRecipes] = useState([]);
  // const userID = useGetUserID();

  // useEffect(() => {
  //   const fetchRecipes = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:3000/recipes/saveRecipes",
  //         { userID }
  //       );
  //       setRecipes(response.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   const fetchSaveRecipes = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:3000/recipes/saveRecipes/ids",
  //         { userID }
  //       );
  //       // setSaveRecipes(response.data);
  //       console.log(response.data.saveRecipes);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchRecipes();
  //   fetchSaveRecipes();
  // }, []);

  return <div>Save</div>;
};

export default Save;
