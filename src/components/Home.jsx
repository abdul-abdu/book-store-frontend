import settings from "./settings";
import React, { Component } from "react";
import {
  Container,
  Col,
  Image,
  Spinner,
  Jumbotron,
  Button,
  Alert,
} from "react-bootstrap";
import { withRouter } from "react-router-dom";
import Slider from "react-slick";
const axios = require("axios").default;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      booksPreview: [],
      loading: true,
      error: null,
    };
  }

  componentDidMount = () => {
    const url = process.env.REACT_APP_API_URL;
    axios
      .get(url + "/books/preview")
      .then((response) => {
        if (response.statusText === "OK") {
          this.setState({ booksPreview: response.data, loading: false });
        }
      })
      .catch((err) => {
        this.setState({
          error: "Something went wrong. Try to refresh the page",
          loading: false,
        });
        console.log("error:", err);
      });
  };

  render() {
    const { booksPreview, loading, error } = this.state;
    return (
      <Container className="text-white " style={{ minHeight: "80vh" }}>
        <Jumbotron className="bg-dark">
          <h1>Hello, world!</h1>
          <p>
            This is a simple hero unit, a simple jumbotron-style component for
            calling extra attention to featured content or information.
          </p>
          <p>
            <Button variant="primary">Learn more</Button>
          </p>
        </Jumbotron>
        {error && <Alert variant="danger">{error}</Alert>}
        {loading && (
          <div>
            <Spinner animation="border" variant="warning" />
          </div>
        )}
        {booksPreview.length > 0 &&
          booksPreview.map((booksCategories, idx) => (
            <div className="mb-5" key={idx}>
              <h2 style={{ textAlign: "start" }}>
                {booksCategories[0].category.toUpperCase()}
              </h2>
              <Col>
                <Slider {...settings}>
                  {booksCategories.map((book, idx) => (
                    <div className="px-2" key={idx}>
                      <Image
                        src={book.img}
                        alt="img"
                        style={{
                          width: "100%",
                          height: "320px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          this.props.history.push(
                            "/books/" + book._id + "/details"
                          );
                        }}
                      />
                    </div>
                  ))}
                </Slider>
              </Col>
            </div>
          ))}
      </Container>
    );
  }
}

export default withRouter(Home);
