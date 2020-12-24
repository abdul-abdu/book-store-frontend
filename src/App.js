import "./App.css"
import MyFooter from "./components/MyFooter"
import BookList from "./components/BookList"
import NavBar from "./components/NavBar"
// import LatestRelease from "./components/LatestRelease"

function App() {
  return (
    <div className="App">
      <NavBar />
      <br />
      <br />
      <br />
      <br />
      {/* <LatestRelease /> */}
      <BookList />
      <MyFooter />
    </div>
  )
}

export default App
