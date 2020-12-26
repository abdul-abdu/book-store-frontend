import SingleBook from "./SingleBook"
const { Component, Fragment } = require("react")
const debounce = require("lodash.debounce")
const { Col, Container, Row, Spinner } = require("react-bootstrap")

class BookList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      books: [],
      loading: true,
      error: null,
      hasMore: true,
    }

    window.onscroll = debounce(() => {
      const {
        refreshList,
        state: { loading, hasMore, error },
      } = this

      if (error || loading || !hasMore) return

      // Checks that the page has scrolled to the bottom
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        refreshList()
      }
    }, 100)
  }

  // componentDidMount = () => {
  //   this.refreshList()
  // }

  // If category changes fetes data again
  componentDidUpdate = (prevProps) => {
    if (prevProps.currentCategory !== this.props.currentCategory) {
      this.refreshList()
    }
  }

  refreshList = async () => {
    const { currentCategory, homePage } = this.props
    let url = process.env.API_URL || "http://localhost:3001/"
    const category = currentCategory === "all" ? null : currentCategory

    if (homePage) {
      url += "?home=true"
    }
    const categ_url = category
      ? url + "books/?category=" + category
      : url + "books/"
    console.log("req_url", categ_url)

    const req_url = (categ_url += "/?results=10")

    try {
      const request = await fetch(req_url)
      console.log(request)

      if (request.ok) {
        const books = await request.json()
        console.log(books)
        this.setState({
          books: [...this.state.books, ...books],
          loading: false,
        })
      } else {
        this.setState({ error: request, loading: false })
      }
    } catch (error) {
      console.log(error)
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
