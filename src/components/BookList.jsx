import SingleBook from './SingleBook'
import { Col } from 'react-bootstrap'
import React from 'react'


// { listOfBooks, onClick }
class BookList extends React.Component {
  
  
  render() {
    return (
      this.props.listOfBooks.map((book) => {
        return (
          <Col className='my-2' key={book.asin}>
            <SingleBook book={book} onClick={this.props.onClick} grandCallback={this.props.parentCallback} />
          </Col>
        )
      })

    )
  }
}
export default BookList