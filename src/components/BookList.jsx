import SingleBook from './SingleBook'
import { Col } from 'react-bootstrap'


const BookList = ({ listOfBooks, onClick }) => {
  console.log('BookList', onClick)
  return (
    listOfBooks.map((book) => {
      return (
        <Col className='my-2' key={book.asin}>
          <SingleBook book={book} onClick={onClick} />
        </Col>
      )
    })

  )
}
export default BookList