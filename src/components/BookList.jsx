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
    console.log("refresh")
    this.refreshList()
  }

  refreshList = async () => {
    try {
      const url = process.env.BE_URL
      console.log("url", url)
      const request = await fetch("http://localhost:3001/books")
      console.log(request)
      const books = await request.json()
      console.log(books)
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
