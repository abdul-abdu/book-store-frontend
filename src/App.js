import "./App.css";
import MyFooter from "./components/MyFooter";
import LatestRelease from "./components/LatestRelease";

function App() {
  return (
    <div className="App">
      {/* <MyNav /> */}
      <LatestRelease />
      <MyFooter />
    </div>
  );
}

export default App;
