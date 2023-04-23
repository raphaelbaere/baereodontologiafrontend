import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import PostAddIcon from '@mui/icons-material/PostAdd';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { visuallyHidden } from '@mui/utils';
import { BaereContext } from '../context/BaereProvider';
import { FormControl, Input, InputLabel, InputAdornment, Select, MenuItem, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate, useParams } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import BasicModal3 from './Modal3';
import { format } from 'date-fns';

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

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'data',
    numeric: false,
    disablePadding: true,
    label: 'Data',
  },
  {
    id: 'pagou',
    numeric: false,
    disablePadding: false,
    label: 'Pagou',
  },
  {
    id: 'id',
    numeric: false,
    disablePadding: false,
    label: 'ID',
  },
];

const DEFAULT_ORDER = 'asc';
const DEFAULT_ORDER_BY = 'calories';
const DEFAULT_ROWS_PER_PAGE = 5;

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (newOrderBy) => (event) => {
    onRequestSort(event, newOrderBy);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const navigate = useNavigate();
  const { numSelected, selected, setSelected, setAtualize, setAtualize2, handleChange, state } = props;
  const { handleOpen3, open3 } = React.useContext(BaereContext);

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selecionada
        </Typography>
      ) : (
        <React.Fragment>
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
        Pagamentos
        </Typography>
        <FormControl sx={{ m: 1, width: '100ch' }} variant="standard">
        <TextField
            id="searchInput"
            name="searchInput"
            onChange={handleChange}
            value={state.searchInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                    <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 180, marginRight: '25%' }}>
          <InputLabel id="demo-simple-select-label">Coluna</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="searchSelect"
            value={state.searchSelect}
            onChange={handleChange}
            label="Coluna"
          >
            <MenuItem value={'data'}>Data</MenuItem>
            <MenuItem value={'pagou'}>Pagou</MenuItem>
            <MenuItem value={'id'}>ID</MenuItem>
          </Select>
        </FormControl>
        </React.Fragment>
      )}

      {numSelected > 0 ? (
        <React.Fragment>
            <Tooltip title="Editar pagamento">
              <IconButton>
                <EditIcon />
              </IconButton>
          </Tooltip>
          <Tooltip title="Deletar pagamento">
            <IconButton onClick={async () => {
                  try {
                    const response = await fetch(`https://baereodontologia903-dtkwd4jzea-rj.a.run.app/pagamentos/${selected[0].id}`, {
                      method: 'DELETE',
                    });
                    setAtualize(response);
                    setAtualize2(response);
                    setSelected([]);
                  } catch (e) {
                    return({ type: 404, message: e});
                  }
            }}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </React.Fragment>
      ) : (
        <Tooltip title="Adicionar novo pagamento">
          <IconButton
            onClick={() => {
              handleOpen3();
            }}
          >
            <PostAddIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable3(props) {
  const { setAtualize2 } = props;
  const [order, setOrder] = React.useState(DEFAULT_ORDER);
  const [orderBy, setOrderBy] = React.useState(DEFAULT_ORDER_BY);
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [visibleRows, setVisibleRows] = React.useState(null);
  const [atualize, setAtualize] = React.useState('');
  const [paymentRows, setPaymentRows] = React.useState('');
  const [paymentRowsOG, setPaymentRowsOG] = React.useState('');
  const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_ROWS_PER_PAGE);
  const [paddingHeight, setPaddingHeight] = React.useState(0);
  const { id } = useParams();


  const [state, setState] = React.useState({
    searchInput: "",
    searchSelect: "data",
  })

  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
    if (evt.target.name === 'searchInput') {
      if (evt.target.value === '') {
        setPaymentRows(paymentRowsOG);
        let rowsOnMount = stableSort(
          paymentRowsOG,
          getComparator(DEFAULT_ORDER, DEFAULT_ORDER_BY),
        );
    
        rowsOnMount = rowsOnMount.slice(
          0 * DEFAULT_ROWS_PER_PAGE,
          0 * DEFAULT_ROWS_PER_PAGE + DEFAULT_ROWS_PER_PAGE,
        );
    
        setVisibleRows(rowsOnMount);
        return;
      }
      const filteredPaymentRows = paymentRows.filter((paymentRow) => paymentRow[state.searchSelect].toString().toLowerCase().includes(evt.target.value.toLowerCase()));
      setPaymentRows(filteredPaymentRows);
      let rowsOnMount = stableSort(
        filteredPaymentRows,
        getComparator(DEFAULT_ORDER, DEFAULT_ORDER_BY),
      );
  
      rowsOnMount = rowsOnMount.slice(
        0 * DEFAULT_ROWS_PER_PAGE,
        0 * DEFAULT_ROWS_PER_PAGE + DEFAULT_ROWS_PER_PAGE,
      );
  
      setVisibleRows(rowsOnMount);
    }
  };

  React.useEffect(() => {
    async function createRows2() {
      function createData(data, pagou, id) {
        return {
          data, 
          pagou,
          id
        };
      }
      try {
        const response = await fetch(`https://baereodontologia903-dtkwd4jzea-rj.a.run.app/pacientes/${id}`);
        const data = await response.json();
        console.log(data)
        const mapRows = data[2].map((payment) => {
          const date = new Date(payment.data);
          return createData(format(date.setDate(date.getDate() + 1), 'dd/MM/yyyy'), payment.pagou, payment.id)
        });
        return mapRows;
      } catch (error) {
        console.log(error);
      }
    }
    const getRows = async () => {
      const rows = await createRows2();
      setPaymentRows(rows);
      setPaymentRowsOG(rows);
      let rowsOnMount = stableSort(
        rows,
        getComparator(DEFAULT_ORDER, DEFAULT_ORDER_BY),
      );
  
      rowsOnMount = rowsOnMount.slice(
        0 * DEFAULT_ROWS_PER_PAGE,
        0 * DEFAULT_ROWS_PER_PAGE + DEFAULT_ROWS_PER_PAGE,
      );
  
      setVisibleRows(rowsOnMount);
    } 
    getRows();
  }, [atualize]);

  const handleRequestSort = React.useCallback(
    (event, newOrderBy) => {
      const isAsc = orderBy === newOrderBy && order === 'asc';
      const toggledOrder = isAsc ? 'desc' : 'asc';
      setOrder(toggledOrder);
      setOrderBy(newOrderBy);

      const sortedRows = stableSort(paymentRows, getComparator(toggledOrder, newOrderBy));
      const updatedRows = sortedRows.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      );

      setVisibleRows(updatedRows);
    },
    [order, orderBy, page, rowsPerPage],
  );

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = paymentRows.map((n) => n);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, row) => {
    const selectedIndex = selected.indexOf(row);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, row);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = React.useCallback(
    (event, newPage) => {
      setPage(newPage);

      const sortedRows = stableSort(paymentRows, getComparator(order, orderBy));
      const updatedRows = sortedRows.slice(
        newPage * rowsPerPage,
        newPage * rowsPerPage + rowsPerPage,
      );

      setVisibleRows(updatedRows);

      // Avoid a layout jump when reaching the last page with empty rows.
      const numEmptyRows =
        newPage > 0 ? Math.max(0, (1 + newPage) * rowsPerPage - paymentRows.length) : 0;

      const newPaddingHeight = (dense ? 33 : 53) * numEmptyRows;
      setPaddingHeight(newPaddingHeight);
    },
    [order, orderBy, dense, rowsPerPage],
  );

  const handleChangeRowsPerPage = React.useCallback(
    (event) => {
      const updatedRowsPerPage = parseInt(event.target.value, 10);
      setRowsPerPage(updatedRowsPerPage);

      setPage(0);

      const sortedRows = stableSort(paymentRows, getComparator(order, orderBy));
      const updatedRows = sortedRows.slice(
        0 * updatedRowsPerPage,
        0 * updatedRowsPerPage + updatedRowsPerPage,
      );

      setVisibleRows(updatedRows);

      // There is no layout jump to handle on the first page.
      setPaddingHeight(0);
    },
    [order, orderBy],
  );

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (row) => selected.indexOf(row) !== -1;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar state={state} handleChange={handleChange} setAtualize2={setAtualize2} setAtualize={setAtualize} setSelected={setSelected} numSelected={selected.length} selected={selected} />
        <BasicModal3 setAtualize2={setAtualize2} setAtualize={setAtualize}/>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={paymentRows.length}
            />
            <TableBody>
              {visibleRows
                ? visibleRows.map((row, index) => {
                    const isItemSelected = isSelected(row);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row}
                        selected={isItemSelected}
                        sx={{ cursor: 'pointer' }}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              'aria-labelledby': labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {row.data}
                        </TableCell>
                        <TableCell align="left">{row.pagou}</TableCell>
                        <TableCell align="left">{row.id}</TableCell>
                      </TableRow>
                    );
                  })
                : null}
              {paddingHeight > 0 && (
                <TableRow
                  style={{
                    height: paddingHeight,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={paymentRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Espaçamento denso"
      />
    </Box>
  );
}