import {Layout} from "../../layouts/Layout"
import RecipeDetails from "../Single-Recipe"
import { SingleRecipeLatest } from "./singleRecipe-3latest"
import "./style.css"

export const SingleRecipePage = () => {
    return (
        <Layout>
            <RecipeDetails />
            <SingleRecipeLatest />
        </Layout>
    )
}