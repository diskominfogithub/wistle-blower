import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const useStyles = makeStyles((theme) => ({
    appBar: {
      boxShadow: 'none'
    },
    toolBar: {
      backgroundColor: '#00AEEF'
    },
    title: {
      flexGrow: 1,
      color: 'white',
      fontWeight: 'bold'
    }
  }));

function Appbar(props) {
    const classes = useStyles();
    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar variant="dense" className={classes.toolBar}>
                <p className={classes.title}>
                    Whistle Blower
                </p>
            </Toolbar>
        </AppBar>
    );
}

export default Appbar;