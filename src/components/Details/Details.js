import { useContext, useEffect } from "react";
import { Logincontext } from "../../context/Context";

// Mui Table
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

//Mui Button
import Button from "@mui/material/Button";

const Details = () => {
  const { selectedRow } = useContext(Logincontext);
  const { loggedIn } = useContext(Logincontext);
  const { addedToFavorites, setaddedToFavorites } = useContext(Logincontext);

  const data = selectedRow;

  useEffect(() => {
    let arr = [];
    for (let key of Object.entries(localStorage)) {
      arr.push(key[0]);
    }
    // Comparing is it the currency already added to favorite page
    for (let i = 0; i <= arr.length; i++) {
      for (let k = i + 1; k <= arr.length; k++) {
        if (arr[i] === data[0]) {
          setaddedToFavorites(true);
        }
      }
    }
  }, [data, setaddedToFavorites]);

  return (
    <>
      <h1 className="ml">Details</h1>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Last price</TableCell>
              <TableCell align="center">Daily high</TableCell>
              <TableCell align="center">Daily low</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              key={data[0]}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              hover
              className="clickable"
            >
              {/* Symbol */}
              <TableCell scope="row">{data[0].substring(1)}</TableCell>
              {/* Last price, */}
              <TableCell align="center">{data[1]}</TableCell>
              {/* Daily high */}
              <TableCell align="center">{data[9]}</TableCell>
              {/* Daily low */}
              <TableCell align="center">{data[10]}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {loggedIn ? (
        <div>
          {!addedToFavorites ? (
            <Button
              color="success"
              sx={{ width: 250, mt: 2 }}
              onClick={() => {
                localStorage.setItem(data[0], JSON.stringify(data));
                setaddedToFavorites(!addedToFavorites);
                console.log(data);
                alert("Added to favorites");
              }}
              variant="contained"
            >
              Add to favorites
            </Button>
          ) : (
            <Button
              color="error"
              sx={{ width: 250, mt: 2 }}
              onClick={() => {
                setaddedToFavorites(!addedToFavorites);
                localStorage.removeItem(data[0]);
                alert("Removed from favorites");
              }}
              variant="contained"
            >
              Remove from favorites
            </Button>
          )}
        </div>
      ) : null}
    </>
  );
};

export default Details;
