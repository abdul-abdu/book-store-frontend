import React, { useState, useEffect } from "react";
import SingleBook from "./SingleBook";
import ScrollDebounce from "../functions/ScrollDebounce";
import { Spring } from "react-spring/renderprops";

const { Col, Container, Row, Spinner, Alert } = require("react-bootstrap");

export default function BookList(props) {
  const [error, setError] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(null);
  const [nextQuery, setNextQuery] = useState(null);

  const refreshList = async (query) => {
    setLoading({ loading: true });
    const { currentCategory } = props;
    let url = process.env.REACT_APP_API_URL + "/books";

    try {
      let currentQuery = query ? query : "?limit=10&offset=0";
      if (currentCategory !== "all") {
        currentQuery += `&category=${currentCategory}`;
        setBooks([]);
      }

      if (props.searchQuery) {
        console.log(this.props.searchQuery);
        currentQuery += `&title=${this.props.searchQuery}`;
      }

      const request = await fetch(url + currentQuery);

      if (request.ok) {
        const { books: newBooks, next } = await request.json();

        setBooks([...books, ...newBooks]);
        setLoading(false);
        setNextQuery(next);
      } else {
        setError("Something went wrong. Try to refresh the page");
        setLoading(false);
      }
    } catch (error) {
      setError("Something went wrong. Try to refresh the page");
      setLoading(false);
      console.log(error);
    }
  };

  ScrollDebounce({ loading, error, nextQuery, refreshList });

  useEffect(() => {
    refreshList();
  }, []);

  return (
    <div>
      <Container style={{ minHeight: "80vh" }}>
        {error && <Alert variant="danger">{error}</Alert>}

        <Row xs={2} sm={2} md={3} lg={4} xl={5}>
          {books.length > 0 &&
            books.map((book, idx) => {
              return (
                <Col className="my-2 px-1" key={idx}>
                  <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
                    {(props) => (
                      <div style={props}>
                        <SingleBook book={book} />
                      </div>
                    )}
                  </Spring>
                </Col>
              );
            })}
        </Row>
        {loading && (
          <Spinner animation="border" variant="warning" className="mt-5" />
        )}
      </Container>
    </div>
  );
}
