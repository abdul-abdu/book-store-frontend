import "./App.css";
import React, { useState } from "react";
import { NavBar, Footer } from "./components";
import { CategoryContext } from "./contexts";
import { useScrollToTop } from "./hooks";

import Pages from "./pages";

function App() {
	const [currentCategory, setCurrentCategory] = useState<string>("all");
	useScrollToTop(currentCategory);

	return (
		<div className="App">
			<CategoryContext.Provider value={{ currentCategory, setCurrentCategory }}>
				<NavBar />
				<Pages />
			</CategoryContext.Provider>
			<Footer />
		</div>
	);
}

export default App;
