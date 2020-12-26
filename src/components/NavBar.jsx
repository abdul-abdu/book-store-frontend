const {
  Navbar,
  Nav,
  FormControl,
  DropdownButton,
  Dropdown,
  Container,
  Badge,
} = require("react-bootstrap")
const { Link } = require("react-router-dom")

const { FiShoppingCart } = require("react-icons/fi")

const BookCategories = [
  "all",
  "fantasy",
  "history",
  "romance",
  "scifi",
  "horror",
]

const NavBar = (props) => {
  const { updateCategory, currentCategory } = props
  return (
    <div>
      <Navbar className="fixed-top" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            BookStore
          </Navbar.Brand>
          <Nav.Link as={Link} to="/books">
            Booklist
          </Nav.Link>

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
            title={currentCategory.toUpperCase()}
          >
            {BookCategories.map((category, idx) => {
              return (
                <Dropdown.Item
                  key={idx}
                  onClick={() => {
                    if (category !== currentCategory) {
                      updateCategory(category)
                    }
                  }}
                >
                  {category.toUpperCase()}
                </Dropdown.Item>
              )
            })}
          </DropdownButton>
          <Nav className="mr-auto">
            <Nav.Link href="#home">
              <div style={{ position: "relative" }}>
                <FiShoppingCart size={32} />
                <Badge
                  variant="danger"
                  style={{ position: "absolute", top: "15px" }}
                >
                  0
                </Badge>
              </div>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br />
      <br />
      <br />
    </div>
  )
}

export default NavBar
