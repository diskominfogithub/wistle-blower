import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import qs from "querystring"

import API from '../axios/api'
import CountLapor from './CountLapor'
import SnackbarView from './SnackbarView'

export default class componentName extends Component {
  state = {
    lapor: '',
    countLapor: '',
    snackbar: '',
    isShow: false,
    isSuccess: 'success'
  }

  componentDidMount = async () => {
    await API.get('getCountLaporan.php')
      .then(response => this.setState({
        countLapor: response.data.jumlah
      }))
  }

  handlerChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handlerSubmit = async (e) => {
    e.preventDefault();

    if (this.state.lapor.trim() === '') {
      this.setState({ lapor: '', snackbar: 'Harap isi laporan Anda', isShow: true, isSuccess: 'error' })
    } else {
      const data = {
        lapor: this.state.lapor
      }
      await API.post('addLaporan.php', qs.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(response => {
        // console.log(response.data)
        this.setState({ lapor: '', snackbar: 'Laporan berhasil dikirim', isShow: true, isSuccess: 'success' })
      })

      await API.get('getCountLaporan.php')
        .then(response => this.setState({
          countLapor: response.data.jumlah
        }))
    }
  }

  showSnackbar = (show) => {
    this.setState({ isShow: show })
  }

  render() {
    return (
      <div>
        <Card style={{ padding: 10, margin: 30, marginTop: 50 }}>
          <CardContent style={{ textAlign: 'center' }}>
            <TextField
              name="lapor"
              multiline
              rows="4"
              placeholder="Ketik laporan Anda..."
              variant="outlined"
              style={{ width: '100%' }}
              inputProps={{ style: { fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif' } }}
              onChange={this.handlerChange}
              value={this.state.lapor} />
            <Button onClick={this.handlerSubmit} variant="contained" disableElevation style={{ marginTop: 20, width: '100%', backgroundColor: "#00AEEF", color: 'white', textTransform: 'none' }}>
              Lapor!
          </Button>
          </CardContent>
        </Card>
        <CountLapor countLapor={this.state.countLapor} />
        <SnackbarView text={this.state.snackbar} show={this.showSnackbar} isShow={this.state.isShow} isSuccess={this.state.isSuccess} />
      </div>
    );
  }
}
