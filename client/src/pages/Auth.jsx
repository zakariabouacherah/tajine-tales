import axios from "axios";
import { useState } from "react";
import "../style/auth.css";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Swal from 'sweetalert2'

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  

  const toggleForm = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
  };

  return (
    <div>
      {!isLogin ? (
        <Login toggleForm={toggleForm} />
      ) : (
        <Register toggleForm={toggleForm} />
      )}
    </div>
  );
};

const Login = ({ toggleForm }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        username,
        password,
      });
      if (response.data.message) {
        Swal.fire({
          title : "Error!",
          text : response.data.message,
          icon : 'error'
        })
      } else {
        setCookies("access_token", response.data.token);
        window.localStorage.setItem("userID" , response.data.userID)
        window.localStorage.setItem("username" , response.data.username)
        Swal.fire({
          title : "Success",
          text : `Welcome Back ${response.data.username.toUpperCase()}`,
          icon : 'success'
        })
        navigate('/')
      }
    } catch (err) {
      console.log(err.response.data.error);
    }
  };

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label="Login"
      text="You don't have an account yet ?"
      link="Register"
      toggleForm={toggleForm}
      onSubmit={onSubmit}
    />
  );
};

const Register = ({ toggleForm }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/auth/register", {
        username,
        password,
      });
      if (response.data.message !== "User already exists!") {
        Swal.fire({
          title : "Success",
          text : "Registration completed! Now login",
          icon : 'Success'
        })
        toggleForm();
      } else {
        Swal.fire({
          title : "Error!",
          text : response.data.message,
          icon : 'error'
        })
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label="Register"
      text="Already Registered ?"
      link="Login"
      toggleForm={toggleForm}
      onSubmit={onSubmit}
    />
  );
};

const Form = ({
  username,
  setUsername,
  password,
  setPassword,
  label,
  link,
  toggleForm,
  text,
  onSubmit,
}) => {
  return (
    <div className="auth-container">
      <h2>{label}</h2>
      <form className="auth" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username : </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password : </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <p className="text">
          {text} <span onClick={toggleForm}>{link}</span>
        </p>
        <button className="auth-btn">{label}</button>
      </form>
    </div>
  );
};
