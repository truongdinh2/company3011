import { AppBar, Button, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core';
import MenuSharpIcon from '@material-ui/icons/MenuSharp';
import { Col, Row } from 'antd';
import React, { useState } from 'react';
// import Video from '../'
import Video from '../video/video.mp4';
import Diaolog from './Dialog';
import Home from './Home';
import Seacrch from './Seacrch';
// import Sider from './Sider';
import { useAuth0 } from "@auth0/auth0-react";
import LoginOutlined, { LogoutOutlined } from "@ant-design/icons";


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


const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button color="inherit" onClick={() => loginWithRedirect()}>Log In</Button>);
};

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <Button color="inherit" onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </Button>
  );
};

function Bar(props) {
  const { user, isAuthenticated, isLoading } = useAuth0();



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
    setCheckEdit(false)
  }
  const getSave = () => {
    setOpen(false);
    setUsers(null)
  }
  console.log(isEdit, 'isedit')
  const onDelete = () => {
    setIsEdit(!isEdit)
  }
  const valSearch = (key) => {
    setValueSearch(key)
  }
  if (isLoading) {
    return <div>Loading ...</div>
  }
  // console.log(isAuthenticated)
  // console.log(user)
  return (
    <div className={classes.root}>
      <video className="video" src={Video} loop autoPlay={true} muted />
      {isAuthenticated && <div className="modal2"></div>}
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton}
            color="inherit" aria-label="menu"  onClick={() => setIsMenu(!isMenu)}
          >
            <MenuSharpIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          {isAuthenticated ? <LogoutButton /> : <LoginButton />}
        </Toolbar>
      </AppBar>

      <div style={{ marginTop: '100px' }}>
        <Row>
          <Col md={4} xm={6}>
            {isMenu && isAuthenticated ? <div className="sider">
              <h2>infor của bạn đã bị hack </h2>
              <p>tên bạn là: {user.family_name} 🐶</p>
              <p>họ bạn là: {user.given_name}</p>
              <p>quốc gia bạn là: {user.locale === 'vi' ? "Việt Nam  :))" : ''}</p>
              <p>ảnh bạn là:  <img src={user.picture} alt="pic" /></p>
            </div> : ''}
          </Col>
          <Col md={20} xm={18}>
            <Row >
              <h1 className="titlte" style={{ margin: "auto" }}>Welcome
                  <span >
                  🐪🐪🐪  {isAuthenticated && user.family_name}😀👆️😧🖤❣️️🎧
                  </span>
              </h1>
            </Row>
            <Row>
              <Col md={18}>
                <div style={{ height: '100px' }}>
                  {isAuthenticated && <Seacrch valSearch={valSearch} />}
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
                {isAuthenticated && <Button className="button__add" variant="contained"
                  onClick={() => { setOpen(!open); setCheckEdit(true) }}>
                  Add employer
             </Button>}
              </Col>
            </Row>
            <Row className="height">
              {/* <Col span={4} >
              </Col> */}
              <Col span={21} >
                {isAuthenticated && <Home isEdit={isEdit} idVal={idVal}
                  onDelete={onDelete}
                  valueSearch={valueSearch}
                // getIdDel={getIdDel}
                />}
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