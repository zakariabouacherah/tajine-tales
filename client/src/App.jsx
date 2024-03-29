import "./App.css";
import { CreateRecipe } from "./pages/Create-recipe/CreateRecipe";
import { SavedRecipes } from "./pages/Saved-recipes";
import { Auth } from "./pages/Auth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home1 } from "./pages/Home/Home1";
import { Recipes } from "./pages/Recipes/Recipes";
import { About } from "./pages/About/About";
import { Contact } from "./pages/Contact/Contact";
import { SingleRecipePage } from "./pages/Single-recipe/singleRecipePage";
import { MaybeShowNavbar } from "./components/maybeShowNavbar";
import { Favorites } from "./pages/Favorites/Favorites";

function App() {
  return (
    <>
      <Router>
        <MaybeShowNavbar>
          <Navbar />
        </MaybeShowNavbar>
        <Routes>
          <Route path="/" element={<Home1 />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/about" element={<About />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/recipes/:recipeID" element={<SingleRecipePage />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
