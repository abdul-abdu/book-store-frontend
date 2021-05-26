import settings from "./settings";
import React, { useState, useEffect } from "react";
import { Col, Image, Spinner, Jumbotron, Button, Alert } from "react-bootstrap";
import Slider from "react-slick";
import { useHistory } from "react-router-dom";
import { getBooksPreview } from "../../httpClient";

const Home = () => {
	const [booksPreview, setBooksPreview] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	const history = useHistory();

	useEffect(() => {
		(async () => {
			try {
				const res = await getBooksPreview();
				if (res.status === 200) {
					setBooksPreview(res.data);
					setLoading(false);
					return;
				}
			} catch (error) {
				setError(error.message);
				setLoading(false);
			}
		})();
	}, []);

	return (
		<>
			<Jumbotron>
				<h1>The best books!</h1>
				<p>
					This is a simple hero unit, a simple jumbotron-style component for
					calling extra attention to featured content or information.
				</p>
				<p>
					<Button variant="primary">Learn more</Button>
				</p>
			</Jumbotron>
			{error && <Alert variant="danger">{error}</Alert>}
			{loading && (
				<div>
					<Spinner animation="border" variant="warning" />
				</div>
			)}
			{booksPreview.length > 0 &&
				booksPreview.map((booksCategories: any, idx) => (
					<div className="mb-5" key={idx}>
						<h2 style={{ textAlign: "start" }}>
							{booksCategories[0].category.toUpperCase()}
						</h2>
						<Col>
							<Slider {...settings}>
								{booksCategories.map((book: IBook) => (
									<div className="px-2" key={book._id}>
										<Image
											src={book.img}
											alt="img"
											style={{
												width: "100%",
												height: "320px",
												cursor: "pointer",
											}}
											onClick={() => {
												history.push("/books/details/" + book._id);
											}}
										/>
									</div>
								))}
							</Slider>
						</Col>
					</div>
				))}
		</>
	);
};

export default Home;
