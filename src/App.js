import "./App.css"
import MyFooter from "./components/MyFooter"
import BookList from "./components/BookList"
import NavBar from "./components/NavBar"
import LatestRelease from "./components/LatestRelease"
const { useState } = require("react")
const { BrowserRouter, Route } = require("react-router-dom")

function App() {
  const [currentCategory, setCurrentCategory] = useState("All")

  const updateCategory = (category) => setCurrentCategory(category)
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar
          updateCategory={updateCategory}
          currentCategory={currentCategory}
        />
        <br />
        <br />
        <br />
        <br />
        {/* <LatestRelease /> */}
        <Route
          path="/"
          exact
          render={() => <LatestRelease currentCategory={currentCategory} />}
        />
        <Route
          path="/booklist"
          exact
          render={() => <BookList currentCategory={currentCategory} />}
        />
        <MyFooter />
      </BrowserRouter>
    </div>
  )
}

export default App
