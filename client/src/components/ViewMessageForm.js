import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';



const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: "100%",
    },
  },
}));


export const ViewMessageForm = ({ sender, message, onClose }) => {
  const classes = useStyles();
  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          label="Von"
          id="outlined-size-small"
          variant="outlined"
          size="small"
          value={sender}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id="outlined-multiline-static"
          label="Nachricht"
          multiline
          rows={25}
          variant="outlined"
          InputProps={{
            readOnly: true,
          }}
          value={message}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={onClose}>
          Schließen
        </Button>
      </div>
    </form>
  );
};
export default ViewMessageForm;
