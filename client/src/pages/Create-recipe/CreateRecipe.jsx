import { Banner } from "../../components/banner"
import { Layout } from "../../layouts/Layout"
import { BackToRecipes } from "./back-to-recipes"
import { CreRecBody } from "./cre-rec-body"

export const CreateRecipe = () => {
    return (
        <Layout>
            <Banner>Share Your Recipe with the World!</Banner>
            <CreRecBody />
            <BackToRecipes />
        </Layout>
    )
}