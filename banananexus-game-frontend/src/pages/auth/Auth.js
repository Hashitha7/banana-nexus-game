/* eslint-disable import/no-anonymous-default-export */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import facebook from "../../assets/img/fb.png";
import navIcon2 from "../../assets/img/lnkd.png";
import navIcon3 from "../../assets/img/insta.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// sign up successfully!

export default function (props) {
  const navigate = useNavigate();
  let [authMode, setAuthMode] = useState("signin");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [newUserName, setNewUserName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");



  const fireStorageEvent = () => {
    window.dispatchEvent(new Event("storage"));
  };
  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };

  const authData = { userName: "Nipuni", password: "nipuni" };

  const handleUserName = (e) => {
    setUserName(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleRegisterUsername = (e) => {
    setNewUserName(e.target.value);
  };
  const handleRegisterEmail = (e) => {
    setNewEmail(e.target.value);
  };
  const handlerRegisterPassoword = (e) => {
    setNewPassword(e.target.value);
  };

  const Clear = () => {
    setUserName("");
    setPassword("");
    setNewUserName("");
    setNewEmail("");
    setNewPassword("");
  };


  const LoginHandler = async (e) => {
    e.preventDefault();

    // Validation check
    if (!userName || !password) {
        toast.error("Please enter username and password");
        return;
    }

    let data = new FormData();
    data.append("username", userName);
    data.append("password", password);
    data.append("grant_type", "password");

    let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `http://localhost:8080/api/v1/oauth/token`,
        headers: {
            Authorization: "Basic cGxheWVyOg==",
            "Content-Type": "multipart/form-data",
        },
        data: data,
    };

    try {
        const response = await axios(config);
        console.log(response, "res");

        // Check if access_token is present
        if (response?.data?.access_token) {
            localStorage.setItem("ACCESS_TOKEN", response?.data?.access_token);
            let details = response.data.user;
            localStorage.setItem("User", JSON.stringify(details));

            toast.success("Login successful!");
            setTimeout(() => navigate("/home"), 1000); // Redirect after 1 sec
        } else {
            toast.error("Invalid credentials. Please check your username and password.");
        }
    } catch (error) {
        console.error(error);

        // Handle different types of errors
        if (error.response) {
            // Server responded with an error message
            toast.error(error.response.data?.message || "Login failed. Please try again.");
        } else if (error.request) {
            // No response from the server
            toast.error("Server is not responding. Please try again later.");
        } else {
            // Other errors (e.g., network issues)
            toast.error("Something went wrong. Please check your internet connection.");
        }
    }
};



const SignUpHandler = async () => {
  if (!newUserName || !newEmail || !newPassword) {
      toast.error("Please fill in all fields");
      return;
  }

  try {
      const response = await axios({
          url: `http://localhost:8080/api/v1/player/signup`,
          method: "POST",
          headers: { "Content-Type": "application/json" },
          data: {
              userName: newUserName,
              email: newEmail,
              password: newPassword,
          },
      });

      if (response?.data?.success) {
          Clear();
          if (response.data.message === "sign up successfully!") {
              toast.success("Sign-up successful!");
          }
      } else {
          toast.error(response.data.message || "Sign-up failed. Please try again.");
      }
  } catch (error) {
      console.error(error);

      if (error.response) {
          toast.error(error.response.data?.message || "Registration failed. Try again.");
      } else if (error.request) {
          toast.error("Server is not responding. Please try again later.");
      } else {
          toast.error("Something went wrong. Please check your internet connection.");
      }
  }
};

  if (authMode === "signin") {
    return (
      
      <div className="Auth-form-container">
              <ToastContainer />
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="form-group mt-3">
              <label>User name</label>
              <input
                type="name"
                className="form-control mt-1"
                placeholder="User name"
                value={userName}
                onChange={(e) => handleUserName(e)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                value={password}
                onChange={(e) => handlePassword(e)}
              />
            </div>
            <p className="text-left link-text mt-4">
              <a className="link-text" href="src/pages/auth/Auth#">
                Forgot password?
              </a>
            </p>
            <div className="d-grid gap-2 mt-3">
              <button className="btn btn-dark" onClick={LoginHandler}>
                Submit
              </button>
            </div>
            <div className="link-primary text-end mt-3">
              <span> </span>
              <span className="link-text" onClick={changeAuthMode}>
                New User?
                <span
                  style={{ textDecoration: "underline", cursor: "pointer" }}
                >
                  {" "}
                  Sign Up
                </span>
              </span>
            </div>
            <div className="social-icon">
              <a href="src/pages/auth/Auth#">
                <img src={facebook} alt="" />
              </a>
              <a href="src/pages/auth/Auth#">
                <img src={navIcon2} alt="" />
              </a>
              <a href="src/pages/auth/Auth#">
                <img src={navIcon3} alt="" />
              </a>
            </div>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="Auth-form-container">
            <ToastContainer />
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="form-group mt-3">
            <label>User Name</label>
            <input
              type="name"
              className="form-control mt-1"
              placeholder="User name"
              value={newUserName}
              onChange={(e) => handleRegisterUsername(e)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email"
              value={newEmail}
              onChange={(e) => handleRegisterEmail(e)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              value={newPassword}
              onChange={(e) => handlerRegisterPassoword(e)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button
              onClick={SignUpHandler}
              type="button"
              className="btn btn-primary"
            >
              Submit
            </button>
          </div>

          <div className="text-end mt-3">
            <span className="link-text" onClick={changeAuthMode}>
              Already have an account?{" "}
              <span style={{ textDecoration: "underline", cursor: "pointer" }}>
                {" "}
                Sign In
              </span>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}
