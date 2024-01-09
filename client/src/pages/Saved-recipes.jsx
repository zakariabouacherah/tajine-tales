import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import { useGetUserId } from "../hooks/useGetUserId";
import nothing from "../../public/nothing.svg";
import { Link } from "react-router-dom";
import {useNavigate} from "react-router-dom"

export const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(true);
  const userID = useGetUserId();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.error("Error fetching saved recipes:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSavedRecipes();
  }, [userID, update]);
  const unsaveRecipe = async (recipeID) => {
    try {
      const response = await axios.delete("http://localhost:3001/recipes", {
        data: { recipeID, userID },
      });

      setUpdate(!update);
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.error("Error unsaving recipe:", err);
    }
  };
  const goToRecipeDetails = (recipeID) => {
    navigate(`/recipes/${recipeID}`);
  };

  return (
    <div className="favorites-container">
      {loading ? (
        <div className="loading-container">
          <div className="lds-dual-ring"></div>
        </div>
      ) : savedRecipes.length > 0 ? (
        <div className="favorites-grid">
          <ul className="recipes-list-grid">
            {savedRecipes.map((recipe) => (
              <li
                className="one-recipe"
                key={recipe._id}
                onClick={() => goToRecipeDetails(recipe._id)}
              >
                <div className="recipe-img-container">
                  <img src={recipe.imageUrl} alt={recipe.name} />
                </div>
                <div className="recipe-det">
                  <h4>{recipe.name}</h4>
                  <p>Cooking Time : {recipe.cookingTime} (minutes)</p>
                  <button onClick={() => goToRecipeDetails(recipe._id)}>
                    See Recipe
                  </button>
                </div>
                <button
                  className="save"
                  onClick={(e) => {
                    e.stopPropagation();
                    unsaveRecipe(recipe._id)
                  }}
                >
                  <FontAwesomeIcon icon={fasHeart} />
                </button>
              </li>
            ))}
          </ul>
          <span className="back-to-recipes">
            <p>
            Enjoying your favorites? Spice up your collection by adding more mouthwatering recipes to savor in the future.
            </p>
            <Link to="/recipes"> Explore new culinary delights!</Link>
          </span>
        </div>
      ) : (
        <div className="empty">
          <p className="no-recipes">
            No recipes have been added to favorites yet.
          </p>
          <img src={nothing} alt="nothing" />
          <span className="back-to-recipes">
            <p>
              Looks like your favorites list is hungry! Head back to the Recipes
              page to discover and add some delectable dishes.
            </p>
            <Link to="/recipes">Recipes page</Link>
          </span>
        </div>
      )}
    </div>
  );
};
