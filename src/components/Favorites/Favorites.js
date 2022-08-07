import { useState, useEffect, useContext } from "react";
import { Logincontext } from "../../context/Context";

// Mui Table
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// React Router Dom
import { Link } from "react-router-dom";

// Axios
import axios from "axios";

const Favorites = () => {
  const [data, setData] = useState([]);
  const { loggedIn } = useContext(Logincontext);
  // eslint-disable-next-line
  const [array, setArray] = useState([]);
  const { setSelectedRow } = useContext(Logincontext);

  let arr = [];
  for (let key of Object.entries(localStorage)) {
    arr.push(key[0]);
  }

  window.addEventListener("storage", () => {
    setArray(arr);
  });

  const apiFetch = () => {
    axios.get(`https://api-pub.bitfinex.com/v2/tickers?symbols=${arr.map((a) => a)}`).then(
      (response) => {
        setData(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };
  useEffect(() => {
    // First time immediately response
    setTimeout(() => {
      apiFetch();
    }, 0);

    // Next time after every 30 seconds
    const interval = setInterval(() => {
      apiFetch();
    }, 5000);
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <h1 className="ml">Favorites</h1>
      {localStorage && loggedIn ? (
        <TableContainer component={Paper}>
          <Table component="div" aria-label="simple table">
            <TableHead component="div">
              <TableRow component="div">
                <TableCell component="div">Name</TableCell>
                <TableCell component="div" align="center">
                  Last price
                </TableCell>
                <TableCell component="div" align="center">
                  Daily Change
                </TableCell>
                <TableCell component="div" align="center">
                  Change Percent
                </TableCell>
                <TableCell component="div" align="center">
                  Daily high
                </TableCell>
                <TableCell component="div" align="center">
                  Daily low
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody component="div">
              {data.map((item) => (
                <TableRow
                  key={item[0]}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  hover
                  className="clickable"
                  onClick={() => {
                    setSelectedRow(item);
                  }}
                  component={Link}
                  to={`/details`}
                >
                  <TableCell component="div" scope="row">
                    {item[0].substring(1)}
                  </TableCell>

                  <TableCell component="div" align="center">
                    {item[1]}
                  </TableCell>

                  <TableCell component="div" align="center">
                    {item[5]}
                  </TableCell>

                  <TableCell component="div" align="center">
                    {(item[5] / item[1]).toFixed(4)}%
                  </TableCell>

                  <TableCell component="div" align="center">
                    {item[9]}
                  </TableCell>

                  <TableCell component="div" align="center">
                    {item[10]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}
    </>
  );
};

export default Favorites;
