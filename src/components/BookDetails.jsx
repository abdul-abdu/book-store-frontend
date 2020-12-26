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
  const [comments, setComments] = useState([])
  const [fetchingComment, setFetchingComments] = useState(true)
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState(null)
  const [cmommentsError, setCmommentsError] = useState(null)

  let url = process.env.API_URL || "http://localhost:3001/books/"
  const bookId = props.match.params.id
  const fetchBook = async () => {
    try {
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

  const fetchComments = async () => {
    try {
      url += bookId + "/comments"
      const response = await fetch(url)
      if (response.ok) {
        const comments = await response.json()
        setComments(comments)
        setFetchingComments(false)
      } else {
        setCmommentsError(response.status)
      }
    } catch (err) {
      setCmommentsError(err)
      setFetchingComments(false)
    }
  }

  useEffect(() => {
    fetchBook()
    fetchComments()
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
                  <Image
                    src={bookDetail.img}
                    alt="img"
                    style={{ width: "100%" }}
                  />
                </Col>
                <Col>
                  <h4>
                    <b>{bookDetail.title}</b>
                  </h4>
                  <div>
                    <div>
                      <b className="mx-1">Price: </b>
                      <Badge variant="warning">$ {bookDetail.price}</Badge>
                    </div>
                    <div>
                      <b>Category: </b>
                      {bookDetail.category}
                    </div>
                  </div>
                  <div className="comments border-top border-bottom mt-4 pt-2">
                    <Form className="my-3 pb-2 border-bottom">
                      <Form.Group controlId="username">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Name" />
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <Form.Label>Add Comment</Form.Label>
                        <Form.Control type="text" placeholder="Add comment" />
                      </Form.Group>
                      <Button variant="primary" type="submit">
                        Submit
                      </Button>
                    </Form>
                    <h4>Comments:</h4>

                    {setFetchingComments ? (
                      <Spinner animation="border" variant="success" />
                    ) : (
                      comments.map((comment) => JSON.stringify(comment))
                    )}
                  </div>
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
