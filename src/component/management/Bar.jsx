import { AppBar, Button, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core';
import MenuSharpIcon from '@material-ui/icons/MenuSharp';
import { Col, Row } from 'antd';
import React, { useState } from 'react';
// import Video from '../'
import Video from '../video/video.mp4';
import Diaolog from './Dialog';
import Home from './Home';
import Seacrch from './Seacrch';
import Sider from './Sider';

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
  const [isMenu, setIsMenu] = useState(false)
  const [valueSearch, setValueSearch] = useState('')
  const [checkEdit, setCheckEdit] = useState(false)
  const [open, setOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [users, setUsers] = useState(null)
  // const [idDel, setIdDel] = useState(null)
  function checkData() {
    setIsEdit(!isEdit)
  }
  function idVal(row, users) {
    // console.log(idValue,users)
    setUsers(row)
    setOpen(true)
    // setUsers(users)
    setCheckEdit(false)
  }
  const getSave = () => {
    setOpen(false);
    setUsers(null)
  }
  console.log(isEdit, 'isedit')
  // const getIdDel = (id) =>{
  //   // console.log(id)
  //   setIdDel(id)
  // } 
  // console.log(isEdit)
  const onDelete = () => {
    setIsEdit(!isEdit)
  }
  const valSearch = (key) => {
    setValueSearch(key)
  }
  return (
    <div className={classes.root}>
          <video className="video" src={Video} loop  autoPlay="true" muted />
      <div className="modal2"></div>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton}
            color="inherit" aria-label="menu"
          >
            <MenuSharpIcon onClick={() => setIsMenu(!isMenu)} />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <div style={{ marginTop: '100px' }}>
        <Row>
          <Col md={4}>
            {isMenu && <div className="sider"><Sider/></div>}
          </Col>
          <Col md={20}>
            <Row>
              <Col  offset={8}>
                <h1 style={{ height: '100px',fontSize:'30px', color:"white" }}>Welcome</h1>
              </Col>
            </Row>
            <Row>
              
              <Col md={18}>
                <div style={{ height: '100px' }}>
                  <Seacrch valSearch={valSearch} />
                </div>
                {open && <div className="diolog">
                  <Diaolog checkData={checkData}
                    users={users} checkEdit={checkEdit}
                    getSave={getSave} />
                </div>}
                {open && <div className="modal" onClick={() => { setOpen(!open) }}></div>}
                {isMenu && <div className="modal" onClick={() => { setIsMenu(!isMenu) }}></div>}
              </Col>
              <Col md={6} >
                <Button variant="contained" color="secondary"
                  onClick={() => { setOpen(!open); setCheckEdit(true) }}>
                  Add employer
             </Button>
              </Col>
            </Row>
            <Row className="height">
              {/* <Col span={4} >
              </Col> */}
              <Col span={21} >
                <Home isEdit={isEdit} idVal={idVal}
                  onDelete={onDelete}
                  valueSearch={valueSearch}
                // getIdDel={getIdDel}
                />
              </Col>
              <Col span={3} >
              </Col>
            </Row>
          </Col>
        </Row>
        {/* <Row style={{height:'100px'}}>

        </Row> */}
      </div>
    </div>
  );
}





export default Bar;