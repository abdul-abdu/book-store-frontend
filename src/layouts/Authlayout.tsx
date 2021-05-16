import React, { ComponentType, ElementType } from "react";
import { Container, Row } from "react-bootstrap";

interface Props {
	children: ComponentType | ElementType;
}

export const Authlayout = ({ children }: Props) => {
	return (
		<Container style={{ minHeight: "80vh" }}>
			<Row className="justify-content-center">{children}</Row>
		</Container>
	);
};
