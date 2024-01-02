import react from "react";
import { Logo } from "../components/logo";
import { Logo1 } from "../components/logo1";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import "./footer.css";
import ScrollToTop from "react-scroll-to-top";
import tajin from "../../public/tajinePng.png"
import tajin2 from "../../public/tajin2.png"

export const Footer = ({ children }) => {
  return (
    <>
      <ScrollToTop
        smooth
        top={800}
        color="white"
        style={{ background: "var(--primary-color-1)" }}
      />
      <section className="stay">
        <div className="top-footer">
          <h1>Stay in touch</h1>
          <p>
            Let's keep the culinary conversation alive! Stay in the loop with
            the latest Moroccan recipes, cooking tips, and foodie adventures.
            Subscribe to our newsletter for a monthly dose of inspiration and
            join us on social media for real-time updates. Your journey into
            Moroccan cuisine is just a click away!
          </p>
          <div className="input-group">
            <input type="email" placeholder="Enter you email" />
            <button>subscribe</button>
          </div>
        </div>
        <div className="footer-img-container left">
        <img src={tajin} alt="tajin" />
        </div>
        <div className="footer-img-container right">
        <img src={tajin2} alt="tajin" />
        </div>
      </section>
      <footer>
        <div className="rows">
          <div className="row">
            <Logo />
            <Logo1 />
          </div>
          <div className="row">
            <Link to="/recipes">Our Recipes</Link>
            <Link to="/about">About Moroccan cuisine</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div className="row">
            <div className="title">Contact us :</div>
            <ul>
              <li>
                <strong>Téléphone :</strong> +212 600 0000 00
              </li>
              <li>
                <strong>Email :</strong> TajineTales@gmail.com
              </li>
              <li>
                <strong>Adresse :</strong> 80 000 Agadir, Morocco
              </li>
            </ul>
          </div>
          <div className="row">
            <div className="title">Follow us :</div>
            <ul>
              <li>
                <FontAwesomeIcon icon={faFacebook} />
              </li>
              <li>
                <FontAwesomeIcon icon={faInstagram} />
              </li>
              <li>
                <FontAwesomeIcon icon={faYoutube} />
              </li>
            </ul>
          </div>
        </div>
        <span></span>
        <div className="copyright">
          © 2024
          <Link to="/"> TajineTales</Link>. All rights reserved.
        </div>
      </footer>
    </>
  );
};
