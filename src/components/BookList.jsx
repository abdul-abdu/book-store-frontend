import SingleBook from "./SingleBook"
const { Component } = require("react")
const { Col, Container, Row, Spinner } = require("react-bootstrap")

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
    const { currentCategory, homePage } = this.props
    let url = process.env.API_URL || "http://localhost:3001/"
    const category = currentCategory === "all" ? null : currentCategory

    if (homePage) {
      url += "?home=true"
    }
    const req_url = category
      ? url + "books/?category=" + category
      : url + "books/"
    console.log("req_url", req_url)

    try {
      const request = await fetch(req_url)
      console.log(request)

      if (request.ok) {
        const books = await request.json()
        console.log(books)
        this.setState({ books: books, loading: false })
      } else {
        this.setState({ error: request, loading: false })
      }
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
      <Container style={{ minHeight: "80vh" }}>
        <Row xs={2} sm={2} md={3} lg={4} xl={5}>
          {loading ? (
            <>
              <Col md={{ span: 6, offset: 4 }}>
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
