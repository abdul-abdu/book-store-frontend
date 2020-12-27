const {
  Navbar,
  Nav,
  FormControl,
  DropdownButton,
  Dropdown,
  Container,
  Badge,
  Col,
} = require("react-bootstrap")
const { Link, withRouter } = require("react-router-dom")

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
    <>
      <Navbar variant="dark" expand="sm">
        <Container>
          <Navbar.Brand as={Link} to="/">
            BookStore
          </Navbar.Brand>
          <Nav.Link as={Link} to="/books">
            Booklist
          </Nav.Link>
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
          <>
            {!props.location.pathname.includes("details") && (
              <Col className="pl-0">
                <FormControl
                  style={{ minWidth: "110px" }}
                  type="text"
                  placeholder="Search"
                  className="ml-md-2 "
                  // onChange={(e) => this.props.handleSearchQuery(e.target.value)}
                />
              </Col>
            )}
            <>
              {!props.location.pathname.includes("details") && (
                <DropdownButton
                  menuAlign="right"
                  variant="outline-secondary"
                  // className="ml-md-2"
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
              )}
            </>
          </>
        </Container>
      </Navbar>
    </>
  )
}

export default withRouter(NavBar)
