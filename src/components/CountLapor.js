import React from 'react';

const CountLapor = ({ countLapor }) => {

    return (
        <div style={{ backgroundColor: '#00AEEF', padding: 10, marginTop: 50, textAlign: 'center' }}>
            <h4 style={{ color: 'white' }}>
                Jumlah laporan sekarang
                </h4>
            <h4 style={{ color: 'white' }}>
                {countLapor}
            </h4>
        </div>
    );

}

export default CountLapor