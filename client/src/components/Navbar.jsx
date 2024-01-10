import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useState } from "react";
import "./navbar.css";
import { Logo } from "./logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const username = window.localStorage.getItem("username");
  const firstLetter = username ? username.charAt(0).toUpperCase() : "";
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [color, setColor] = useState(false);
  const [navbarActive , setNavbarActive] = useState(false)

  const changeColor = () => {
    if (window.scrollY >= 67) {
      setColor(true);
    } else {
      setColor(false);
    }
  };
  const showNavbar = () => {
    setNavbarActive(true)
  }
  const hideNavbar = () => {
    setNavbarActive(false)
  }
  window.addEventListener("scroll", changeColor);

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const closeProfile = () => {
    setIsProfileOpen(false);
  };

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    window.localStorage.removeItem("username");
    navigate("/auth");
  };
  return (
    <nav className={color ? "nav-bg" : ""}>
      <Link className="logo" to="/">
        <Logo />
      </Link>
      <div className={navbarActive ? "nav active" : "nav"}>

      <div className="left">
        <ul className="nav-list">
          <li className="nav-item" onClick={hideNavbar}>
            <Link to="/">Home</Link>
          </li>
          <li className="nav-item" onClick={hideNavbar}>
            <Link to="/recipes">Recipes</Link>
          </li>
          <li className="nav-item" onClick={hideNavbar}>
            <Link to="/about">About</Link>
          </li>
          <li className="nav-item" onClick={hideNavbar}>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>
      <>
      {!cookies.access_token ? (
        <Link className="btn login-btn" to="/auth" onClick={hideNavbar}>
          REGISTER
        </Link>
      ) : (
        <div className="profil">
          <div className="profile-dropdown" onClick={toggleProfile}>
            <p>{firstLetter}</p>
            {isProfileOpen && (
              <div className="dropdown-content">
                <div className="username">{username.toUpperCase()}</div>
                <Link className="profile-list" to="/favorites" onClick={hideNavbar}>
                  <span className="favourites" >
                    <FontAwesomeIcon icon={faHeart} />
                  </span>
                  <span>Favourites</span>
                </Link>
                <Link onClick={logout} className="btn login-btn" to="/auth">
                  Logout
                </Link>
              </div>
            )}
          </div>
          {isProfileOpen && (
            <div
              className="overlay"
              onClick={closeProfile}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100svh",
                background: "rgba(0, 0, 0, 0.3)",
                backdropFilter: "blur(4px)",
                zIndex: "11",
              }}
            ></div>
          )}
        </div>
      )}
      <div className="close" onClick={hideNavbar}>
        <FontAwesomeIcon icon={faXmark} />
      </div>
      </>

      </div>
      <div className="hamburger" onClick={showNavbar}>
        <FontAwesomeIcon icon={faBars} />
      </div>
      <div className={navbarActive ? "nav-overlay active" : "nav-overlay"} onClick={hideNavbar}></div>
    </nav>
  );
};
