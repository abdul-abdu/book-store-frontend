import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const submitForm = async (e) => {
    e.preventDefault();
    const url = process.env.REACT_APP_API_URL + "/users/me";
    const base64EmailAndPW = btoa(email + ":" + password);

    try {
      const res = await fetch(url, {
        headers: {
          Authorization: "Basic " + base64EmailAndPW,
        },
      });

      if (res.ok) {
        localStorage.setItem("base64", base64EmailAndPW);
        history.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="">
      <Row>
        <form onSubmit={submitForm} className="text-white">
          <h3>Sign In</h3>

          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              autoComplete="on"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block"
            value="Submit"
          >
            Sign In
          </button>
          <p className="forgot-password text-right">
            Do not have an account?{" "}
            <Link to="/" className="text-white">
              <b>Sign Up</b>
            </Link>
          </p>
        </form>
      </Row>
    </Container>
  );
};

export default Login;
