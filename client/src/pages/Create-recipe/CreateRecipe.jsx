import { Banner } from "../../components/banner"
import { Layout } from "../../layouts/Layout"
import { CreRecBody } from "./cre-rec-body"

export const CreateRecipe = () => {
    return (
        <Layout>
            <div className="create-page">

            <Banner>Share Your Recipe with the World!</Banner>
            </div>
            <CreRecBody />
        </Layout>
    )
}