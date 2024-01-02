import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import { useGetUserId } from "../hooks/useGetUserId";

export const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(true);
  const userID = useGetUserId();

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
  }, [userID,update]);
  const unsaveRecipe = async (recipeID) => {
    try {
      const response = await axios.delete("http://localhost:3001/recipes", {
        data: { recipeID, userID },
      });
      
      setUpdate(!update)
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.error("Error unsaving recipe:", err);
    }
  };

  return (
    <>
      {loading ? (
        <div className="loading-container" >

            <div className="lds-dual-ring"></div>
        </div>
      ) : savedRecipes.length > 0 ? (
        <div className="home-container">
          <h2 className="title">Saved Recipes</h2>
          <ul className="recipes-list">
            {savedRecipes.map((recipe) => (
              <li className="recipe-item" key={recipe._id}>
                <div className="image-container">
                  <img src={recipe.imageUrl} alt={recipe.name} />
                </div>
                <div className="recipe-details">
                  <h4>{recipe.name}</h4>
                  <p>Cooking Time : {recipe.cookingTime} (minutes)</p>
                </div>
                <button
                  className="save"
                  onClick={() => unsaveRecipe(recipe._id)}
                >
                  <FontAwesomeIcon icon={fasHeart} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="no-recipes">No recipes have been saved yet.</p>
      )}
    </>
  );
};
