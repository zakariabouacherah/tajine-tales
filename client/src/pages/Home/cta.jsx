import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Logo1 } from "../../components/logo1";
import { useCookies } from "react-cookie";
import ctaImg1 from "../../../public/cta-bg1.jpg";
import ctaImg2 from "../../../public/cta-bg2.jpg";

export const Cta = () => {
  const data = [
    {
      title: "Authentic Moroccan Flavors",
      description:
        "At TajineTales, we bring the rich and authentic flavors of Morocco to your kitchen. Immerse yourself in the culinary heritage of this enchanting country with our carefully curated collection of traditional and modern Moroccan recipes.",
    },
    {
      title: "Moroccan Ingredient Showcase",
      description:
        "Elevate your dishes with the finest Moroccan ingredients. TajineTales emphasizes the use of authentic spices, fresh herbs, and locally sourced produce to capture the true essence of Moroccan cuisine.",
    },
    {
      title: "Cultural Connection",
      description:
        "Beyond recipes, TajineTales is a cultural journey. Learn about the stories behind the dishes, the significance of ingredients, and the traditions that make Moroccan cuisine a unique and cherished part of global gastronomy.",
    },
    {
      title: "Weekly Tales and Tips",
      description:
        "Subscribe to our newsletter for weekly tales from Morocco and valuable cooking tips. Stay in the loop with the latest additions to our recipe collection and embark on a culinary adventure with TajineTales.",
    },
  ];
  const [selected, setSelected] = useState(null);
  const toogle = (i) => {
    if (selected == i) {
      return setSelected(null);
    }
    setSelected(i);
  };
  const [cookies, _] = useCookies(["access_token"]);
  return (
    <>
      <div className="p-section why-choose">
        <div className="section-header">
          <h1 className="section-title">
            Why <span>choose us </span> ?
          </h1>
          <p className="section-text">
            Choose <Logo1 /> for an authentic Moroccan culinary experience that
            transports you to the heart of Morocco. Let the aroma of spices and
            the tales of tajines inspire your cooking journey!
          </p>
        </div>
        <div className="wrapper">
          <div className="accordion">
            {data.map((item, i) => (
              <div key={i} className="item">
                <div className="title" onClick={() => toogle(i)}>
                  <h2>{item.title}</h2>
                  <span>{selected == i ? "-" : "+"}</span>
                </div>
                <div
                  className={selected == i ? "description show" : "description"}
                >
                  {item.description}{" "}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="cta-section">
        <div className="cta-frame">
        <div className="cta-content">
            <h1 className="cta-title">Ready to Dive into Moroccan Cooking?</h1>
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
          <div className="cta-img-container">
            <img src={ctaImg1} alt="cta" />
          </div>
          <div className="cta-img-container">
            <img src={ctaImg2} alt="cta" />
          </div>
        </div>
      </div>
    </>
  );
};
