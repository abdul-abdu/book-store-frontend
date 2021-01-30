import SingleBook from "./SingleBook";
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
  }

  componentDidMount = () => {
    this.refreshList();
  };

  refreshList = async () => {
    const { currentCategory } = this.props;
    let url = process.env.REACT_APP_API_URL;
    const category = currentCategory === "all" ? null : currentCategory;
    const req_url = category
      ? url + "/books/?category=" + category
      : url + "/books/";
    console.log("req_url", req_url);

    try {
      const request = await fetch(req_url + "?limit=10&offset=10");
      // console.log(request);

      if (request.ok) {
        const { books, next } = await request.json();
        this.setState({ books: books, loading: false, next_books: next });
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
    const { books, loading, error } = this.state;
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
      </Container>
    );
  }
}

export default BookList;
