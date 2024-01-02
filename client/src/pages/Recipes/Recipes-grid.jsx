import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faHeart as fasHeart,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useGetUserId } from "../../hooks/useGetUserId";
import { useCookies } from "react-cookie";
import { Logo1 } from "../../components/logo1";
import { useDebouncedEffect } from "@react-hookz/web";

export const RecipesGrid = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies, _] = useCookies(["access_token"]);
  const [loading, setLoading] = useState(true);
  const userID = useGetUserId();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [state, setState] = useState("");
  const [originalRecipes, setOriginalRecipes] = useState([]);
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recipes");
        setRecipes(response.data);
        setOriginalRecipes(response.data);
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

  useDebouncedEffect(
    () => {
      setRecipes((prevRecipes) =>
        originalRecipes.filter((recipe) =>
          state !== ""
            ? recipe.name?.toLowerCase().includes(state.toLowerCase())
            : true
        )
      );
    },
    [state , originalRecipes],
    500,
    1000
  );

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

  const indexOfLastRecipe = currentPage * itemsPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - itemsPerPage;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="recipes-grid-container">
      {loading ? (
        <>
        <div className=" header header-skeleton"></div>

        <ul className="recipes-list-grid">
          <li className="one-recipe skeleton-item ">
            <div className="skeleton-logo">
              <Logo1 />
            </div>          
          </li>
          <li className="one-recipe skeleton-item ">
            <div className="skeleton-logo">
              <Logo1 />
            </div>          
          </li>
          <li className="one-recipe skeleton-item ">
            <div className="skeleton-logo">
              <Logo1 />
            </div>          
          </li>
          <li className="one-recipe skeleton-item ">
            <div className="recipe-img-container"></div>
            <div className="skeleton-logo">
              <Logo1 />
            </div>          
          </li>
        </ul>
        </>
      ) : (
        <>
          <div className="header">
            <h2>Elevate Your Palate: Our Distinctive Culinary Creations</h2>
            <div className="search-block">
              <input
                type="text"
                placeholder="Search for a recipe"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
              <button>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </div>
          </div>
          <ul className="recipes-list-grid">
            {recipes
              .slice(indexOfFirstRecipe, indexOfLastRecipe)
              .map((recipe) => (
                <li
                  onClick={() => goToRecipeDetails(recipe._id)}
                  className="one-recipe"
                  key={recipe._id}
                >
                  <div className="recipe-img-container">
                    <img src={recipe.imageUrl} alt={recipe.name} />
                  </div>
                  <div className="recipe-det">
                    <h4>{recipe.name}</h4>
                    <p>Cooking time : {recipe.cookingTime} minutes</p>
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
          <div className="pagination">
            {Array.from({
              length: Math.ceil(recipes.length / itemsPerPage),
            }).map((_, index) => (
              <button
                className={currentPage === index + 1 ? "currentPage" : ""}
                key={index + 1}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
