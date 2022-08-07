import { useContext } from "react";

// Mui
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

// UseContext
import { Logincontext } from "../../context/Context";

// React Router Dom
import { Link } from "react-router-dom";


const Navbar = () => {
  const { loggedIn, setLoggedIn } = useContext(Logincontext);
  const { setaddedToFavorites } = useContext(Logincontext);

  return (
    <Box sx={{ m: 3, display: "flex", justifyContent: "space-between" }}>
      <div>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button onClick={()=> setaddedToFavorites(false)} color="primary" variant="contained" sx={{ mr: 3 }}>
            Home
          </Button>
        </Link>
        {loggedIn ? (
          <Link to="/favorites" style={{ textDecoration: "none" }}>
            <Button color="secondary" variant="contained">
              Favorites
            </Button>
          </Link>
        ) : null}
      </div>
      {!loggedIn ? (
        <Button
          color="success"
          sx={{ width: 100 }}
          onClick={() => setLoggedIn(!loggedIn)}
          variant="contained"
        >
          Login
        </Button>
      ) : (
        <Button
          color="error"
          sx={{ width: 100 }}
          onClick={() => setLoggedIn(!loggedIn)}
          variant="contained"
        >
          Logout
        </Button>
      )}
    </Box>
  );
};

export default Navbar;
