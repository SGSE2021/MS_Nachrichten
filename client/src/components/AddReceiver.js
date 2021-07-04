import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';



import AddReceiverForm from './AddReceiverForm'


const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "75%"
  },
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
}));

export const AddReceiver = ({users, newMessageReceiver, handleReceiverChange}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getSender = () => {
    //TODO maybe in utils
    return "Test Horst"
  }

  return (
    <form className={classes.reciverInput} noValidate autoComplete="off">
      <div>
        <TextField
          label="Empfänger"
          id="outlined-size-small"
          variant="outlined"
          size="small"
          value={newMessageReceiver}
        />
        <Button
          variant="contained"
          color="primary"
          size="Normal"
          className={classes.button}
          startIcon={<AddIcon />}
          onClick={handleOpen}
        >
          Empfänger Hinzufügen
        </Button>
        <Modal
          aria-labelledby="receiver-modal-title"
          aria-describedby="receiver-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <h2 id="receiver-message-modal-title">Empfänger Hinzufügen</h2>
              <AddReceiverForm users={users} id="receiver-modal-description"
                sender={getSender()}
                onClose={handleClose}
                newMessageReceiver={newMessageReceiver}
                handleReceiverChange={handleReceiverChange} />
            </div>
          </Fade>
        </Modal>
      </div>
    </form>
  );
}

export default AddReceiver
