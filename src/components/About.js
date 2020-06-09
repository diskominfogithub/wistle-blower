import React from 'react';
import Avatar from '@material-ui/core/Avatar';

function About(props) {
    return (
        <div style={{textAlign:'center', marginTop:50}}>
          <p>
            Dikembangkan oleh
          </p>
          <div style={{display:'flex', marginTop:50, justifyContent:"center"}}>
            <Avatar src="me.png" style={{padding:5}} />
            <Avatar src="kominfo.png" style={{padding:5}} />
          </div>
          {/* <div style={{ marginTop:50}}>
            <a href="#" style={{padding:10, textDecoration:'none', color:'#00AEEF'}}>Tentang kami</a>
            <a href="#" style={{padding:10, textDecoration:'none', color:'#00AEEF'}}>Hubungi kami</a>
          </div> */}
          <p style={{marginTop:100}}>
            Copyright 2020. Muara Enim Smart Regency
          </p>
        </div>
    );
}

export default About;