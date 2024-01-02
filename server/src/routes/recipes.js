import { RecipeModel } from "../models/Recipes.js";
import express from "express";
import mongoose from "mongoose";
import { UserModel } from "../models/Users.js";
import { verifyToken } from "./users.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await RecipeModel.find({});
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});
router.post("/", verifyToken , async (req, res) => {
  const recipe = new RecipeModel(req.body);
  try {
    const response = await recipe.save();
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});
router.put("/",verifyToken , async (req, res) => {
  try {
    const recipe = await RecipeModel.findById(req.body.recipeID);
    const user = await UserModel.findById(req.body.userID);
    user.savedRecipes.push(recipe);
    await user.save();
    res.json({ savedRecipes: user.savedRecipes });
  } catch (err) {
    res.json(err);
  }
});

router.get("/savedRecipes/ids/:userID" , async (req ,res) => {
    try {
        const user = await UserModel.findById(req.params.userID);
        res.json({savedRecipes : user?.savedRecipes})
    } catch (err) {
        res.json(err);
    }
})
router.get("/savedRecipes/:userID" , async (req ,res) => {
    try {
        const user = await UserModel.findById(req.params.userID);
        const savedRecipes = await RecipeModel.find({
            _id : { $in : user.savedRecipes}
        })
        res.json({savedRecipes})
    } catch (err) {
        res.json(err);
    }
})
router.delete("/", async (req, res) => {
  try {
    const recipeID = req.body.recipeID;
    const userID = req.body.userID;

    await UserModel.findByIdAndUpdate(userID, {
      $pull: { savedRecipes: recipeID },
    });

    const user = await UserModel.findById(userID);
    res.json({ savedRecipes: user.savedRecipes });
  } catch (err) {
    res.json(err);
  }
});
router.get("/:recipeID", async (req, res) => {
  try {
    const recipe = await RecipeModel.findById(req.params.recipeID);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});


export { router as recipesRouter };
