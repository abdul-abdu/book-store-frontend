import SingleBook from './SingleBook'
import { Col } from 'react-bootstrap'


const BookList = ({ listOfBooks }) => {
  return (
    listOfBooks.map(book => {
      return (
        <Col className='my-2' key={book.asin}>
          <SingleBook book={book} />
        </Col>
      )
    })

  )
}
export default BookList