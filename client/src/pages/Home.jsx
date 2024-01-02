import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import "../style/home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import { useGetUserId } from "../hooks/useGetUserId";
import { useCookies } from "react-cookie";

export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies, _] = useCookies(["access_token"]);
  const [loading, setLoading] = useState(true);
  const userID = useGetUserId();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recipes");
        setRecipes(response.data);
      } catch (err) {
        console.error(err);
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

    fetchRecipes();

    if (cookies.access_token) fetchSavedRecipes();
  }, [userID]);
  
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

  const goToRecipeDetails = (recipeID) => {
    navigate(`/recipes/${recipeID}`);
  };
  return (
    <div className="home-container">
      {loading ? (
        <div className="loading-container">
          <div className="lds-dual-ring"></div>
        </div>
      ) : (
        <>
          <ul className="recipes-list">
            {recipes.slice(0, 3).map((recipe) => (
              <li className="recipe-item" key={recipe._id}>
                <div className="image-container">
                  <img src={recipe.imageUrl} alt={recipe.name} />
                </div>
                <div className="recipe-details">
                  <h4>{recipe.name}</h4>
                  <p>Cooking Time : {recipe.description || recipe.cookingTime } (minutes)</p>
                </div>
                <div className="card-bottom">

                {cookies.access_token ? 
                  (
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
                  )
                 : ""
                }
                <button onClick={()=> goToRecipeDetails(recipe._id)}>
                  See Recipe
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
