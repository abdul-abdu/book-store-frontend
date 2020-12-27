import SingleBook from "./SingleBook"
const { Component } = require("react")
const { Col, Container, Row, Spinner, Alert } = require("react-bootstrap")

class BookList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      books: [],
      loading: true,
      error: null,
    }
  }

  componentDidMount = () => {
    this.refreshList()
  }

  refreshList = async () => {
    const { currentCategory } = this.props
    let url = "ss" //process.env.REACT_APP_API_URL || "http://localhost:3001"
    const category = currentCategory === "all" ? null : currentCategory
    const req_url = category
      ? url + "/books/?category=" + category
      : url + "/books/"
    console.log("req_url", req_url)

    try {
      const request = await fetch(req_url)
      console.log(request)

      if (request.ok) {
        const books = await request.json()
        console.log(books)
        this.setState({ books: books, loading: false })
      } else {
        this.setState({
          error: "Something went wrong. Try to refresh the page",
          loading: false,
        })
      }
    } catch (error) {
      this.setState({
        error: "Something went wrong. Try to refresh the page",
        loading: false,
      })
      console.log(error)
    }
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.currentCategory !== this.props.currentCategory) {
      this.refreshList()
    }
  }

  render() {
    const { books, loading, error } = this.state
    return (
      <Container style={{ minHeight: "80vh" }}>
        {error && <Alert variant="danger">{error}</Alert>}
        <Row xs={2} sm={2} md={3} lg={4} xl={5}>
          {loading ? (
            <>
              <Col sm={{ span: 6, offset: 5 }}>
                <Spinner animation="border" variant="success" />
              </Col>
            </>
          ) : (
            books.map((book, idx) => {
              return (
                <Col className="my-2" key={idx}>
                  <SingleBook book={book} />
                </Col>
              )
            })
          )}
        </Row>
      </Container>
    )
  }
}

export default BookList
