import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../style/home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import { useGetUserId } from "../../hooks/useGetUserId";
import { useCookies } from "react-cookie";
import { Logo1 } from "../../components/logo1"

export const HomeRecipes = () => {
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
        <ul className="recipes-list skeleton-list">
          <li className="recipe-item skeleton-item">
            <div className="skeleton-logo">
            <Logo1 />
            </div>
          </li>
          <li className="recipe-item skeleton-item">
          <div className="skeleton-logo">
            <Logo1 />
            </div>
          </li>
          <li className="recipe-item skeleton-item">
            <div className="image-container"></div>
            <div className="skeleton-logo">
            <Logo1 />
            </div>
          </li>
        </ul>
      ) : (
        <>
          <ul className="recipes-list">
            {recipes.slice(0, 3).map((recipe) => (
              <li
                onClick={() => goToRecipeDetails(recipe._id)}
                className="recipe-item"
                key={recipe._id}
              >
                <div className="image-container">
                  <img src={recipe.imageUrl} alt={recipe.name} />
                </div>
                <div className="recipe-details">
                  <h4>{recipe.name}</h4>
                  <p>{recipe.description.split(".")[0]}...</p>

                  <button onClick={() => goToRecipeDetails(recipe._id)}>
                    See Recipe
                  </button>
                </div>
                {cookies.access_token ? (
                  <>
                    <button
                      className="save"
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
