import React, { useState } from "react";
import "./App.css";
import MyFooter from "./components/MyFooter";
import NavBar from "./components/NavBar";
import { CategoryContext, InitialBookCategory } from "./contexts";
import { useScrollToTop } from "./hooks";

import Pages from "./pages";

function App() {
	const [currentCategory, setCurrentCategory] =
		useState<string>(InitialBookCategory);
	useScrollToTop(currentCategory);

	return (
		<div className="App">
			<CategoryContext.Provider value={{ currentCategory, setCurrentCategory }}>
				<NavBar />
				<Pages />
			</CategoryContext.Provider>
			<MyFooter />
		</div>
	);
}

export default App;
