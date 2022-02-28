import { filter, get } from 'lodash';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import { getUsersAction } from 'store/actions/user';
import { getClassesAction } from 'store/actions/class';
import { getSchoolsAction } from 'store/actions/school';
// material
import {
  Card,
  Table,
  Stack,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  CircularProgress
} from '@mui/material';
// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import {
  UserListHead,
  UserListToolbar,
  UserMoreMenu,
  UserModal
} from '../components/_dashboard/users';
//
import USERLIST from '../_mocks_/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'userId', label: 'User ID', alignRight: false },
  { id: 'classname', label: 'Classname', alignRight: false },
  { id: 'student', label: 'Total student', alignRight: false },
  { id: 'school', label: 'School', alignRight: false },
  { id: '' }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.userId.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis?.map((el) => el[0]);
}

export default function Users() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showAdd, setShowAdd] = useState(false);

  const { users } = useSelector((state) => get(state, 'userReducers', false));
  const { classes } = useSelector((state) => get(state, 'classesReducers', false));
  const { schools } = useSelector((state) => get(state, 'schoolsReducers', false));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersAction());
    dispatch(getClassesAction());
    dispatch(getSchoolsAction());
  }, [dispatch]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const handleShowAdd = () => setShowAdd(true);
  const handleCloseAdd = () => setShowAdd(false);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users?.data.length) : 0;

  const filteredUsers = applySortFilter(users?.data, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers?.length === 0;

  return (
    <Page title="Users">
      <Container>
        {users.loading ? (
          <CircularProgress />
        ) : (
          <>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Typography variant="h4" gutterBottom>
                Users
              </Typography>
              <Button
                variant="contained"
                component={RouterLink}
                to="#"
                startIcon={<Icon icon={plusFill} />}
                onClick={handleShowAdd}
              >
                New User
              </Button>
              <UserModal isOpen={showAdd} handleClose={handleCloseAdd} />
            </Stack>

            <Card>
              <UserListToolbar
                numSelected={selected.length}
                filterName={filterName}
                onFilterName={handleFilterByName}
              />

              <Scrollbar>
                <TableContainer sx={{ minWidth: 800 }}>
                  <Table>
                    <UserListHead
                      order={order}
                      orderBy={orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={USERLIST.length}
                      numSelected={selected.length}
                      onRequestSort={handleRequestSort}
                      onSelectAllClick={handleSelectAllClick}
                    />
                    <TableBody>
                      {filteredUsers
                        ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        ?.map((row) => {
                          const { id, userId, classes, schools, students } = row;
                          const isItemSelected = selected.indexOf(id) !== -1;
                          const className = classes[0].name;
                          const schoolName = schools[0].name;
                          const totalStudent = students.length;
                          return (
                            <TableRow
                              hover
                              key={id}
                              tabIndex={-1}
                              role="checkbox"
                              selected={isItemSelected}
                              aria-checked={isItemSelected}
                            >
                              <TableCell padding="checkbox">
                                <Checkbox
                                  checked={isItemSelected}
                                  onChange={(event) => handleClick(event, id)}
                                />
                              </TableCell>
                              <TableCell align="left">{userId}</TableCell>
                              <TableCell align="left">{className}</TableCell>
                              <TableCell align="left">{totalStudent}</TableCell>
                              <TableCell align="left">{schoolName}</TableCell>
                              <TableCell align="right">
                                <UserMoreMenu user={row} />
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                    {isUserNotFound && (
                      <TableBody>
                        <TableRow>
                          <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                            <SearchNotFound searchQuery={filterName} />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    )}
                  </Table>
                </TableContainer>
              </Scrollbar>

              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={USERLIST.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Card>
          </>
        )}
      </Container>
    </Page>
  );
}
