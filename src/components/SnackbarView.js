import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

const SnackbarView = ({text, show, isShow, isSuccess}) =>{
    const classes = useStyles();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        show(false)
    };
    
    return(
        <div className={classes.root}>
            <Snackbar open={isShow} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={isSuccess}>
                    {text}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default SnackbarView;