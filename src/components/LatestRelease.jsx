import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import SingleBook from "./SingleBook"

class LatestBooks extends React.Component {
  // handleSearchQuery = (saerchQuery) => {
  //   const category = this.state.categorySelected

  //   if (saerchQuery) {
  //     const filtredBooks = books[category].filter((book) =>
  //       book.title.toLowerCase().includes(saerchQuery.toLowerCase())
  //     )
  //     this.setState({ data: filtredBooks })
  //   } else {
  //     this.setState({ data: books[this.state.categorySelected] })
  //   }
  // }

  render() {
    return (
      <>
        <br />
        <br />
        <br />
        <br />
        {/* <NavBar
          Ddowntitle={this.state.categorySelected}
          handleDropdownChange={this.handleDropdownChange}
          handleSearchQuery={this.handleSearchQuery}
        /> */}
        <Container>
          <Row xs={2} sm={2} md={3} lg={4} xl={5}>
            <Col className="my-2">
              <SingleBook />
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}

export default LatestBooks
