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
    try {
      const url =
        process.env.NODE_ENV === "production"
          ? process.env.BE_URL_PROD
          : process.env.BE_URL_DEV
      console.log("process.env.NODE_ENV", process.env.NODE_ENV)
      console.log("process.env.BE_URL_DEV", process.env.BE_URL_DEV)
      console.log("process.env.BE_URL_PROD", process.env.BE_URL_PROD)

      console.log("url->>>>>>>>>>>>>>", url)
      const request = await fetch("http://localhost:3001/books")
      const books = await request.json()
      this.setState({ books: books, loading: false })
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const { books, loading } = this.state
    return (
      <Container>
        <Row xs={2} sm={2} md={3} lg={4} xl={5}>
          {loading ? (
            <Col>
              <Spinner animation="border" />
            </Col>
          ) : (
            books.map((book) => {
              return (
                <Col className="my-2" key={book.asin}>
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
