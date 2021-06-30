import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

import AddReceiver from './AddReceiver'

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: "100%",
        },
    },
    reciverInput: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: "50%",
        },
    },
    button: {
        margin: theme.spacing(1),
    },
}));

export default function EmailInputTextField() {
    const classes = useStyles();

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <form className={classes.reciverInput} noValidate autoComplete="off">
                <div>
                    <AddReceiver/>
                </div>
            </form>
            <form className={classes.root} noValidate autoComplete="off">
                <div>
                    <TextField
                        id="outlined-multiline-static"
                        label="Nachricht"
                        multiline
                        rows={25}
                        variant="outlined"
                    />
                </div>
                <div>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<Icon>send</Icon>}
                >
                    Nachricht Senden
                </Button>
                </div>
            </form>
        </form>

    );
}