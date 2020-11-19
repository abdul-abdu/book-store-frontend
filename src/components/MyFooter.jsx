import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'



const Footer = () => {
  return (
    <footer className="page-footer font-small blue pt-4 bg-dark text-white">
      <Container fluid>
        <Row>
          <Col>
            <h5>Footer content</h5>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique quas animi, eos sint vitae voluptatibus consectetur quae mollitia adipisci laboriosam pariatur, explicabo quia ullam sequi modi dolor ad. Non, voluptates..</p>
          </Col>
          <hr className="clearfix w-100 d-md-none pb-3" />
          <Col>
            {/* Links */}
            <h5 className='text-uppercase'>Links</h5>
            <ul>
              <li>
                <a href="#!">Link 1</a>
              </li>
              <li>
                <a href="#!">Link 1</a>
              </li>
              <li>
                <a href="#!">Link 1</a>
              </li>
            </ul>
          </Col>
          <Col>
            <h5 className='text-uppercase'>Links</h5>
            <ul>
              <li>
                <a href="#!">Link 1</a>
              </li>
              <li>
                <a href="#!">Link 1</a>
              </li>
              <li>
                <a href="#!">Link 1</a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>

  )
}


export default Footer;