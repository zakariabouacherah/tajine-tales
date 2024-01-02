import { Layout } from "../../layouts/Layout"
import { AboutSection } from "./about-section"
import { Cta } from "./cta"
import { HeroSection } from "./hero-section"
import { RecipesSection } from "./recipes-section"
import "./style.css"

export const Home1 = () => {
    return <>
    <Layout>

    <HeroSection />
    <RecipesSection />
    <AboutSection />
    <Cta />
    </Layout>
    </>
}
