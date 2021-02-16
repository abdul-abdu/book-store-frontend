import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [surname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const history = useHistory();

  const submitForm = async (e) => {
    e.preventDefault();
    const url = process.env.REACT_APP_API_URL + "/users/register";
    // const base64EmailAndPW = btoa(email + ":" + password1);
    // alert(base64EmailAndPW);

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          username,
          surname,
          email,
          password: password1,
          role: "Admin",
        }),
      });

      console.log(res);

      const result = await res.json();
      console.log(result);

      if (res.ok) {
        // localStorage.setItem("base64", base64EmailAndPW);
        history.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="">
      <Row>
        <form onSubmit={submitForm} className="text-white">
          <h3>Sign Up</h3>

          <div className="form-group">
            <label>First name</label>
            <input
              type="text"
              id="username"
              className="form-control"
              placeholder="First name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Last name</label>
            <input
              type="text"
              id="lastname"
              className="form-control"
              placeholder="Last name"
              value={surname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              id="email"
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
              id="password"
              className="form-control"
              autoComplete="on"
              placeholder="Enter password"
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              autoComplete="on"
              placeholder="Enter password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block"
            value="Submit"
          >
            Sign Up
          </button>
          <p className="forgot-password text-right">
            Already registered?{"  "}
            <Link to="/" className="text-white">
              <b>Sign In</b>
            </Link>
          </p>
        </form>
      </Row>
    </Container>
  );
};

export default Register;
