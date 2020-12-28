const { Component } = require("react");
const {
  Spinner,
  Col,
  Container,
  Alert,
  Button,
  Image,
  Row,
  Form,
  Badge,
} = require("react-bootstrap");
const axios = require("axios");

class BookInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookDetail: null,
      loading: true,
      error: null,
      comments: [],
      loadingComments: true,
      cmommentsError: null,
    };
    this.url = process.env.REACT_APP_API_URL;
    this.bookId = props.match.params.id;
  }

  componentDidMount = () => {
    axios
      .get(this.url + "/books/" + this.bookId)
      .then((response) => {
        this.setState({ bookDetail: response.data, loading: false });
        console.log("response", response.data);
      })
      .catch(function (error) {
        this.setState({
          error: "Something went wrong. Try to refresh the page",
          loading: false,
        });
      });
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.loading !== this.state.loading) {
      axios
        .get(this.url + "/books/" + this.bookId + "/comments")
        .then((response) => {
          this.setState({ comments: response.data, loadingComments: false });
          console.log("response", response.data);
        })
        .catch((error) => {
          this.setState({
            cmommentsError: "Something went wrong. Try to refresh the page",
            loadingComments: false,
          });
        });
    }
  };

  render() {
    const {
      bookDetail,
      error,
      loading,
      comments,
      cmommentsError,
      loadingComments,
    } = this.state;
    return (
      <Container className="text-white" style={{ minHeight: "80vh" }}>
        <Row xs={1} sm={1} md={2}>
          {loading ? (
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

                      {loadingComments ? (
                        <Spinner animation="border" variant="success" />
                      ) : (
                        comments.map((comment) => <div>comment</div>)
                      )}
                      {cmommentsError && (
                        <Alert variant="danger">Comments does not exists</Alert>
                      )}
                    </div>
                  </Col>
                </>
              )}
            </>
          )}
        </Row>
      </Container>
    );
  }
}

export default BookInfo;
