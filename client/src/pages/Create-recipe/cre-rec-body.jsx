import chefCreate from "../../../public/cooking.svg"
import {CreateRecipe} from "../Create-recipe"
import "./style.css"

export const CreRecBody = () => {
    return <section className="cre-rec-body">
        <div className="left">
            <p>
            Ready to showcase your culinary expertise? We're excited to feature your recipe on our platform. Fill out the details below, and let's bring your creation to the tables of fellow food enthusiasts!
            </p>
            <div className="cre-rec-img-container">
                <img src={chefCreate} alt="chef" />
            </div>
        </div>
        <div className="right">
            <CreateRecipe />
        </div>

    </section>
}