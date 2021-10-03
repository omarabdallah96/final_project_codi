import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
import api from "../../../components/API/API";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Typography } from "@mui/material";
export default function Userlist() {
  const [rows, setRows] = React.useState([]);

  useEffect(() => {
    const getdata = async () => {
      const data = await api.get("/allpost").then();

      setRows(data.data);
    };
    getdata();
  }, []);

  return (
    <TableContainer component={Paper}>
        <center><Typography>
            Posts List
            </Typography></center>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead style={{ background: "#007bff", color: "white" }}>
          <TableRow>
            <TableCell style={{ color: "white" }}>name</TableCell>
            <TableCell style={{ color: "white" }} align="right">
              From
            </TableCell>
            <TableCell style={{ color: "white" }} align="right">
              To
            </TableCell>
            <TableCell style={{ color: "white" }} align="right">
              Space
            </TableCell>
            <TableCell style={{ color: "white" }} align="right">
              Actions
            </TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell   >
                {row.name} {row.lastname}
              </TableCell>
              <TableCell align="right">{row.from_country}</TableCell>
              <TableCell align="right">{row.to_country}</TableCell>
              <TableCell align="right">{row.space} KG</TableCell>

              <TableCell align="right">
                  <EditIcon />
                <RemoveRedEyeIcon />
                <DeleteOutline />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
