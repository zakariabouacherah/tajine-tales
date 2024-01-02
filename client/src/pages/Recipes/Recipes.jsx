import {Layout} from "../../layouts/Layout"
import { RecipesGrid } from "./Recipes-grid"
import { Banner } from "../../components/banner"
import './style.css'
import { SuggestRecipe } from "./suggest-recipe"
export const Recipes = () => {
    return <Layout>
        <Banner>Embark on a Culinary Adventure with Our Authentic Recipes</Banner>
        <RecipesGrid />
        <SuggestRecipe />
    </Layout>
    
    
}