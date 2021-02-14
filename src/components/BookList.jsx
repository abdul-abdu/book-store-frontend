import SingleBook from "./SingleBook";
import debounce from "lodash.debounce";

import { Spring } from "react-spring/renderprops";
import { Component } from "react";

const { Col, Container, Row, Spinner, Alert } = require("react-bootstrap");

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, books: [], loading: false, nextQuery: null };

    window.onscroll = debounce(() => {
      if (this.state.error || this.state.loading) return;

      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        this.refreshList(this.state.nextQuery);
      }
    }, 100);
  }

  refreshList = async (query) => {
    this.setState({ loading: true });
    const { currentCategory } = this.props;
    let url = process.env.REACT_APP_API_URL + "/books";

    try {
      let currentQuery = query ? query : "?limit=10&offset=0";
      if (currentCategory !== "all") {
        currentQuery += `&category=${currentCategory}`;
      }

      if (this.props.searchQuery) {
        console.log(this.props.searchQuery);
        currentQuery += `&title=${this.props.searchQuery}`;
      }

      const request = await fetch(url + currentQuery);

      if (request.ok) {
        const { books: newBooks, next } = await request.json();

        this.setState({
          books: [...this.state.books, ...newBooks],
          nextQuery: next,
          loading: false,
        });
        console.log(this.state.nextQuery);
        console.log(next);
      } else {
        throw new Error();
      }
    } catch (error) {
      this.setState({
        error: error.message,
        loading: false,
      });

      console.log(error);
    }
  };

  componentDidMount = () => {
    this.refreshList();
  };

  componentWillUnmount = () => (window.onscroll = () => {});

  render() {
    const { books, error, loading } = this.state;
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
}

export default BookList;
