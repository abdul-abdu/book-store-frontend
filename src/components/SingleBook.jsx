import { Card, Button } from 'react-bootstrap'
import React from 'react'
import ModalView from './Modal'

const SingleBook = (props) => {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Card style={{ width: '13rem' }}>
        <div className='card-img-box'>
          <Card.Img variant="top" src={props.book.img} />
        </div>
        <Card.Body>
          <div className='card-tex-box'>
            <Card.Title>{props.book.title}</Card.Title>
            <Card.Text>$ {props.book.price}</Card.Text>
          </div>
          <Button className='my-1' variant="outline-warning">Buy Now</Button>
          <Button
            variant="outline-info"
            onClick={() => setModalShow(true)}
          >Comment
        </Button>
        </Card.Body>
      </Card >
      <ModalView
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  )
}


export default SingleBook