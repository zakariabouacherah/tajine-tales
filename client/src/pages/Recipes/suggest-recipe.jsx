import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import chef from "../../../public/chef.jpg";
import babychef from "../../../public/chef2.jpg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export const SuggestRecipe = () => {
  const [cookies, _] = useCookies(["access_token"]);

  return (
    <section className="suggest-container">
      <div className="sug-frame">
        <div className="sug-img-container">
          <img src={cookies.access_token ? chef : babychef} alt="" />
        </div>
        <div className="content">
          <h1>
            {cookies.access_token
              ? "Share Your Culinary Masterpiece with Us!"
              : "Join Our Culinary Community!"}
          </h1>
          <p>
            {cookies.access_token 
            ? "We believe in the power of community and the joy of sharing delicious recipes. Your culinary creativity matters! If you have a favorite Moroccan dish or a unique creation, we'd love to feature it. Share your recipe with us, and let's make this culinary journey even more diverse and delightful."
            : "By joining, you'll gain access to exclusive features, personalized recipe recommendations, and the opportunity to showcase your culinary creations. Let's make this journey together – register or log in now!"}
          </p>
          <Link to={cookies.access_token ? "/create-recipe" : "/auth"}>
          {cookies.access_token ? "Submit Your Recipe" : "Register or Login"}
            <FontAwesomeIcon icon={faArrowRight} />
          </Link>
        </div>
      </div>
    </section>
  );
};
