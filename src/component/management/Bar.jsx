import { AppBar, Button, ButtonBase, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core';
import MenuSharpIcon from '@material-ui/icons/MenuSharp';
import React, { useState } from 'react';
import Home from './Home';
import Sider from './Sider';
import Seacrch from './Seacrch';
import { Row, Col, } from 'antd';
import Diaolog from './Dialog';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Bar(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false)
  const [isEdit,setIsEdit] = useState(false)
  const [users,setUsers] = useState(null)
  function checkData(){
    setIsEdit(!isEdit)
  }
  function idVal(row,users) {
    // console.log(idValue,users)
    setUsers(row)
    setOpen(true)
    // setUsers(users)
    setIsEdit(false)
  }
  // console.log(users)
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuSharpIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <div style={{ marginTop: '50px' }}>
        <h1>Welcqaome{ }</h1>
        <Row>
          
          <Col span={11}>
            <Seacrch />
            {open && <Diaolog checkData={checkData} 
            users={users} isEdit={isEdit}/>}
          </Col>
          <Col span={13} >
             <Button variant="contained" color="secondary" onClick={()=>{setOpen(!open);setIsEdit(true)}}>
               Add employer
             </Button>
          </Col>
        </Row>
        <Row>
          <Col span={4} >
            <Sider/>
          </Col>
          <Col span={17} >
            <Home isEdit={isEdit} idVal={idVal} />
          </Col>
          <Col span={3} >
          </Col>
          {/* <Col span={6} order={1}>
            4 col-order-1
          </Col> */}
        </Row>
        
      </div>
    </div>
  );
}





export default Bar;