const {
  Navbar,
  Nav,
  FormControl,
  DropdownButton,
  Dropdown,
  Container,
  Badge,
  Col,
} = require("react-bootstrap");
const { Link, withRouter } = require("react-router-dom");

const { FiShoppingCart } = require("react-icons/fi");

const BookCategories = [
  "all",
  "fantasy",
  "history",
  "romance",
  "scifi",
  "horror",
];

const NavBar = (props) => {
  const { updateCategory, currentCategory, updateSearchQuery } = props;
  return (
    <Navbar fixed="top" variant="dark" expand="sm">
      <Container>
        <Navbar.Brand as={Link} to="/">
          BookStore
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/books">
            Booklist
          </Nav.Link>
        </Nav>
        <Nav.Link href="#home">
          <div style={{ position: "relative" }}>
            <FiShoppingCart size={20} />
            <Badge
              variant="danger"
              style={{ position: "absolute", top: "15px" }}
            >
              0
            </Badge>
          </div>
        </Nav.Link>

        <>
          {props.location.pathname === "/books" && (
            <Col className="pl-0">
              <FormControl
                style={{ minWidth: "140px" }}
                type="text"
                placeholder="Search"
                className="ml-md-2 "
                onChange={(e) => updateSearchQuery(e.target.value)}
              />
            </Col>
          )}
          <>
            {props.location.pathname === "/books" && (
              <DropdownButton
                menuAlign="right"
                variant="outline-secondary"
                id="dropdown-basic-button"
                title={currentCategory.toUpperCase()}
              >
                {BookCategories.map((category, idx) => {
                  return (
                    <Dropdown.Item
                      key={idx}
                      onClick={() => {
                        if (category !== currentCategory) {
                          updateCategory(category);
                        }
                      }}
                    >
                      {category.toUpperCase()}
                    </Dropdown.Item>
                  );
                })}
              </DropdownButton>
            )}
          </>
          <Nav.Link as={Link} to="/register">
            Sign Up
          </Nav.Link>
          <Nav.Link as={Link} to="/login">
            Sign In
          </Nav.Link>
        </>
      </Container>
    </Navbar>
  );
};

export default withRouter(NavBar);
