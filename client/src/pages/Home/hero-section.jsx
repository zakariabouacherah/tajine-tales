import { Logo1 } from "../../components/logo1";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

export const HeroSection = () => {
  const [cookies, _] = useCookies(["access_token"]);
  return (
    <>
      <section className="hero-section">
        <div className="hero-section-title">
          <span>Savor</span>
          <h2>
            the Magic of <br />
            Moroccan Cooking
          </h2>
          <p>
            <Logo1 /> - Your Ultimate Guide to Delicious Recipes and Culinary
            Traditions.
          </p>
          <Link
            to={cookies.access_token ? "/recipes" : "/auth"}
            className={
              cookies.access_token ? "get-started-btn explore-btn" : "get-started-btn"
            }
          >
            <span>
              {cookies.access_token ? "Exlore Our recips" : "Get Started"}
            </span>
            <FontAwesomeIcon icon={faArrowRight} />
          </Link>
        </div>
      </section>
    </>
  );
};
