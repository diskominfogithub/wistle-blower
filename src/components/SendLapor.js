import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ReCAPTCHA from 'react-google-recaptcha';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import API from '../axios/api'
import CountLapor from './CountLapor'
import SnackbarView from './SnackbarView'

export default class componentName extends Component {

  constructor(props) {
    super(props);
    this.recaptchaRef = React.createRef();
  }

  state = {
    lapor: '',
    countLapor: '',
    snackbar: '',
    isShow: false,
    isSuccess: 'success',
    token: null,
    selectedFile: null,
    skpd: null,
    selectedSkpd: ''
  }

  componentDidMount = async () => {
    await API.get('getcount')
      .then(response => this.setState({
        countLapor: response.data.jumlah
      }))

    await API.get('getskpd')
      .then(response => this.setState({
        skpd: response.data.data
      }))
  }

  handlerChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleChangeSelect = (event) => {
    this.setState({ selectedSkpd: event.target.value });
  };

  onFileChange = (e) => {
    this.setState({ selectedFile: e.target.files[0] });
  };

  handlerSubmit = async (e) => {
    e.preventDefault();

    if (this.state.lapor.trim() === '') {
      this.setState({ snackbar: 'Harap isi laporan Anda', isShow: true, isSuccess: 'error' })
    } else if (this.state.selectedSkpd === '') {
      this.setState({ snackbar: 'Harap pilih SKPD yang dituju', isShow: true, isSuccess: 'error' })
    } else if (this.state.token == null) {
      this.setState({ snackbar: 'Harap isi captcha', isShow: true, isSuccess: 'error' })
    } else {
      if (this.state.lapor.length < 15) {
        this.setState({ snackbar: 'Harap isi laporan Anda lebih dari 15 karakter', isShow: true, isSuccess: 'error' })
      } else {

        const formData = new FormData()
        formData.append('file', this.state.selectedFile)
        formData.append("lapor", this.state.lapor)
        formData.append("id_skpd", this.state.selectedSkpd)
        formData.append("secret", "6Ld-Sv8UAAAAABE-J2XrL8vAlh3MS3KMSGI9JtOo")
        formData.append("token", this.state.token)

        try {
          const response = await API.post('storelaporan', formData)
          this.recaptchaRef.current.reset()

          if (Number(response.data) === 1) {
            this.setState({ token: null, lapor: '', selectedSkpd: '', selectedFile: null, snackbar: 'Laporan berhasil dikirim', isShow: true, isSuccess: 'success' })
          } else if (Number(response.data) === 2) {
            this.setState({ token: null, snackbar: 'Gagal memverifikasi captcha. Silahkan coba lagi', isShow: true, isSuccess: 'error' })
          } else {
            this.setState({ token: null, snackbar: 'Gagal mengirim laporan. Silahkan coba lagi', isShow: true, isSuccess: 'error' })
          }
        } catch (error) {
          console.error("error", error.response);
        }

        await API.get('getcount')
          .then(response => this.setState({
            countLapor: response.data.jumlah
          }))
      }
    }
  }

  showSnackbar = (show) => {
    this.setState({ isShow: show })
  }

  onChange = (token) => {
    this.setState({
      token
    })
  }

  render() {
    return (
      <div>
        <Card style={{ padding: 10, margin: 30, marginTop: 50 }}>
          <CardContent>
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

            <FormControl variant="outlined" style={{ width: '100%', marginTop: 20 }}>
              <InputLabel id="demo-simple-select-outlined-label">Pilih SKPD yang dituju</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={this.state.selectedSkpd}
                onChange={this.handleChangeSelect}
                label="Pilih SKPD yang dituju"
              >
                <MenuItem value="">
                  <em>Pilih SKPD yang dituju</em>
                </MenuItem>
                {this.state.skpd != null ?
                  this.state.skpd.map((answer, i) => {
                    return (<MenuItem key={i} value={answer.id_skpd}>{answer.nama_skpd}</MenuItem>)
                  })
                  : null
                }
              </Select>
            </FormControl>

            <label style={{ marginTop: 20, marginRight: 20, display: 'inline-block', width: '95%', border: 1, borderStyle: 'dashed', borderRadius: 5, borderColor: '#00AEEF', cursor: 'pointer', padding: 10 }} htmlFor="imageUpload">{this.state.selectedFile == null ? 'Tambah file' : this.state.selectedFile.name}</label>
            <input type="file" id="imageUpload" accept="image/*" style={{ display: 'none' }} onChange={this.onFileChange} />

            <ReCAPTCHA
              ref={this.recaptchaRef}
              sitekey="6Ld-Sv8UAAAAABl9nqAqT6IrNmZkHaWTp5Y6U5st"
              onChange={this.onChange}
              style={{ marginTop: 20, width: '100%' }} />
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
