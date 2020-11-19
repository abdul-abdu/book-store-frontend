import fantasy from "../data/fantasy.json"
import history from "../data/history.json"
import horror from "../data/horror.json"
import romance from "../data/romance.json"
import scifi from "../data/scifi.json"

import BookList from './BookList'
import NavBar from './MyNav'

import React from 'react'
import { Container, Row } from 'react-bootstrap'

// const BookCategories = ['fantasy', 'history', 'romance', 'scifi', 'horror']
const books = { fantasy, history, romance, scifi, horror, }

class LatestBooks extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: books.fantasy,
      categorySelected: 'fantasy',
    }
  }
  
  handleDropdownChange = (category) => {
    this.setState({ data: books[category], categorySelected: category })
  }

  handleSearchQuery = (saerchQuery) => {
    const category = this.state.categorySelected;

    if (saerchQuery) {
      const filtredBooks = books[category].filter((book) =>
        book.title.toLowerCase().includes(saerchQuery.toLowerCase())
      )
      this.setState({ data: filtredBooks })
    } else {
      this.setState({ data: books[this.state.categorySelected] })
    }
  }

  render() {
    return (
      <>
        <br />
        <br />
        <br />
        <NavBar
          Ddowntitle={this.state.categorySelected}
          handleDropdownChange={this.handleDropdownChange}
          handleSearchQuery={this.handleSearchQuery}
        />
        <Container>
          <Row xs={1} sm={2} md={3} lg={4} xl={5}>
            <BookList listOfBooks={this.state.data} />
          </Row>
        </Container>
      </>

    )
  }
}


export default LatestBooks