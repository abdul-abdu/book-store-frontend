import React, { useContext, useEffect, useState } from "react";
import { Spring } from "react-spring/renderprops";
import SingleBook from "../../components/SingleBook";

import { Col, Row, Spinner, Alert } from "react-bootstrap";
import { getAllBooks } from "../../httpClient";
import { useScrollHeight } from "../../hooks";
import { CategoryContext } from "../../contexts";

const BookList = () => {
	const scrolledHieght = useScrollHeight();
	const [books, setBooks] = useState<any[]>([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	const [currentQuery, setCurrentQuery] = useState("?limit=10&offset=0");
	const [nextQuery, setNextQuery] = useState("");
	const { currentCategory } = useContext(CategoryContext);

	useEffect(() => {
		const refreshList = async (query: string) => {
			try {
				const res = await getAllBooks(query);
				if (res.status === 200) {
					setLoading(false);
					setBooks((prevState: any[]) => [...prevState, ...res.data.books]);
					setNextQuery(res.data.next);
				}
			} catch (error) {
				setError(error.message);
				setLoading(false);
			}
		};
		refreshList(currentQuery);
	}, [currentQuery]);

	useEffect(() => {
		const scrolledTop = document.documentElement.scrollTop;
		const scrollTo = (y: any) => window.scroll(0, y);
		if (scrolledHieght === 1) {
			scrollTo(scrolledTop - 10);
		}

		if (scrolledHieght === 1) {
			setLoading(true);
			setCurrentQuery(nextQuery);
		}

		return () => window.removeEventListener("scroll", scrollTo);
	}, [scrolledHieght, nextQuery, currentQuery]);

	// refreshList = async (query) => {
	// 	this.setState({ loading: true });
	// 	const { currentCategory } = this.props;
	// 	let url = process.env.REACT_APP_API_URL + "/books";

	// 	try {
	// 		let currentQuery = query ? query : "?limit=10&offset=0";
	// 		if (currentCategory !== "all") {
	// 			currentQuery += `&category=${currentCategory}`;
	// 			console.log("currentQuery", currentQuery);
	// 			this.setState({ books: [] });
	// 		}

	// 		if (this.props.searchQuery) {
	// 			console.log(this.props.searchQuery);
	// 			currentQuery += `&title=${this.props.searchQuery}`;
	// 		}

	// 		const request = await fetch(url + currentQuery);

	// 		if (request.ok) {
	// 			const { books: newBooks, next } = await request.json();

	// 			this.setState({
	// 				books: [...this.state.books, ...newBooks],
	// 				nextQuery: next,
	// 				loading: false,
	// 			});
	// 		} else {
	// 			throw new Error();
	// 		}
	// 	} catch (error) {
	// 		this.setState({
	// 			error: error.message,
	// 			loading: false,
	// 		});

	// 		console.log(error);
	// 	}
	// };

	return (
		<React.Fragment>
			{error && <Alert variant="danger">{error}</Alert>}
			<Alert variant="warning" className="text-uppercase">
				{currentCategory + " books"}
			</Alert>

			<Row xs={2} sm={2} md={3} lg={4} xl={5}>
				{books.length > 0 &&
					books.map((book, idx) => (
						<Col className="my-2 px-1" key={idx}>
							<Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
								{(props) => (
									<div style={props}>
										<SingleBook book={book} />
									</div>
								)}
							</Spring>
						</Col>
					))}
			</Row>
			{loading && (
				<Spinner animation="border" variant="warning" className="mt-5" />
			)}
		</React.Fragment>
	);
};

export default BookList;
