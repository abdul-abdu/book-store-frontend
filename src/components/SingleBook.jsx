import { Card, Button } from 'react-bootstrap'
import React from 'react'

class SingleBook extends React.Component {
  sendData = (book) => {
    this.props.grandCallback(book)
  }
  // constructor(pro)
  render() {
    return (
      <Card style={{ width: '13rem' }}>
        <div className='card-img-box'>
          <Card.Img variant="top" src={this.props.book.img} />
        </div>
        <Card.Body>
          <div className='card-tex-box'>
            <Card.Title>{this.props.book.title}</Card.Title>
            <Card.Text>$ {this.props.book.price}</Card.Text>
          </div>
          <Button className='my-1' variant="outline-warning">Buy Now</Button>
          <Button
            variant="outline-info"
            onClick={() => {
              this.props.onClick()
              this.sendData(this.props.book)
            }}
          >Comment
        </Button>
        </Card.Body>
      </Card >
    )
  }
}


export default SingleBook