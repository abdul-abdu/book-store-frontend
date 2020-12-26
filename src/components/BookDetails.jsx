import {
  Spinner,
  Col,
  Container,
  Alert,
  Button,
  Image,
  Row,
  Form,
  Badge,
} from "react-bootstrap"

const { useEffect, useState } = require("react")

const BookInfo = (props) => {
  // Similar to componentDidMount and componentDidUpdate:
  const [bookDetail, setBookDetail] = useState(null)
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState(null)

  const fetchBook = async () => {
    const bookId = props.match.params.id
    try {
      let url = process.env.API_URL || "http://localhost:3001/books/"
      url += bookId
      const request = await fetch(url)
      console.log(request)
      if (request.ok) {
        const bookInfo = await request.json()
        setBookDetail(bookInfo)
        setFetching(false)
      } else {
        setError((e) => e)
        setFetching(false)
      }
    } catch (error) {
      setError(error)
    }
  }

  useEffect(() => {
    fetchBook()
  }, [props.match.params.id])

  return (
    <Container className="text-white" style={{ minHeight: "80vh" }}>
      <Row xs={1} sm={1} md={2}>
        {fetching ? (
          <Col md={{ span: 6, offset: 4 }}>
            <Spinner animation="border" variant="success" />
          </Col>
        ) : (
          <>
            {error ? (
              <Alert variant="danger">
                Something went wrong! Try to refresh the page
              </Alert>
            ) : (
              <>
                <Col>
                  <h1>
                    <b>{bookDetail.title}</b>
                  </h1>
                  <div>
                    <div>
                      <b className="mx-1">Price: </b>
                      <Badge variant="success">$ {bookDetail.price}</Badge>
                    </div>
                    <div>
                      <b>Category: </b>
                      {bookDetail.category}
                    </div>
                  </div>
                  <div className="comments">
                    <h4>Comments</h4>
                    <Form>
                      <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="text" placeholder="Add comment" />
                      </Form.Group>
                      <Button variant="primary" type="submit">
                        Submit
                      </Button>
                    </Form>
                    {/* COMMENTS */}
                  </div>
                </Col>
                <Col style={{ width: "100%" }}>
                  <Image
                    src={bookDetail.img}
                    alt="img"
                    style={{ width: "100%" }}
                  />
                </Col>
              </>
            )}
          </>
        )}
      </Row>
    </Container>
  )
}

export default BookInfo
