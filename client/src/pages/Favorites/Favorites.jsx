import { Layout } from "../../layouts/Layout";
import { Banner } from "../../components/banner";
import { SavedRecipes } from "../Saved-recipes";
import "./style.css"
export const Favorites = () => {
  return (
    <Layout>
      <div className="favorites-banner">
        <Banner>Your Flavorful Favorites</Banner>
      </div>
      <SavedRecipes />
    </Layout>
  );
};
