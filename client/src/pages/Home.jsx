import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [recipes, setRecipes] = useState("");

  useEffect(() => {
    const fetchRecipes = async (e) => {
      try {
        const response = await axios.get("http://localhost:3000/recipes");
        // setRecipes(response.data);

        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRecipes();
  }, []);

  return <div>Home</div>;
};

export default Home;
