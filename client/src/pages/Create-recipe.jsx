import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGetUserId } from "../hooks/useGetUserId";
import "../style/createRecipe.css";
import { useCookies } from "react-cookie";
import Swal from 'sweetalert2'

export const CreateRecipe = () => {
  const userID = useGetUserId();
  const navigate = useNavigate();
  const [cookies, _] = useCookies(["access_token"]);
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const addIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };
  const handleIngredientChange = (e, index) => {
    const ingredients = recipe.ingredients;
    ingredients[index] = e.target.value;
    setRecipe({ ...recipe, ingredients });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/recipes", recipe, {
        headers: { Authorization: cookies.access_token },
      });
      Swal.fire({
        title : "Success!",
        text : "Recipe Created!",
        icon : 'success'
      })
      navigate("/recipes");
    } catch (err) {
      console.error(err);
    }
  };

  return (
      <div className="create-recipe">
        <form className="create-form" onSubmit={onSubmit}>
          <div className="create-form-group">
            <label htmlFor="name">Name :</label>
            <input type="text" name="name" id="name" onChange={handleChange} />
          </div>
          <div className="create-form-group">
            <label htmlFor="description">Description :</label>
            <textarea
              name="description"
              id="description"
              onChange={handleChange}
              rows={4}
            ></textarea>
          </div>
          <div className="create-form-group">
            <label htmlFor="ingredients">Ingredients :</label>
            {recipe.ingredients.map((ingredient, index) => (
              <input
                type="text"
                key={index}
                name="ingredients"
                value={ingredient}
                onChange={(e) => handleIngredientChange(e, index)}
              />
            ))}
            <button
              type="button"
              data-title="Add an ingredient"
              className="add-btn"
              onClick={addIngredient}
            >
              +
            </button>
          </div>
          <div className="create-form-group">
            <label htmlFor="instructions">Instructions :</label>
            <textarea
              name="instructions"
              id="instructions"
              onChange={handleChange}
              rows={4}
            ></textarea>
          </div>
          <div className="create-form-group">
            <label htmlFor="imageUrl">Image Url :</label>
            <input
              type="text"
              name="imageUrl"
              id="imageUrl"
              onChange={handleChange}
            />
          </div>
          <div className="create-form-group">
            <label htmlFor="cookingTime"> Cooking Time (minutes)</label>
            <input
              min="0"
              type="number"
              name="cookingTime"
              id="cookingTime"
              onChange={handleChange}
            />
          </div>
          <button className="create" type="submit">Create Recipe</button>
        </form>
      </div>
  );
};
