import React, { useState } from "react";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";
import register_img from "../assets/images/login.png";  
import plane_vector from "../assets/images/plane_vector.png";

import google from "../assets/images/Google.png";
import facebook from "../assets/images/Facebook.png";
import apple from "../assets/images/apple.png";
import { Container, Row, Col } from "reactstrap";
import login_L from "../assets/images/login_L.png";
import login_F from "../assets/images/login_F.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      navigate("/home");
    } catch (error) {
      setError("Login error: " + error.message);
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      navigate("/home");
    } catch (error) {
      setError(`Google sign-in failed: ${error.message}`);
    }
  };

  const handleFacebookLogin = async () => {
    const provider = new FacebookAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      navigate("/home");
    } catch (error) {
      setError(`Facebook sign-in failed: ${error.message}`);
    }
  };

  return (
    <section className="register-container_sec">
      <Container>
        <Row>
          <Col lg="12">
            <div className="login-container">
              <div className="image-section">
                <img src={register_img} alt="background" />
              </div>
              <form className="login-form" onSubmit={handleSubmit}>
                <h2>Welcome</h2>
                <p>Login with Email</p>
                {error && <p className="error-message">{error}</p>}
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={handleInputChange}
                  required
                />
                <button type="submit" disabled={loading}>
                  {loading ? "Logging in..." : "Log In"}
                </button>

                <div className="social-login">
                  <p className="or-text">OR</p>
                  <a type="button" onClick={handleGoogleLogin}>
                    <img src={google} alt="Google" />
                  </a>
                  <a type="button" onClick={handleFacebookLogin}>
                    <img src={facebook} alt="Facebook" />
                  </a>
                  <a type="button">
                    <img src={apple} alt="Apple" />
                  </a>
                </div>

                <p>
                  Don't have an account? <Link to="/register">Register</Link>
                </p>
                <div className="top_login">
                  <img src={login_L} alt="" />
                  <img src={login_F} alt="" />
                </div>
              </form>
            </div>
            <img className="plane_vector" src={plane_vector} alt="" />
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Login;
