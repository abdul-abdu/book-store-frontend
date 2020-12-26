import "./App.css"
import MyFooter from "./components/MyFooter"
import BookList from "./components/BookList"
import NavBar from "./components/NavBar"
import BookDetails from "./components/BookDetails"
import ScrollToTop from "./components/ScrollToTop"
const { useState } = require("react")
const { BrowserRouter, Route } = require("react-router-dom")

function App() {
  const [currentCategory, setCurrentCategory] = useState("all")
  const updateCategory = (category) => setCurrentCategory(category)

  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <NavBar
          updateCategory={updateCategory}
          currentCategory={currentCategory}
        />
        <Route
          path="/"
          exact
          render={() => (
            <BookList homePage={true} currentCategory={currentCategory} />
          )}
        />
        <Route
          path="/books"
          exact
          render={() => <BookList currentCategory={currentCategory} />}
        />

        <Route path="/books/:id/details" exact component={BookDetails} />
        <MyFooter />
      </BrowserRouter>
    </div>
  )
}

export default App
