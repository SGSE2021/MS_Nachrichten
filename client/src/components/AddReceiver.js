import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';



import AddReceiverForm from './AddReceiverForm'
import { getAllAdministratives, getAllLecturers, getAllStudents } from './helper/GeUsers';


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

export const AddReceiver = ({ users, newMessageReceiver, handleReceiverChange }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [students, setStudents] = React.useState([])
  const [lecturers, setLecturers] = React.useState([])
  const [admins, setAdmins] = React.useState([])
  const [selectedUsers, setSelectedUsers] = React.useState([]);
  const [receiverString, setReceiverString] = React.useState('')
  const [filter, setFilter] = React.useState('');


  function getUsers() {
    if (filter === 10) {
      return students
    }
    if (filter === 20) {
      return lecturers
    }
    if (filter === 30) {
      return admins
    }
    return []
  }

  const handleSelectionChange = (event) => {
    setFilter(event.target.value);
  };

  const handleCheckboxChange = (event, user) => {
    let tempSelectedUsers = selectedUsers
    let result = false
    if (isUserSelected(user)) {
      tempSelectedUsers.splice(tempSelectedUsers.indexOf(tempSelectedUsers.filter(item => (item.id === user.id))), 1)
    }
    else {
      tempSelectedUsers.push(user)
      result = true
    }
    setSelectedUsers(tempSelectedUsers)
    return result
  }

  const isUserSelected = (user) => {
    const result = selectedUsers.filter(element => (element.id === user.id)).length !== 0
    return result
  }

  const handleOpen = async () => {
    setStudents(await getAllStudents())
    setLecturers(await getAllLecturers())
    setAdmins(await getAllAdministratives())
    setOpen(true);
  };

  const handleClose = () => {
    setReceiverString(getReceiverString())
    setOpen(false);
  };

  // const getReceiver = () => {
  //   return receiver
  // }

  const getSender = () => {
    //TODO maybe in utils
    return "Test Horst"
  }

  const getReceiverString = () => {
    let tempRecString = ''
    selectedUsers.map((row) => {
      tempRecString += row.firstname + ' ' + row.lastname + '; '
    })
    return tempRecString
  }

  useEffect(() => {
  }, [setStudents, setLecturers, setAdmins])

  return (
    <form className={classes.reciverInput} noValidate autoComplete="off">
      <div>
        <TextField
          label="Empfänger"
          id="outlined-size-small"
          variant="outlined"
          size="small"
          value={receiverString}
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
              <AddReceiverForm students={students} lecturers={lecturers} id="receiver-modal-description"
                sender={getSender()}
                onClose={handleClose}
                newMessageReceiver={newMessageReceiver}
                handleReceiverChange={handleReceiverChange}
                filter={filter}
                handleSelectionChange={handleSelectionChange}
                getUsers={getUsers}
                handleCheckboxChange={handleCheckboxChange}
                selectedUsers={selectedUsers}
                isUserSelected={isUserSelected} />
            </div>
          </Fade>
        </Modal>
      </div>
    </form>
  );
}

export default AddReceiver
