import { useState } from "react";

// Components
import Home from "./components/Home/Home";
import Details from "./components/Details/Details";
import Favorites from "./components/Favorites/Favorites";
import Navbar from "./components/Navbar/Navbar";

// UseContext
import { Logincontext } from "./context/Context";

// React Router Dom
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [selectedRow, setSelectedRow] = useState([" "]);
  const [addedToFavorites, setaddedToFavorites] = useState(false);
  return (
    <Logincontext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        selectedRow,
        setSelectedRow,
        addedToFavorites,
        setaddedToFavorites
      }}
    >
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details" element={<Details />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Router>
    </Logincontext.Provider>
  );
}

export default App;
