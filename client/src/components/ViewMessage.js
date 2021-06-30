import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';

import ViewMessageForm from './ViewMessageForm'


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
}));

export default function ViewMessage(senderIds, messageId) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getMessage = (messageId) => {
    //TODO maybe in utils
    return "THIS IS A TEST MESSAGE!!!"
  }

  const getSender = (senderIds) => {
    //TODO maybe in utils
    return "Test Horst"
  }

  return (
    <div>
      <Button onClick={handleOpen}
        alignItems='center'>
        Anzeigen
      </Button>
      <Modal
        aria-labelledby="view-message-modal-title"
        aria-describedby="view-message-modal-description"
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
            <h2 id="view-message-modal-title">Nachricht</h2>
            <ViewMessageForm id="view-message-modal-description"
              sender={getSender(senderIds)}
              message={getMessage(messageId)}
              onClose={handleClose} />
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
