import React, { useEffect, useState } from "react";
import BeautyStars from "beauty-stars";
import { GiShoppingCart } from "react-icons/gi";
import { MdFavorite } from "react-icons/md";
import { getBookDetails } from "../../httpClient";
import { useParams } from "react-router";
import {
	Spinner,
	Col,
	Alert,
	Button,
	Image,
	Row,
	Form,
	Badge,
} from "react-bootstrap";

const BookDetails = () => {
	const { id }: any = useParams();
	const [error, setError] = useState<null | string>();
	const [loading, setLoading] = useState<boolean>(true);
	const [bookDetail, setBookDetail] = useState<IBook>();

	useEffect(() => {
		(async () => {
			try {
				const res = await getBookDetails(id);
				setLoading(false);
				setBookDetail(res.data);
			} catch (error) {
				setLoading(false);
				setError(error.message);
			}
		})();
	}, [id]);

	return (
		<Row xs={1} sm={1} md={2}>
			<>
				{loading && (
					<Col md={{ span: 6, offset: 4 }}>
						<Spinner animation="border" variant="warning" />
					</Col>
				)}

				{error && (
					<Alert variant="danger">
						Something went wrong! Try to refresh the page
					</Alert>
				)}

				{bookDetail && (
					<>
						<Col>
							<Image src={bookDetail.img} alt="img" style={{ width: "100%" }} />
						</Col>
						<Col style={{ textAlign: "start" }}>
							<h4>
								<b>{bookDetail.title}</b>
							</h4>
							<div className="my-3">
								<div>
									<b className="mx-1">Price: </b>
									<Badge variant="warning">$ {bookDetail.price}</Badge>
								</div>
								<div>
									<b>Category: </b>
									{bookDetail.category}
								</div>
							</div>
							<Button className="mx-2" variant="warning">
								<MdFavorite />
								Add Favorite
							</Button>
							<Button className="mx-2" variant="warning">
								<GiShoppingCart />
								Add Cart
							</Button>
							<div className="comments border-top border-bottom mt-4 pt-2">
								<Form className="my-3 pb-2 border-bottom">
									<Form.Group controlId="name">
										<Form.Label>Name</Form.Label>
										<Form.Control required type="text" placeholder="Name" />
									</Form.Group>
									<Form.Group controlId="comment">
										<Form.Label>Add Comment</Form.Label>
										<Form.Control
											required
											type="text"
											placeholder="Add comment"
										/>
									</Form.Group>
									<Form.Label>Rate</Form.Label>
									<BeautyStars />
									<Button className="mt-4" variant="primary" type="submit">
										Submit
									</Button>
								</Form>
								<h4>Comments:</h4>

								{/* {loadingComments ? (
									<Spinner animation="border" variant="warning" />
								) : (
									comments.map((comment) => <div>comment</div>)
								)}
								{cmommentsError && (
									<Alert variant="danger">Comments does not exists</Alert>
								)} */}
							</div>
						</Col>
					</>
				)}
			</>
		</Row>
	);
};

export default BookDetails;
