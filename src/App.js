import "./App.css";
import MyFooter from "./components/MyFooter";
import BookList from "./components/BookList";
import NavBar from "./components/NavBar";
import BookDetails from "./components/BookDetails";
import ScrollToTop from "./functions/ScrollToTop";
import Home from "./components/Home";
import Register from "./pages/register";
import Login from "./pages/login";

const { useState } = require("react");
const { BrowserRouter, Route } = require("react-router-dom");

function App() {
  const [currentCategory, setCurrentCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState(null);

  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop currentCategory={currentCategory} />
        <NavBar
          updateCategory={setCurrentCategory}
          updateSearchQuery={setSearchQuery}
          currentCategory={currentCategory}
        />
        <Route
          path="/"
          exact
          render={() => <Home currentCategory={currentCategory} />}
        />
        <Route
          path="/books"
          exact
          render={() => (
            <BookList
              currentCategory={currentCategory}
              searchQuery={searchQuery}
            />
          )}
        />

        <Route path="/books/:id/details" exact component={BookDetails} />

        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <MyFooter />
      </BrowserRouter>
    </div>
  );
}

export default App;
