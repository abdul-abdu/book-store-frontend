import React from "react"
import {
  Navbar,
  Nav,
  FormControl,
  DropdownButton,
  Dropdown,
  Container,
  Badge,
} from "react-bootstrap"

const { FiShoppingCart } = require("react-icons/fi")

const BookCategories = ["fantasy", "history", "romance", "scifi", "horror"]

class NavBar extends React.Component {
  render() {
    return (
      <Navbar className="fixed-top" variant="dark">
        <Container>
          <Navbar.Brand href="#home">StriveBookStore</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#home">
              <FiShoppingCart /> Basket
              <Badge variant="danger">c</Badge>
            </Nav.Link>
          </Nav>
          <FormControl
            placeholder="Search"
            aria-label="Search"
            aria-describedby="basic-addon1"
            // onChange={(e) => this.props.handleSearchQuery(e.target.value)}
          />
          <DropdownButton
            variant="outline-secondary"
            className="ml-2"
            id="dropdown-basic-button"
            title="ssk"
          >
            {BookCategories.map((category, idx) => {
              return (
                <Dropdown.Item
                  key={idx}
                  onClick={() => {
                    if (category !== this.props.Ddowntitle) {
                      this.props.handleDropdownChange(category)
                    }
                  }}
                >
                  {category.toUpperCase()}
                </Dropdown.Item>
              )
            })}
          </DropdownButton>
        </Container>
      </Navbar>
    )
  }
}

export default NavBar
