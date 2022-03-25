import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row"> {row.name} </TableCell>
        <TableCell component="th" scope="row"> {row.email}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{fontWeight: "bold"}}>Long URL</TableCell>
                    <TableCell style={{fontWeight: "bold"}}>Short URL</TableCell>
                    <TableCell style={{fontWeight: "bold"}}>URL Created Before</TableCell>
                    <TableCell style={{fontWeight: "bold"}}>Visit Count</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.urlData.map((subRow) => (
                    <TableRow key={subRow.longUrl}>
                      <TableCell>{subRow.longUrl}</TableCell>
                      <TableCell style={{color:"blue"}} onClick={ ()=> { window.location.assign( `${subRow.sortUrl}`) } } >{subRow.sortUrl}</TableCell>
                      <TableCell>{subRow.urlCreatedCount}</TableCell>
                      <TableCell>{subRow.urlUsedCount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function AdminTable(props) {
  const {state} = props;

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell style={{fontWeight: "bold"}}>User Name</TableCell>
            <TableCell style={{fontWeight: "bold"}}>User Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {state.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
