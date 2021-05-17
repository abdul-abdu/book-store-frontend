import { Footer } from "..";

import { render, fireEvent, waitForElement } from "@testing-library/react";

describe("<Footer/>", () => {
	test("should render Footer", async () => {
		render(Footer);
	});
});
