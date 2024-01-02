import { HomeRecipes } from "./Home-3recipes";

export const RecipesSection = () => {
  return (
    <section className="p-section recipes-section">
      <div className="section-header">
        <h1 className="section-title">Our <span>specials </span> recipes</h1>
        <p className="section-text">
          Welcome to a curated collection of Moroccan culinary masterpieces.
          These dishes are more than just recipes; they're a celebration of
          tradition, flavor, and the art of cooking.
        </p>
      </div>
      <div className="section-body">
        <HomeRecipes />
      </div>
    </section>
  );
};
