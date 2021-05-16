import React, { ComponentType, ElementType } from "react";
import { Container } from "react-bootstrap";

interface Props {
	children: ComponentType | ElementType;
}

const DefaultLayout = ({ children }: Props) => (
	<Container style={{ minHeight: "80vh" }}>{children}</Container>
);

export { DefaultLayout };
