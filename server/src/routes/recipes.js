import express from "express";
import mongoose from "mongoose";
import { RecipesModel } from "../models/Recipes.js";
import { UserModel } from "../models/Users.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await RecipesModel.find({}).sort({ _id: -1 });
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

router.post("/", async (req, res) => {
  const recipe = new RecipesModel(req.body);
  try {
    const response = await recipe.save();
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

router.put("/", async (req, res) => {
  try {
    const recipe = await RecipesModel.findById(req.body.recipeID);
    const user = await UserModel.findById(req.body.userID);
    user.saveRecipes.push(recipe);
    await user.save();
    res.json({ saveRecipes: user.saveRecipes });
  } catch (err) {
    res.json(err);
  }
});

router.get("/saveRecipes/ids/:userID", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID);
    res.json({ saveRecipes: user?.saveRecipes });
  } catch (err) {
    res.json(err);
  }
})

router.get("/saveRecipes", async (req, res) => {
  try {
    const user = await UserModel.findById(req.body.userID);
    const saveRecipes = await RecipesModel.find({
      _id: { $in: user.saveRecipes },
    });
    res.json({ saveRecipes });
  } catch (err) {
    res.json(err);
  }
});

export { router as recipesRouter };
