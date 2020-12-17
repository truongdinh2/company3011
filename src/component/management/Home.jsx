import { DeleteOutlined } from '@material-ui/icons';
import EditIcon from '@material-ui/icons/Edit';
import { message, Popconfirm } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function CustomPaginationActionsTable(props) {
  const strKey = props.valueSearch;
  const arrKey = []
  const [valueSearch, setValueSearch] = useState('');
  const [users, setUsers] = useState([]);
  const text = 'Are you sure to delete this task?';
  const success = () => {
    message.success('deleted sucessfully');
  };
  // const [numberBegin,setNumberBegin] = useState(1);
  // const [numberData, setNumberData] = useState(5);
  const [arrNumberp, setArrNumberP] = useState([1])
  const [numberCurrent, setNumberCurrent] = useState(1);
  const numberPerPage = 5;
  // const [isCurrentNum, setIsCurrentNum] = useState(false);
  const numberCrrUp = numberCurrent - -1;
  const numberCrrDown = numberCurrent - 1;

  // var number

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
  }, [props.isEdit])
  const rows = users.sort((a, b) => (a.calories < b.calories ? -1 : 1));

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
  rows.map((key) => {
    var index;
    index = key.name.toLowerCase().indexOf(valueSearch);
    if (index !== -1) {
      arrKey.push(key)
    }
    return arrKey;
  });
  function confirm(id) {
    message.info('Clicked on Yes.');
    handleDelete(id)
  }
  const handlePageChange = (event) => {
    console.log(event.target)
    setNumberCurrent(event.target.id)
    // const toNumberEnd = num

  }
  // window.alert(numberCurrent)
  //
  // console.log(arrKey.length);
  // arrKey.slice()
  const pageNumber = Math.ceil(arrKey.length / numberPerPage);
  useEffect(() => {
    console.log(pageNumber);
    var arrNumber = [];
    for (var i = 1; i <= pageNumber; i++) {
      // console.log(i, 'index');
      arrNumber.push(i)
      // var arr
    }
    setArrNumberP(arrNumber)
    // console.log(arrNumber)
  }, [users])



  console.log(numberCrrUp)
  const lastArrNum = numberCurrent * numberPerPage;
  const beginArrNum = lastArrNum - numberPerPage;
  // console.log(lastArrNum, beginArrNum)
  const data3 = arrKey.slice(beginArrNum, lastArrNum);
  console.log(data3)
  // const classNum = (number !== numberCurrent) ? 'pageNum ' : 'pageNum'
  // const Number = arrNumberp.map(number => {
  //   return (
  //     <span
  //       className={}
  //       style={{ cursor: 'pointer' }}
  //       onClick={handlePageChange}
  //       key={number}
  //       id={number}
  //     >
  //       {number}
  //       {/* console.log(number) */}
  //     </span>

  //   )
  // })
  return (
    <>
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
          {(
            data3
          ).map((row) => (
            <tr key={row.name}>
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
        {/* {Number} */}
        <span
          className='allPage '
        >
          All page: {arrKey.length}
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
          pageNumber < numberCrrUp ? '' : 
        <span
          className='pageNum'
          style={{ cursor: 'pointer' }}
          onClick={handlePageChange}
          id={numberCrrUp}
        >
          {numberCrrUp}
        </span>
        }
      </div>

    </>
  );
}
