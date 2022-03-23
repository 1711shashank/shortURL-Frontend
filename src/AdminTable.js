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
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


// const rows = [
//   createData("123@123", "shashank", [{ longUrl: "http://facebook.com", sortUrl: "http://localhost:3000/0eeue2", urlCreatedCount: 5, urlUsedCount: 11 }, { longUrl: "http://facebook.com", sortUrl: "http://localhost:3000/0eeue2", urlCreatedCount: 5, urlUsedCount: 11 }]),
//   createData("123@123", "shashank", [{ longUrl: "http://facebook.com", sortUrl: "http://localhost:3000/0eeue2", urlCreatedCount: 5, urlUsedCount: 11 }, { longUrl: "http://facebook.com", sortUrl: "http://localhost:3000/0eeue2", urlCreatedCount: 5, urlUsedCount: 11 }]),
//   createData("123@123", "shashank", [{ longUrl: "http://facebook.com", sortUrl: "http://localhost:3000/0eeue2", urlCreatedCount: 5, urlUsedCount: 11 }, { longUrl: "http://facebook.com", sortUrl: "http://localhost:3000/0eeue2", urlCreatedCount: 5, urlUsedCount: 11 }])

// ];

// function createData(userEmail, userName, urlData) {
//   return { userEmail, userName, temp: urlData };
// }

// Row.propTypes = {
//   row: PropTypes.shape({
//     calories: PropTypes.number.isRequired,
//     carbs: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         customerId: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//       }),
//     ).isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     protein: PropTypes.number.isRequired,
//   }).isRequired,
// };

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
              <Typography variant="h6" gutterBottom component="div"> URL Data </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Long URL</TableCell>
                    <TableCell>Short URL</TableCell>
                    <TableCell>URL Created Before</TableCell>
                    <TableCell>Short URL Used</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.urlData.map((tempRow) => (
                    <TableRow key={tempRow.longUrl}>
                      <TableCell>{tempRow.longUrl}</TableCell>
                      <TableCell>{tempRow.sortUrl}</TableCell>
                      <TableCell>{tempRow.urlCreatedCount}</TableCell>
                      <TableCell>{tempRow.urlUsedCount}</TableCell>
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
            <TableCell>User Name</TableCell>
            <TableCell>User Email</TableCell>
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
