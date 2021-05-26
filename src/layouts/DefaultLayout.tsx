import React from "react";
import { Container } from "react-bootstrap";

interface Props {
	children: any;
}

const DefaultLayout = ({ children }: Props) => (
	<Container style={{ minHeight: "80vh" }}>{children}</Container>
);

export { DefaultLayout };
