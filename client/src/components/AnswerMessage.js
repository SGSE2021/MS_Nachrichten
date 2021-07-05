import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';

import AnswerMessageForm from './AnswerMessageForm'


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

export default function AnswerMessage({message}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  function makeBodyToAnswerBody(messageBody) {
    return '\n----------------------------------\n'.concat(messageBody)
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getMessage = () => {
    //TODO maybe in utils
    return message.body
  }

  const getSender = () => {
    //TODO maybe in utils
    return message.senderName
  }

  return (
    <div>
      <Button onClick={handleOpen}
        alignItems='center'>
        Antworten
      </Button>
      <Modal
        aria-labelledby="answer-message-modal-title"
        aria-describedby="answer-message-modal-description"
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
            <h2 id="answer-message-modal-title">Nachricht</h2>
            <AnswerMessageForm id="answer-message-modal-description"
              sender={getSender()}
              messageBody={makeBodyToAnswerBody(getMessage())}
              message={message}
              onClose={handleClose} />
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
