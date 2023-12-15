import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Components/Home";
import StartUpsState from "./Context/StartUpsState";

function App() {
  return (
    <div className="App">
      <StartUpsState>
     <Router>
      <Header/>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
      </Routes>
     </Router>
     </StartUpsState>
    </div>
  );
}

export default App;
