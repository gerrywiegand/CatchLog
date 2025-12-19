import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function CatchTable({ catches, speciesMap }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="catch table">
        <TableHead>
          <TableRow>
            <TableCell>Catch ID</TableCell>
            <TableCell>Species</TableCell>
            <TableCell align="right">Weight (lbs)</TableCell>
            <TableCell align="right">Length (inches)</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {catches.map((catchObj) => (
            <TableRow
              key={catchObj.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {catchObj.id}
              </TableCell>
              <TableCell>
                {speciesMap[catchObj.species_id] || "Unknown"}
              </TableCell>
              <TableCell align="right">{catchObj.weight}</TableCell>
              <TableCell align="right">{catchObj.length}</TableCell>
              <TableCell>
                {catchObj.date_caught
                  ? new Date(catchObj.date_caught).toLocaleString()
                  : ""}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CatchTable;
