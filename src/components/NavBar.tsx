import React from "react";
import {
	Navbar,
	Nav,
	FormControl,
	DropdownButton,
	Dropdown,
	Container,
	Badge,
	Col,
} from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

import { FiShoppingCart } from "react-icons/fi";
import { ScrollProgress } from ".";
import { BookCategories, CategoryContext } from "../contexts";
import { useContext } from "react";

const NavBar = (props: any) => {
	const { updateSearchQuery } = props;
	const location = useLocation();
	const { currentCategory, setCurrentCategory } = useContext(CategoryContext);

	return (
		<Navbar fixed="top" variant="dark" expand="sm">
			<ScrollProgress />
			<Container>
				<Navbar.Brand as={Link} to="/">
					BookStore
				</Navbar.Brand>
				<Nav className="mr-auto">
					<Nav.Link as={Link} to="/books">
						Books
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
					{location.pathname === "/books" && (
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
						{location.pathname === "/books" && (
							<DropdownButton
								menuAlign="right"
								variant="outline-secondary"
								id="dropdown-basic-button"
								title={currentCategory.toLocaleUpperCase()}
							>
								{BookCategories.map((category, idx) => {
									return (
										<Dropdown.Item
											className="text-capitalize"
											key={idx}
											onClick={() => {
												if (category !== currentCategory) {
													setCurrentCategory(category);
												}
											}}
										>
											{category}
										</Dropdown.Item>
									);
								})}
							</DropdownButton>
						)}
					</>
					{/* <Nav.Link as={Link} to="/register">
						Sign Up
					</Nav.Link>
					<Nav.Link as={Link} to="/login">
						Sign In
					</Nav.Link> */}
				</>
			</Container>
		</Navbar>
	);
};

export { NavBar };
