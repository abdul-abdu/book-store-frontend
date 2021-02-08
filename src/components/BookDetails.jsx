import BeautyStars from "beauty-stars";
import { GiShoppingCart } from "react-icons/gi";
import { MdFavorite } from "react-icons/md";

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
      form: { rate: 0, comment: "", name: "" },
      sendingComment: false,
      errorSendingComment: null,
    };
    this.url = process.env.REACT_APP_API_URL;
    this.bookId = props.match.params.id;
  }

  fetchData = (url) => {
    axios
      .get(url)
      .then((response) => {
        return { data: response.data, loading: false, error: null };
      })
      .catch((error) => {
        return {
          error: "Something went wrong. Try to refresh the page",
          loading: false,
          data: null,
        };
      });
  };

  submitForm = async (e) => {
    e.preventDefault();
    this.setState({ sendingComment: true });
    try {
      const response = await fetch(
        this.url + `/books/${this.bookId}/comments`,
        {
          method: "POST",
          body: JSON.stringify(this.state.form),
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        }
      );

      if (response.ok) {
        this.setState({
          sendingComment: false,
          form: {
            rate: 0,
            name: "",
            comment: "",
          },
        });
      }
    } catch (error) {
      console.log(error);

      this.setState({ errorSendingComment: true });
    }
  };

  updateForm = (e) => {
    const form = { ...this.state.form };
    if (e.currentTarget) {
      const curruntId = e.currentTarget.id;
      form[curruntId] = e.currentTarget.value;
    } else {
      form.rate = e;
    }
    this.setState({ form });
  };

  componentDidMount = async () => {
    try {
      const response = await fetch(this.url + "/books/" + this.bookId);
      if (response.ok) {
        const bookDetails = await response.json();
        this.setState({ bookDetail: bookDetails, loading: false });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // componentDidUpdate = (prevProps, prevState) => {
  //   if (prevState.loading !== this.state.loading) {
  //     axios
  //       .get(this.url + "/books/" + this.bookId + "/comments")
  //       .then((response) => {
  //         this.setState({ comments: response.data, loadingComments: false });
  //         console.log("response", response.data);
  //       })
  //       .catch((error) => {
  //         this.setState({
  //           cmommentsError: "Something went wrong. Try to refresh the page",
  //           loadingComments: false,
  //         });
  //       });
  //   }
  // };

  render() {
    const {
      bookDetail,
      error,
      loading,
      comments,
      cmommentsError,
      loadingComments,
      form,
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
                  <Col style={{ textAlign: "start" }}>
                    <h4>
                      <b>{bookDetail.title}</b>
                    </h4>
                    <div className="my-3">
                      <div>
                        <b className="mx-1">Price: </b>
                        <Badge variant="warning">$ {bookDetail.price}</Badge>
                      </div>
                      <div>
                        <b>Category: </b>
                        {bookDetail.category}
                      </div>
                    </div>
                    <Button className="mx-2" variant="warning">
                      <MdFavorite />
                      Add Favorite
                    </Button>
                    <Button className="mx-2" variant="warning">
                      <GiShoppingCart />
                      Add Cart
                    </Button>
                    <div className="comments border-top border-bottom mt-4 pt-2">
                      <Form
                        onSubmit={this.submitForm}
                        className="my-3 pb-2 border-bottom"
                      >
                        <Form.Group controlId="name">
                          <Form.Label>Name</Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder="Name"
                            value={form.name}
                            onChange={this.updateForm}
                          />
                        </Form.Group>
                        <Form.Group controlId="comment">
                          <Form.Label>Add Comment</Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder="Add comment"
                            value={form.comment}
                            onChange={this.updateForm}
                          />
                        </Form.Group>
                        <Form.Label>Rate</Form.Label>
                        <BeautyStars
                          value={form.rate}
                          onChange={this.updateForm}
                        />
                        <Button
                          className="mt-4"
                          variant="primary"
                          type="submit"
                        >
                          Submit
                        </Button>
                      </Form>
                      <h4>Comments:</h4>

                      {loadingComments ? (
                        <Spinner animation="border" variant="warning" />
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
