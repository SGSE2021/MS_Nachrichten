import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';

import axios from 'axios';
import Env from './Env';

import AddReceiverForm from './AddReceiverForm'
import { getUserById, getAllAdministratives, getAllLecturers, getAllStudents } from './helper/GetUsers';


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

export const AddReceiver = ({ loggedUser, newMessageReceiver, handleReceiverChange, selectedUsers, setSelectedUsers }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [students, setStudents] = React.useState([])
  const [lecturers, setLecturers] = React.useState([])
  const [admins, setAdmins] = React.useState([])
  const [receiverString, setReceiverString] = React.useState('')
  const [filter, setFilter] = React.useState('');
  const [loggedInfo, setLoggedInfo] = React.useState([])


  function getUsers() {
    // Studierende
    if (filter === 10) {
      return students
    }
    // Lehrende
    if (filter === 20) {
      return lecturers
    }
    // Andimistrative
    if (filter === 30) {
      return admins
    }
    // Studiengang
    if (filter === 40) {
      const courseId = loggedInfo.data.course.id
      const studentsInCourse = students.filter((student) => student.course.id === courseId)
      return studentsInCourse
    }
    // Fachbereich
    if (filter === 50) {
      const departmentId = loggedInfo.data.departmentId
      const lecturersInDepartment = lecturers.filter((lecturers) => lecturers.departmentId === departmentId)
      const studentsInDepartment = students.filter((student) => student.course.departmentId === departmentId)
      const usersInDepartment = studentsInDepartment.concat(lecturersInDepartment)
      return usersInDepartment
    }
    // Alle
    if (filter === 60) {
      return students.concat(lecturers, admins)
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
    setLoggedInfo(await getUserById(loggedUser.uid))
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
    console.log("JOOOO", tempRecString)
    return tempRecString
  }

  useEffect(() => {
    setReceiverString(getReceiverString())
  })

  const ReceiverForm = () =>
    <TextField
      label="Empfänger"
      id="outlined-size-small"
      variant="outlined"
      size="small"
      value={receiverString}
    />

  return (
    <form className={classes.reciverInput} noValidate autoComplete="off">
      <div>
        <ReceiverForm/>
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
              <AddReceiverForm loggedUser={loggedUser} students={students} lecturers={lecturers} id="receiver-modal-description"
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
