import { Card, Button, Badge } from "react-bootstrap";
import React from "react";
import { withRouter } from "react-router-dom";
import { GiShoppingCart } from "react-icons/gi";
import { MdFavorite } from "react-icons/md";

const SingleBook = withRouter((props: any) => {
	const { book, history } = props;
	return (
		<Card style={{ maxWidth: "13rem" }}>
			<div className="card-img-box">
				<Card.Img
					variant="top"
					src={book.img}
					style={{ cursor: "pointer" }}
					onClick={() => {
						history.push("/books/details/" + book._id);
					}}
				/>
			</div>
			<Card.Body>
				<div className="card-tex-box">
					<Card.Title>{book.title}</Card.Title>
					<Card.Text>
						<Badge variant="success">${book.price}</Badge>
					</Card.Text>
				</div>
				<Button className="my-1" variant="outline-warning">
					<GiShoppingCart size={25} />
				</Button>
				<Button variant="outline-info">
					<MdFavorite size={25} />
				</Button>
			</Card.Body>
		</Card>
	);
});

export { SingleBook };
