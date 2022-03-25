import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function UserTable(props) {
    const {state} = props;
    console.log(state);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell style={{fontWeight: "bold"}} > Long Url </TableCell>
            <TableCell style={{fontWeight: "bold"}} > Sort URL </TableCell>
            <TableCell style={{fontWeight: "bold"}} > URL Created Before </TableCell>
            <TableCell style={{fontWeight: "bold"}} > Visit Count </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {state.map((row) => (
            <TableRow>
              <TableCell >{row.longUrl}</TableCell>
              <TableCell style={{color:"blue"}} onClick={ ()=> { window.location.assign( `${row.sortUrl}`) } } >{row.sortUrl}</TableCell>
              <TableCell >{row.urlCreatedCount}</TableCell>
              <TableCell >{row.urlUsedCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
