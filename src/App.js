import "./App.css"
import MyFooter from "./components/MyFooter"
import Booklist from "./components/BookList"
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
      <Booklist />
      <MyFooter />
    </div>
  )
}

export default App
