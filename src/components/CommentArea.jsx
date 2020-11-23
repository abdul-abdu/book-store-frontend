import { Button, Spinner, Container, Row, Col } from 'react-bootstrap'


const CommentArea = ({ showComment, onClick, bookInfo }) => {
  const showHiddenClassName = showComment ? 'modal display-block' : 'modal display-none'

  return (
    <main>
      <div className={showHiddenClassName}>
        <Container className='modal-main text-dark'>
          {bookInfo ? (

            <>
              <Row className=''>
                <Col><img src={bookInfo.img} alt="Girl in a jacket" width="150px" height="200px" /></Col>
                <Col>
                  <Button className='mx-1'>Add Comment</Button>
                  <Button className='mx-1'>Comment List</Button>
                </Col>
              </Row>

            </>

          ) : (
              <Button variant="primary" disabled className='mx-1'>
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                  Loading...
              </Button>
            )}

          <Row>
            <Col>
              <Button
                className='my-2 mx-1'
                variant="outline-info"
                onClick={onClick}>
                Close
               </Button>
            </Col>
          </Row>
        </Container>
      </div>

    </main >
  )
}
export default CommentArea