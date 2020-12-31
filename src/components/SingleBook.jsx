import { Card, Button, Badge } from "react-bootstrap";
import React from "react";
import ModalView from "./Modal";
import { withRouter } from "react-router-dom";

const SingleBook = (props) => {
  const [modalShow, setModalShow] = React.useState(false);

  const { book, history } = props;
  return (
    <>
      <Card style={{ maxWidth: "13rem" }}>
        <div className="card-img-box">
          <Card.Img
            variant="top"
            src={book.img}
            style={{ cursor: "pointer" }}
            onClick={() => {
              history.push("/books/" + book._id + "/details");
            }}
          />
        </div>
        <Card.Body>
          <div className="card-tex-box">
            <Card.Title>{book.title}</Card.Title>
            <Card.Text>
              <Badge variant="success">${book.price}</Badge>{" "}
            </Card.Text>
          </div>
          <Button className="my-1" variant="outline-warning">
            Add Cart
          </Button>
          <Button variant="outline-info" onClick={() => setModalShow(true)}>
            Comment
          </Button>
        </Card.Body>
      </Card>
      <ModalView show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
};

export default withRouter(SingleBook);
