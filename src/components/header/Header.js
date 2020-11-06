import { AppBar, Button, Drawer, Grid, Hidden, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { TextField } from 'mui-rff';
import React from 'react';
import { Form } from 'react-final-form';

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  toolBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 70,
    '& .MuiToolbar-regular': {
      minHeight: 70
    }
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
    '& .MuiDrawer-paperAnchorDockedLeft': {
      borderRight: 'none'
    },
    '& .MuiDrawer-paper': {
      top: 'auto'
    }
  },
  toolbar: {
    [theme.breakpoints.up('sm')]: {
      height: 70
    },
    [theme.breakpoints.down('sm')]: {
      height: 250
    },
  },
  drawerPaper: {
    width: drawerWidth,
    '& .MuiDrawer-paperAnchorDockedLeft': {
      borderRight: 'none'
    },
    padding: theme.spacing(2)
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      display: 'none'
    },
  },
  list: {
    width: 238,
    '& .MuiSvgIcon-root': {
      color: '#0048B4'
    },
    '& .MuiListItem-root': {
      textTransform: 'uppercase'
    }
  },
  link: {
    '& .MuiListItem-button': {
      height: 70
    }
  },
  brandName: {
    '& .MuiTypography-root': {
      fontWeight: 700
    }
  },
  header: {
    '& .MuiPaper-elevation4': {
      boxShadow: 'none'
    }
  },
  buttonContainer: {
    '& .MuiButton-containedPrimary:hover': {
      boxShadow: 'none'
    }
  }
}))

const Header = ({ onSubmit, result, errorMsg }) => {
  const classes = useStyles();

  const initialValues = {
    starting_point: "",
    destination_point: ""
  }

  const handleReset = () => {
    console.log('reset')
  }

  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <Hidden smUp implementation="css">
            <Form
              onSubmit={onSubmit}
              initialValues={initialValues}
              render={({ handleSubmit, submitting }) => (
                <form noValidate onSubmit={handleSubmit}>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <TextField color="primary" label="Starting point" name="starting_point" variant="outlined" fullWidth />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField color="primary" label="Destination point" name="destination_point" variant="outlined" fullWidth />
                    </Grid>

                    {result ? (
                      <>
                        <Grid item xs={12}>
                          <Typography variant="body2">total distance: {result.total_distance}</Typography>
                          <Typography variant="body2">total time: {result.total_time}</Typography>
                        </Grid>
                      </>
                    ) : ('')}

                    {errorMsg ? (
                      <>
                        <Grid item xs={12}>
                          <Typography color="error" variant="body2">{errorMsg.error}</Typography>
                        </Grid>
                      </>
                    ) : ('')}

                    <Grid className={classes.buttonContainer} item xs={12}>
                      <Button color="primary" onClick={handleSubmit} variant="contained">Submit</Button>
                      <Button color="primary" onClick={handleReset} variant="outlined">Reset</Button>
                    </Grid>
                  </Grid>
                </form>
              )}
            />
          </Hidden>
          {/* <Hidden xsDown implementation="css">

          </Hidden> */}
        </Toolbar>
      </AppBar>

      <nav className={classes.drawer} aria-label="mailbox folders">

        <Hidden smUp implementation="css">
          {/* Mobile Sidenav */}


        </Hidden>

        {/* Large screen Sidenav */}
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            <Form
              onSubmit={onSubmit}
              initialValues={initialValues}
              render={({ handleSubmit, submitting }) => (
                <form noValidate onSubmit={handleSubmit}>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <TextField color="primary" label="Starting point" name="starting_point" variant="outlined" fullWidth />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField color="primary" label="Destination point" name="destination_point" variant="outlined" fullWidth />
                    </Grid>

                    {result ? (
                      <>
                        <Grid item xs={12}>
                          <Typography variant="body2">total distance: {result.total_distance}</Typography>
                          <Typography variant="body2">total time: {result.total_time}</Typography>
                        </Grid>
                      </>
                    ) : ('')}

                    {errorMsg ? (
                      <>
                        <Grid item xs={12}>
                          <Typography color="error" variant="body2">{errorMsg.error}</Typography>
                        </Grid>
                      </>
                    ) : ('')}

                    <Grid className={classes.buttonContainer} item xs={12}>
                      <Button color="primary" onClick={handleSubmit} variant="contained">Submit</Button>
                      <Button color="primary" onClick={handleReset} variant="outlined">Reset</Button>
                    </Grid>
                  </Grid>
                </form>
              )}
            />

          </Drawer>
        </Hidden>
      </nav>
    </>
  );
}

export default Header;