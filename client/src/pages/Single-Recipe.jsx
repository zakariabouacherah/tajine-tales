import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../style/home.css";
import "../style/single-recipe.css";
import { useGetUserId } from "../hooks/useGetUserId";
import { useCookies } from "react-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";

const RecipeDetails = () => {
  const { recipeID } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const userID = useGetUserId();
  const [cookies, _] = useCookies(["access_token"]);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/${recipeID}`
        );

        if (!response.data) {
          throw new Error("Recipe not found");
        }

        setRecipe(response.data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.error(err);
      }
    };
    if (cookies.access_token) fetchSavedRecipes();
    fetchRecipeDetails();
  }, [recipeID, userID]);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put(
        "http://localhost:3001/recipes",
        {
          recipeID,
          userID,
        },
        { headers: { Authorization: cookies.access_token } }
      );
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.error(err);
    }
  };

  const unsaveRecipe = async (recipeID) => {
    try {
      const response = await axios.delete("http://localhost:3001/recipes", {
        data: { recipeID, userID },
      });
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.error(err);
    }
  };

  const isSaved = (id) => savedRecipes.includes(id);

  return (
    <div className="single-recipe">
      {loading ? (
        <div className="loading-container">
          <div className="lds-dual-ring"></div>
        </div>
      ) : (
        <>
          <div className="header">
            <h2 className="recipe-title">{recipe.name}</h2>
            {cookies.access_token ? (
              <>
                {isSaved(recipe._id) ? (
                  <button
                    className="save"
                    onClick={() => unsaveRecipe(recipe._id)}
                  >
                    <FontAwesomeIcon icon={fasHeart} />
                  </button>
                ) : (
                  <button
                    className="save"
                    onClick={() => saveRecipe(recipe._id)}
                  >
                    <FontAwesomeIcon icon={farHeart} />
                  </button>
                )}
              </>
            ) : (
              ""
            )}
          </div>
          <div className="details">
            <div className="left">
              <div className="img-container">
                <img src={recipe.imageUrl} alt={recipe.name} />
              </div>
            </div>
            <div className="right">
              <p className="titre">Ingredients :</p>
              <ul className="ingredients-list">
                {recipe.ingredients.map((i, idx) => (
                  <li className="ing" key={idx}>
                    {idx + 1}) {i}
                  </li>
                ))}
              </ul>
              <p className="titre">Instructions :</p>
              <ul className="instructions">{recipe.instructions.split('.').slice(0, -1).map((item,index) => (
                <li key={index}>{index+1}) {item}. </li>
              ))}</ul>
              <p className="titre">Cooking Time :</p>
              <p className="cookingTime">{recipe.cookingTime} minutes</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RecipeDetails;
