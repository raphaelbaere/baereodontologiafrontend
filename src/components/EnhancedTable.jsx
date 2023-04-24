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
import { useNavigate } from 'react-router-dom';
import BasicModal from './Modal';
import BasicModal4 from './Modal4';

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
    id: 'nome',
    numeric: false,
    disablePadding: true,
    label: 'Nome',
  },
  {
    id: 'data',
    numeric: true,
    disablePadding: false,
    label: 'Data de Nascimento',
  },
  {
    id: 'cpf',
    numeric: true,
    disablePadding: false,
    label: 'CPF',
  },
  {
    id: 'telefone',
    numeric: true,
    disablePadding: false,
    label: 'Telefone',
  },
  {
    id: 'id',
    numeric: true,
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
  const { numSelected, selected, setSelected, setAtualize, handleChange, state } = props;
  const { handleOpen, open, createRows, handleOpen4 } = React.useContext(BaereContext);

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
          Ficha do {selected[0].nome} selecionada!
        </Typography>
      ) : (
        <React.Fragment>
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Fichas
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
            label="Coluna"
            name="searchSelect"
            value={state.searchSelect}
            onChange={handleChange}
          >
            <MenuItem value={'nome'}>Nome</MenuItem>
            <MenuItem value={'data'}>Data de Nascimento</MenuItem>
            <MenuItem value={'cpf'}>CPF</MenuItem>
            <MenuItem value={'telefone'}>Telefone</MenuItem>
            <MenuItem value={'id'}>ID</MenuItem>
          </Select>
        </FormControl>
        </React.Fragment>
      )}

      {numSelected > 0 ? (
        <React.Fragment>
          <BasicModal4 setSelected={setSelected} setAtualize={setAtualize} selected={selected[0]} />
          <Tooltip title="Ir para ficha detalhada">
            <IconButton
              onClick={() => {
                navigate(`/pacientes/${selected[0].id}`)
              }}
            >
              <OpenInNewIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Deletar paciente">
            <IconButton onClick={() => handleOpen4()}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </React.Fragment>
      ) : (
        <Tooltip title="Adicionar nova ficha">
          <IconButton
            onClick={() => {
              handleOpen();
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

export default function EnhancedTable() {
  const [order, setOrder] = React.useState(DEFAULT_ORDER);
  const [orderBy, setOrderBy] = React.useState(DEFAULT_ORDER_BY);
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [visibleRows, setVisibleRows] = React.useState(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_ROWS_PER_PAGE);
  const [paddingHeight, setPaddingHeight] = React.useState(0);
  const [atualize, setAtualize] = React.useState('');
  const { createRows } = React.useContext(BaereContext);
  const [patientRows, setPatientRows] = React.useState([]);
  const [length, setLength] = React.useState([]);
  const [patientRowsOG, setPatientRowsOG] = React.useState([]);

  const [state, setState] = React.useState({
    searchInput: "",
    searchSelect: "nome",
  })
  
  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
    if (evt.target.name === 'searchInput') {
      if (evt.target.value === '') {
        setPatientRows(patientRowsOG);
        let rowsOnMount = stableSort(
          patientRowsOG,
          getComparator(order, orderBy),
        );
    
        rowsOnMount = rowsOnMount.slice(
          0 * rowsPerPage,
          0 * rowsPerPage + rowsPerPage,
        );
    
        setVisibleRows(rowsOnMount);
        return;
      }
      const filteredPatientRows = patientRows.filter((patientRow) => patientRow[state.searchSelect].toString().toLowerCase().includes(evt.target.value.toLowerCase()));
      setPatientRows(filteredPatientRows);
      let rowsOnMount = stableSort(
        filteredPatientRows,
        getComparator(order, orderBy),
      );
  
      rowsOnMount = rowsOnMount.slice(
        0 * rowsPerPage,
        0 * rowsPerPage + rowsPerPage,
      );
  
      setVisibleRows(rowsOnMount);
    }
  };

  React.useEffect(() => {
    const getRows = async () => {
      const rows = await createRows();
      setPatientRows(rows);
      setPatientRowsOG(rows);
      let rowsOnMount = stableSort(
        rows,
        getComparator(order, orderBy),
      );
  
      rowsOnMount = rowsOnMount.slice(
        0 * rowsPerPage,
        0 * rowsPerPage + rowsPerPage,
      );
  
      setVisibleRows(rowsOnMount);
    } 
    getRows();
  }, [atualize]);

  const handleRequestSort = React.useCallback(
    async (event, newOrderBy) => {
      const rows = await createRows();
      setPatientRows(rows);
      setPatientRowsOG(rows);
      const isAsc = orderBy === newOrderBy && order === 'asc';
      const toggledOrder = isAsc ? 'desc' : 'asc';
      setOrder(toggledOrder);
      setOrderBy(newOrderBy);

      const sortedRows = stableSort(rows, getComparator(toggledOrder, newOrderBy));
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
      const newSelected = patientRows.map((n) => n);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, row) => {
    if (selected[0] === row) {
      setSelected([])
    } else {
      setSelected([row]);
    }
  };

  const handleChangePage = React.useCallback(
    async (event, newPage) => {
      const rows = await createRows();
      setPatientRows(rows);
      setPatientRowsOG(rows);
      setPage(newPage);

      const sortedRows = stableSort(rows, getComparator(order, orderBy));
      const updatedRows = sortedRows.slice(
        newPage * rowsPerPage,
        newPage * rowsPerPage + rowsPerPage,
      );
      setVisibleRows(updatedRows);

      // Avoid a layout jump when reaching the last page with empty rows.
      const numEmptyRows =
        newPage > 0 ? Math.max(0, (1 + newPage) * rowsPerPage - rows.length) : 0;

      const newPaddingHeight = (dense ? 33 : 53) * numEmptyRows;
      setPaddingHeight(newPaddingHeight);
    },
    [order, orderBy, dense, rowsPerPage],
  );

  const handleChangeRowsPerPage = React.useCallback(
    async (event) => {
      const rows = await createRows();
      setPatientRows(rows);
      setPatientRowsOG(rows);
      const updatedRowsPerPage = parseInt(event.target.value, 10);
      setRowsPerPage(updatedRowsPerPage);

      setPage(0);

      const sortedRows = stableSort(rows, getComparator(order, orderBy));
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
        <EnhancedTableToolbar state={state} handleChange={handleChange} setAtualize={setAtualize} setSelected={setSelected} numSelected={selected.length} selected={selected} />
        <BasicModal setAtualize={setAtualize}/>
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
              rowCount={patientRows.length}
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
                        key={row.cpf}
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
                          {row.nome}
                        </TableCell>
                        <TableCell align="right">{row.data}</TableCell>
                        <TableCell align="right">{row.cpf}</TableCell>
                        <TableCell align="right">{row.telefone}</TableCell>
                        <TableCell align="right">{row.id}</TableCell>
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
          count={patientRows.length}
          rowsPerPage={rowsPerPage}
          labelDisplayedRows={({ from, to, count }) => { return `${from}–${to} de ${count !== -1 ? count : `mais que ${to}`}`; }}
          page={page}
          labelRowsPerPage={'Linhas por página'}
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