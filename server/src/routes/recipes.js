import express from "express";
import { RecipesModel } from "../models/Recipes.js";
import { UserModel } from "../models/Users.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await RecipesModel.find({}).sort({ _id: -1 });
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

router.post("/", verifyToken, async (req, res) => {
  const recipe = new RecipesModel(req.body);
  try {
    const response = await recipe.save();
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

router.put("/", verifyToken, async (req, res) => {
  try {
    const recipe = await RecipesModel.findById(req.body.recipeID);
    const user = await UserModel.findById(req.body.userID);
    user.saveRecipes.push(recipe);
    await user.save();
    res.json({
      saveRecipes: user.saveRecipes,
      message: "Recipe saved successfully",
    });
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
});

router.get("/saveRecipes/:userID", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID);
    const saveRecipes = await RecipesModel.find({
      _id: { $in: user.saveRecipes },
    }).sort({ _id: -1 });
    res.json({ saveRecipes });
  } catch (err) {
    res.json(err);
  }
});

router.delete("/deleteSavedRecipes", verifyToken, async (req, res) => {
  try {
    const user = await UserModel.findById(req.body.userID);
    // Remove the recipe from the user's saveRecipes array
    user.saveRecipes = user.saveRecipes.filter(
      (id) => id.toString() !== req.body.recipeID
    );
    await user.save();
    res.json({ message: "Recipe deleted successfully." });
  } catch (err) {
    res.json(err);
  }
});

// router.delete("/deleteRecipes", verifyToken, async (req, res) => {
//   try {
//     const recipe = await RecipesModel.deleteById(req.body.recipeID);
//     res.json({ message: "Recipe deleted successfully." });
//   } catch (err) {
//     res.json(err);
//   }
// });

// // router.delete("/deleteRecipes", async (req, res) => {
// //   try {
// //     const user = await UserModel.findById(req.body.userID);
// //     const recipe = await UserModel.find(
// //       user.saveRecipes.includes(req.body.recipeID)
// //     );
// //     // const delSaveRecipe = await UserModel.delete(
// //     //   user.saveRecipes.includes(recipe)
// //     // );
// //     const delSaveRecipe = await UserModel.updateOne(
// //       { user },
// //       { $pull: { saveRecipes: recipe } }
// //     );
// //   } catch (err) {
// //     res.json(err);
// //   }
// // });

// // router.delete("/deleteRecipes", async (req, res) => {
// //   try {
// //     // const user = await UserModel.findById(req.body.userID);
// //     // const recipe = await UserModel.find({ _id: req.body.userID, saveRecipes: req.body.recipeID });
// //     const delSaveRecipe = await UserModel.updateOne(
// //       { _id: req.body.userID },
// //       { $pull: { saveRecipes: req.body.recipeID } }
// //     );
// //     res.json(delSaveRecipe);
// //   } catch (err) {
// //     res.json(err);
// //   }
// // });

export { router as recipesRouter };
