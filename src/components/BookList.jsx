import SingleBook from "./SingleBook"
const { Component } = require("react")
const { Col, Container, Row, Spinner } = require("react-bootstrap")

class BookList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      books: [],
      loading: true,
    }
  }

  componentDidMount = () => {
    this.refreshList()
  }

  refreshList = async () => {
    const { currentCategory } = this.props
    try {
      const url = process.env.API_URL || "http://localhost:3001/"
      const category = currentCategory === "all" ? null : currentCategory
      console.log(category)
      const req_url = category
        ? url + "books/?category=" + category
        : url + "books/"
      console.log("url", req_url)

      const request = await fetch(req_url)
      console.log(request)
      const books = await request.json()
      console.log(books)
      this.setState({ books: books, loading: false })
    } catch (error) {
      console.log(error)
    }
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.currentCategory !== this.props.currentCategory) {
      this.refreshList()
    }
  }

  render() {
    const { books, loading } = this.state
    return (
      <Container style={{ minHeight: "100vh" }}>
        <Row xs={2} sm={2} md={3} lg={4} xl={5}>
          {loading ? (
            <>
              <Col md={6}>
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
