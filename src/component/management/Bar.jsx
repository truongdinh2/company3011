// import Sider from './Sider';
import { useAuth0 } from "@auth0/auth0-react";
import { AppBar, Button, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core';
import MenuSharpIcon from '@material-ui/icons/MenuSharp';
import React, { useState } from 'react';
import Diaolog from './Dialog';
import Home from './Home';
import Seacrch from './Seacrch';
// import LoginOutlined, { LogoutOutlined } from "@ant-design/icons";


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
  const onDelete = () => {
    setIsEdit(!isEdit)
  }
  const valSearch = (key) => {
    setValueSearch(key);
  }
  if (isLoading) {
    return <div>Loading ...</div>
  }
  return (
    <div className={classes.root}>
      {isAuthenticated && <div className="modal2"></div>}
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton}
            color="inherit" aria-label="menu" onClick={() => setIsMenu(!isMenu)}
          >
            <MenuSharpIcon />
          </IconButton>
          <Typography variant="h6" style={{ color: "white" }} className={classes.title}>
            Admin
          </Typography>
          {isAuthenticated ? <LogoutButton /> : <LoginButton />}
        </Toolbar>
      </AppBar>

      {open && <div className="modal" onClick={() => { setOpen(!open) }}></div>}
      {isMenu && <div className="modal" onClick={() => { setIsMenu(!isMenu) }}></div>}
      <div style={{ marginTop: '100px' }}>
        <div>
          <div md={4} xm={6}>
            {isMenu && isAuthenticated ? <div className="sider">
              <h2>infor của bạn đã bị hack </h2>
              <p>tên bạn là: {user.given_name} 🐶</p>
              <p>họ bạn là: {user.family_name}</p>
              <p>quốc gia bạn là: {user.locale === 'vi' ? "Việt Nam  :))" : ''}</p>
              <p>ảnh bạn là:  <img src={user.picture} alt="pic" /></p>
            </div> : ''}
          </div>
          <div md={20} xm={18}>
            <div >
              <div offset={6}>
                {isAuthenticated ? <h1 className="titlte" >Welcome
                    <span >
                    {' ' + user.given_name + ''}
                  </span>
                </h1> : <h1 className="titlte">Login please</h1>}
              </div>
            </div>
            <div>
              <div className="flexbox">
                <div className="flex_item item1" style={{ height: '100px' }}>
                  {isAuthenticated ? <Seacrch valSearch={valSearch} /> :
                    ''}
                </div>
                <div className="flex_item item2" >
                  {isAuthenticated ?
                    <Button className="button__add" variant="contained" color="secondary"
                      onClick={() => { setOpen(!open); setCheckEdit(true) }}>
                      Add 
                    </Button> : ''}
                </div>
              </div>
            </div>
            <div className="height">
              <div >
                {isAuthenticated && <Home isEdit={isEdit} idVal={idVal}
                  onDelete={onDelete}
                  valueSearch={valueSearch}
                />}
              </div>
              <div  >
              </div>
              {open && <div className="diolog">
                <Diaolog checkData={checkData}
                  users={users} checkEdit={checkEdit}
                  getSave={getSave} />
              </div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}





export default Bar;