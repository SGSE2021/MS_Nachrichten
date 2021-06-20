import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export default function MultilineTextFields() {
    const classes = useStyles();
    const [recipient, setRecipient] = React.useState('Empfänger Hinzufügen');

    const [newMessage, setMessage] = React.useState('Controlled');

    // TODO
    const handleRecipientChange = (event) => {
        setRecipient(event.target.value);
    };

    // TODO
    const handleNewMessageChange = (event) => {
        setMessage(event.target.value);
    };


    return (
        <form className={classes.root} noValidate autoComplete="off">
            <div>
                <TextField
                    id="standard-multiline-flexible"
                    label="Empfänger:"
                    multiline
                    rowsMax={4}
                    value={recipient}
                />
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    className={classes.button}
                    startIcon={<AddIcon />}
                >
                    Empfänger hinzufügen
                </Button>
            </div>
            <div>
            <TextareaAutosize 
            aria-label="minimum height" 
            rowsMin={20} 
            placeholder="Minimum 3 rows" />
                {/* <TextField
                    id="outlined-multiline-flexible"
                    label="Nachricht:"
                    multiline
                    height="50%" 
                    rowsMax={20}
                    value={newMessage}
                    onChange={handleNewMessageChange}
                    variant="outlined"
                    style={{
                        width: '100%'
                    }}
                /> */}
            </div>
        </form>
    );
}