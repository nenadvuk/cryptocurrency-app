// Hooks
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

const Home = () => {
  const [data, setData] = useState([]);
  const { setSelectedRow } = useContext(Logincontext);

  const apiFetch = () => {
    axios
      .get(
        `https://api-pub.bitfinex.com/v2/tickers?symbols=tBTCUSD,tETHUSD,tLTCUSD,tLTCBTC,tETHBTC,tMNAUSD,tXRPUSD,tADAUSD,tSOLUSD,tDOTUSD,tAVAX:USD,tWBTUSD,tFTTUSD,YFIUSD`
      )
      .then(
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
  }, []);

  return (
    <>
      <h1 className="ml">Home</h1>
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
            {data.map((item, i) => (
              <TableRow
                onClick={() => {
                  setSelectedRow(item);
                }}
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                hover
                className="clickable"
                component={Link}
                to={`/details`}
              >
                {/* Symbol */}
                <TableCell component="div" scope="row">
                  {item[0].substring(1)}
                </TableCell>

                {/* Last price, */}
                <TableCell component="div" align="center">
                  {item[1]}
                </TableCell>

                {/* Daily Change */}
                <TableCell component="div" align="center">
                  {item[5]}
                </TableCell>

                {/* Daily Change Percent */}
                <TableCell component="div" align="center">
                  {(item[5] / item[1]).toFixed(4)}%
                </TableCell>

                {/* Daily high */}
                <TableCell component="div" align="center">
                  {item[9]}
                </TableCell>

                {/* Daily low */}
                <TableCell component="div" align="center">
                  {item[10]}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default Home;
