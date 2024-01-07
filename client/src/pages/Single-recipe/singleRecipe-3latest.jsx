import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as farHeart,
  faClock,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import { useGetUserId } from "../../hooks/useGetUserId";
import { useCookies } from "react-cookie";

export const SingleRecipeLatest = () => {
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

//   const getRandomRecipes = (array, count) => {
//     const shuffledArray = array.sort(() => Math.random() - 0.8);
//     console.log(Math.random());
//     return shuffledArray.slice(0, count);
//   };
//   const randomThreeRecipes = getRandomRecipes(recipes, 3);

  return (
    <div className="latest-recipes">
      {loading ? (
        <h2 className="loading">Loading ...</h2>
      ) : (
        <>
          <h2 className="l-recipe-title">Latest Culinary Creations</h2>
          <ul className="l-recipes-list">
            {recipes.slice(-3).map((recipe) => (
              <li
                onClick={() => goToRecipeDetails(recipe._id)}
                className="l-recipe-item"
                key={recipe._id}
              >
                <div className="l-r-image-container">
                  <img src={recipe.imageUrl} alt={recipe.name} />
                </div>
                <div className="l-recipe-details">
                  <h4>{recipe.name}</h4>
                  <div className="cooking-time">
                    <FontAwesomeIcon icon={faClock} />
                    <p>{recipe.cookingTime} minutes</p>
                  </div>
                  <div className="button-frame">
                    <button onClick={() => goToRecipeDetails(recipe._id)}>
                      See Recipe
                    </button>
                  </div>
                </div>
                {cookies.access_token ? (
                  <>
                    <button
                      className="l-save"
                      onClick={(e) => {
                        e.stopPropagation();
                        isSaved(recipe._id)
                          ? unsaveRecipe(recipe._id)
                          : saveRecipe(recipe._id);
                      }}
                    >
                      {isSaved(recipe._id) ? (
                        <FontAwesomeIcon icon={fasHeart} />
                      ) : (
                        <FontAwesomeIcon icon={farHeart} />
                      )}
                    </button>
                  </>
                ) : (
                  ""
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
