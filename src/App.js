// REACT_APP_BASE_API=https://wbs.muaraenimkab.go.id/admin/api/
// REACT_APP_BASE_API=http://localhost:8000/api/

import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Appbar from './components/Appbar'
import Head from './components/Head'
import SendLapor from './components/SendLapor'
import About from './components/About'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#F7F7F7'
  },
  appBar: {
    boxShadow: 'none'
  },
  toolBar: {
    backgroundColor: '#00AEEF'
  },
  title: {
    flexGrow: 1,
    color: 'white'
  },
  content: {
    backgroundColor: 'white',
    marginTop: 45,
    paddingBottom: 45,
    paddingTop: 45
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Appbar/>
      <Container maxWidth="sm" className={classes.content} >
        <Head/>
        <SendLapor/>
        <About/>
      </Container>
    </div>
  );
}

export default App;
