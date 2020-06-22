import React, { useState, useEffect } from 'react';
import useFetch from 'use-http'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const columns = [
  { id: 'name', label: 'Name', minWidth: 40 },
  { id: 'description', label: 'Description', minWidth: 100 },
  {
    id: 'portType',
    label: 'Port Type',
    minWidth: 50,
    align: 'right',
  },
  {
    id: 'enabled',
    label: 'Enabled',
    minWidth: 5,
    align: 'right',
    format: (value) => value ? 'True' : 'False',
  },
  {
    id: 'link',
    label: 'Link',
    minWidth: 50,
    align: 'right',
  },
];

const useStyles = makeStyles({
  root: {
    width: '96%',
  },
  container: {
    maxHeight: 440,
  },
});

const Switches1 = () => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [switches, setSwitches] = useState();

  const { get, post, response, loading, error } = useFetch('http://localhost:3333');

  useEffect(() => { initializeSwitches() }, [])

  async function initializeSwitches() {
    const initialSwitches = await get('/switches')
    if (response.ok) {
      setSwitches(initialSwitches)
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (switches) {
    return (
      < Paper className={classes.root} style={{ margin: '20px' }}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {switches.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'boolean' ? column.format(value) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 40]}
          component="div"
          count={switches.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper >
    );
  } else {
    return null;
  }


}

export default Switches1;