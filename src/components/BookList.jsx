import SingleBook from './SingleBook'
import React from 'react'
const { Col } = require('react-bootstrap')

class BookList extends React.Component {


  render() {
    return (
      this.props.listOfBooks.map((book) => {
        return (
          <Col className='my-2' key={book.asin}>
            <SingleBook book={book} />
          </Col>
        )
      })

    )
  }
}
export default BookList