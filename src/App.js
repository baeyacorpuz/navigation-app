import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

import './App.css';
import './assets/css/main.scss';
import { Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Map from './components/map/Map';

const drawerWidth = 300

const useStyles = makeStyles((theme) => ({
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
}))

const App = () => {
  const classes = useStyles();

  return (
    <>
      <ToastContainer
        position="top-center"
        transition={Flip}
        autoClose={3000}
        hideProgressBar
        closeButton={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable={false}
        pauseOnHover
      />
      <div className="">
        <Router>
          <div>
            <div className={classes.appBar}>
              <div className="">
                <Map />
              </div>
            </div>
          </div>
        </Router>
      </div >
    </>
  );
}

export default App;
