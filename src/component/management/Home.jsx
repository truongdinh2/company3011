import { DeleteOutlined } from '@material-ui/icons';
import EditIcon from '@material-ui/icons/Edit';
import { message, Popconfirm } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function CustomPaginationActionsTable(props) {
  const strKey = props.valueSearch;
  const [arrKey, setArrKey] = useState([]);
  const [valueSearch, setValueSearch] = useState('');
  const [users, setUsers] = useState([]);
  const [sortData, setSortData] = useState(users)
  const text = 'Are you sure to delete this task?';
  const success = () => {
    message.success('deleted sucessfully');
  };
  const [numberCurrent, setNumberCurrent] = useState(1);
  const [numberPerPage, setNumberPerPage] = useState(5);
  const numberCrrUp = numberCurrent - -1;
  const numberCrrDown = numberCurrent - 1;
  const [sortNotice, setSortNotice] = useState('sort')
  const pageNumber = Math.ceil(arrKey.length / numberPerPage);
  const lastArrNum = numberCurrent * numberPerPage;
  const beginArrNum = lastArrNum - numberPerPage;
  const data3 = arrKey.slice(beginArrNum, lastArrNum);
  const isPrivous = (numberCurrent <= 1) ? true : false;
  const isNext = (pageNumber === numberCurrent || numberCurrent >= pageNumber) ? true : false;
  useEffect(() => {
    setValueSearch(strKey)
  }, [strKey])
  useEffect(() => {
    axios.get('https://5fbb65b4c09c200016d406f6.mockapi.io/info').then(res => {
      if (res) {
        setUsers(res.data)
      }
    }).catch(err => {
      console.log(err)
    })
  }, [props.isEdit]);
  useEffect(() => {
    var arrkey1 = [];
    (sortData !== [] ? users : sortData).map((key) => {
      var index;
      index = key.name.toLowerCase().indexOf(valueSearch);
      if (index !== -1) {
        arrkey1.push(key);
      }
      return arrkey1;
    }
    );
    setArrKey(arrkey1);
  }, [users,valueSearch,sortData])
  useEffect(() => {
    if (data3.length === 0) {
      setNumberCurrent(1)
    }
  }, [numberPerPage,data3])
    const handleEdit = (row) => {
    props.idVal(row)
  }
  const handleDelete = async id => {
    fetch(`https://5fbb65b4c09c200016d406f6.mockapi.io/info/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    }).then(() => {
      props.onDelete();
      success()
    });
  }
  const handleSort = () => {
    var sort1 = users.sort((a, b) => {
      var x = a.name.toLowerCase();
      var y = b.name.toLowerCase();
      if (x < y) { return -1 }
      if (x > y) { return 1 }
      return 0;
    })
    setSortData(sort1);
    setSortNotice('SORTED')
  }

  function confirm(id) {
    message.info('Clicked on Yes.');
    handleDelete(id)
  }
  const handlePageChange = (event) => {
    setNumberCurrent(event.target.id)
  }
  return (
    <div className="container1">
      <table >
        <thead>
          <tr>
            <th style={{ width: '16%' }}>Name</th>
            <th style={{ width: '5%' }}>Age</th>
            <th style={{ width: '20%' }}>Email</th>
            <th style={{ width: '25%' }}>Website</th>
            <th style={{ width: '34%' }}>Introduction</th>
            <th style={{ width: '10%' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data3.map((row, index) => (
            <tr key={index}>
              <td component="th" >
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
                  <EditIcon />
                </a>
                <Popconfirm placement="topLeft" title={text} onConfirm={() => confirm(row.id)}
                  okText="Yes" cancelText="No"
                >
                  <a href style={{ color: "red", textDecoration: "underLine", cursor: "pointer" }}>
                    <DeleteOutlined /></a>
                </Popconfirm>
              </td>
            </tr>
          ))}

        </tbody>
        <tfoot>
          <tr className="page">
          </tr>
        </tfoot>
      </table>
      <div className="divPageNum">
        <span className="sort">
          <button onClick={handleSort}>
            {sortNotice}
          </button>
        </span>
        {/* {Number} */}
        <span
          className='allPage '
        >
          All page: {arrKey.length}
        </span>
        <span
          className='allPage '
        >
          <label >number per pages: </label>
          <select onChange={(e) => setNumberPerPage(e.target.value)}>
            <option value={5} >5</option>
            <option value={10} >10</option>
            <option value={15} >15</option>
          </select>
        </span>
        <span
        >
          <input
            type="button" disabled={isPrivous}
            onClick={() => { setNumberCurrent(numberCurrent - 1) }}
            value="privous"
          ></input>
        </span>
        {numberCrrDown === 0 ? '' : <span
          className={'pageNum'}
          style={{ cursor: 'pointer' }}
          onClick={handlePageChange}
          id={numberCrrDown}
        >
          {numberCrrDown}
        </span>}
        <span
          className='pageNum pageCrr'
          style={{ cursor: 'pointer ' }}
          onClick={handlePageChange}
          id={numberCurrent}
        >
          {numberCurrent}
        </span>
        {
          (pageNumber < numberCrrUp) ? '' :
            <span
              className='pageNum'
              style={{ cursor: 'pointer' }}
              onClick={handlePageChange}
              id={numberCrrUp}
            >
              {numberCrrUp}
            </span>
        }
        <span
        >
          <input type="button" disabled={isNext || numberCurrent >= pageNumber}
            onClick={() => { setNumberCurrent(numberCurrent + 1) }}
            value="next"
          ></input>
        </span>
      </div>

    </div>
  );
}
