import aboutImage from "../../../public/about-img.jpg"
import {Link} from "react-router-dom" 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export const AboutSection = () => {
    return <section className="about-section">
        <div className="frame">
            <div className="about-img-container">
                <img src={aboutImage} alt="Moroccan meals" />
            </div>
            <div className="about-det">
                <h1 className="about-title">
                Journey into Moroccan Culinary Delights
                </h1>
                <p className="about-text">
                Immerse yourself in the vibrant tapestry of Moroccan cuisine, where every dish tells a story of tradition, culture, and flavors that dance on your palate. From the bustling markets to the heartwarming family gatherings, our culinary journey through Morocco brings you the best of this rich gastronomic landscape. Let the aromas and colors transport you to the enchanting world of Moroccan cooking.
                </p>
                <Link to="/about">
                    <span>Explore More About Moroccan Cuisine</span>
                    <FontAwesomeIcon icon={faArrowRight} />
                </Link>
            </div>
        </div>
    </section>
}
