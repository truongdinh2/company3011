import IconButton from '@material-ui/core/IconButton';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TablePagination from '@material-ui/core/TablePagination';
import { DeleteOutlined } from '@material-ui/icons';
import EditIcon from '@material-ui/icons/Edit';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

// function createData(name, calories, fat) {
//   return { name, calories, fat };
// }


const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});

export default function CustomPaginationActionsTable(props) {
  const classes = useStyles2();
  const strKey = props.valueSearch;
  const arrKey = []
  const [valueSearch, setValueSearch] = useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [users, setUsers] = useState([])
  useEffect(() => {
    setValueSearch(strKey)
  })
  useEffect(() => {
    axios.get('https://5fbb65b4c09c200016d406f6.mockapi.io/info').then(res => {
      // console.log(res.data)
      if (res) {
        setUsers(res.data)
      }
    }).catch(err => {
      console.log(err)
    })
    console.log('GetData')
  }, [props.isEdit])
  const rows = users.sort((a, b) => (a.calories < b.calories ? -1 : 1));
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleEdit = (row) => {
    // console.log(row)
    props.idVal(row)
    // setUsers(users.id)
    // props.getUsers(users)
  }
  const handleDelete = async id => {
    console.log(id)
    fetch(`https://5fbb65b4c09c200016d406f6.mockapi.io/info/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    }).then(() => {
      props.onDelete();
      console.log('Delete')
    });
  }
// console.log(props.valueSearch)
 rows.map((key)=>{
  var index ;
  index = key.name.indexOf(valueSearch);
  if(index!== -1) {
    arrKey.push(key)
  }
  return arrKey;
})
// console.log(arrKey)
// console.log(rows)
// console.log(valueSearch)
// console.log(index)
// console.log(rows.map((key)=>{
//   key.name.indexOf(valueSearch)
// }))
  return (
    
      <table >
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Website</th>
            <th>Introduction</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {(rowsPerPage > 0
            ? arrKey.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : arrKey
          ).map((row) => (
            <tr key={row.name}>
              <td component="th" scope="row">
                {row.name}
              </td>
              <td style={{}} >
                {row.age}
              </td>
              <td style={{}} >
                {row.email}
              </td>
              <td>{row.website}</td>
              <td>{row.introduction}</td>
              <td>
                <a href style={{ color: "blue", textDecoration: "underLine", cursor: "pointer" }}
                  onClick={() => handleEdit(row)}
                  >
                  <EditIcon/>
                  </a>
                <a href style={{ color: "red", textDecoration: "underLine", cursor: "pointer" }}
                  onClick={() => handleDelete(row.id)}
                  ><DeleteOutlined /></a>
              </td>
            </tr>
          ))}

          {emptyRows > 0 && (
            <tr style={{ height: 53 * emptyRows }}>
              <td colSpan={6} />
            </tr>
          )}
        </tbody>
          <tr className="page">
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </tr>
      </table>
  );
}
