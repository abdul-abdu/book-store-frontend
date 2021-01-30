import SingleBook from "./SingleBook";
import debounce from "lodash.debounce";

const { Component } = require("react");
const { Col, Container, Row, Spinner, Alert } = require("react-bootstrap");

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      loading: true,
      error: null,
      next_books: null,
    };

    window.onscroll = debounce(() => {
      const {
        state: { error, loading, next_books },
      } = this;

      if (error || loading) return;

      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        this.refreshList(next_books);
      }
    }, 100);
  }

  componentDidMount = () => {
    this.refreshList();
  };

  refreshList = async (query) => {
    this.setState({ loading: true });
    const { currentCategory } = this.props;
    let url = process.env.REACT_APP_API_URL + "/books";

    try {
      let currentQuery = query ? query : "?limit=10&offset=10";
      if (currentCategory !== "all") {
        currentQuery += `&category=${currentCategory}`;
      }

      const request = await fetch(url + currentQuery);

      if (request.ok) {
        const { books, next } = await request.json();
        console.log("books", books);

        this.setState({
          books: [...this.state.books, ...books],
          loading: false,
          next_books: next,
        });
      } else {
        this.setState({
          error: "Something went wrong. Try to refresh the page",
          loading: false,
        });
      }
    } catch (error) {
      this.setState({
        error: "Something went wrong. Try to refresh the page",
        loading: false,
      });
      console.log(error);
    }
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.currentCategory !== this.props.currentCategory) {
      this.refreshList();
    }
  };

  render() {
    const { books, loading, error, next_books } = this.state;
    return (
      <Container style={{ minHeight: "80vh" }}>
        {loading && (
          <Spinner animation="border" variant="success" className="mt-5" />
        )}
        {error && <Alert variant="danger">{error}</Alert>}

        <Row xs={2} sm={2} md={3} lg={4} xl={5}>
          {!loading &&
            books.map((book, idx) => {
              return (
                <Col className="my-2 px-1" key={idx}>
                  <SingleBook book={book} />
                </Col>
              );
            })}
        </Row>

        {!next_books && <Alert variant="danger">There is no more books</Alert>}
      </Container>
    );
  }
}

export default BookList;
