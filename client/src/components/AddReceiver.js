import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import { getMyCoursesLecturer, getMyCoursesStudent } from './helper/GetMyCourses';

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
  const [teacherCourses, setTeacherCourses] = React.useState([])
  const [studentCourses, setStudentCourses] = React.useState([])
  const [courseFilter, setCourseFilter] = React.useState()

  function getUsers() {
    // Studierende
    if (filter === "Studierende") {
      return students
    }
    // Lehrende
    if (filter === "Lehrende") {
      return lecturers
    }
    // Andimistrative
    if (filter === "Andimistrative") {
      return admins
    }
    // Studiengang
    if (filter === "Studiengang") {
      const courseId = loggedInfo.data.course.id
      const studentsInCourse = students.filter((student) => student.course.id === courseId)
      return studentsInCourse
    }
    // Fachbereich
    if (filter === "Fachbereich") {
      const departmentId = loggedInfo.data.departmentId
      const lecturersInDepartment = lecturers.filter((lecturers) => lecturers.departmentId === departmentId)
      const studentsInDepartment = students.filter((student) => student.course.departmentId === departmentId)
      const usersInDepartment = studentsInDepartment.concat(lecturersInDepartment)
      return usersInDepartment
    }

    // Course/Class selected
    if (filter.includes("CourseSelectionLecturer")) {
      const selectedCourseId = filter.split(',')[1]
      const selectedCourse = teacherCourses.filter((course) => course.id === parseInt(selectedCourseId))[0]
      const studentIDs = selectedCourse.persons.split(',')
      const studentsToDisplay = []
      studentIDs.forEach(studentId => {
        students.forEach((student) => {
          if (student.id === studentId) {
            studentsToDisplay.push(student)
          }
        })
      });
      return studentsToDisplay
    }

    // Courde/Class selected for student
    if (filter.includes("CourseSelectionStudent")) {
      const selectedCourseId = filter.split(',')[1]
      const selectedCourse = studentCourses.filter((course) => course.id === parseInt(selectedCourseId))[0]
      const studentIDs = selectedCourse.persons.split(',')
      const usersToDisplay = []
      studentIDs.forEach(studentId => {
        students.forEach((student) => {
          if (student.id === studentId) {
            usersToDisplay.push(student)
          }
        })
      });
      const lecturerToDisplay = lecturers.filter((lecturers) => lecturers.id === selectedCourse.docents)
      usersToDisplay.push(lecturerToDisplay)
      return usersToDisplay
    }

    // Alle
    if (filter === "Alle") {
      return students.concat(lecturers, admins)
    }
    return []
  }

  const handleSelectionChange = (event) => {
    setFilter(event.target.value);
  };

  const handleCourseSelectionChange = (event) => {
    console.log(event.target.value)
    setCourseFilter(event.target.value);
  }

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
    setTeacherCourses(await getMyCoursesLecturer(loggedUser.uid))
    setStudentCourses(await getMyCoursesStudent(loggedUser.uid))
    setOpen(true);
  };

  const handleClose = () => {
    setReceiverString(getReceiverString())
    setOpen(false);
  };

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
        <ReceiverForm />
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
                isUserSelected={isUserSelected}
                courseFilter={courseFilter}
                handleCourseSelectionChange={handleCourseSelectionChange}
                teacherCourses={teacherCourses}
                studentCourses={studentCourses} />
            </div>
          </Fade>
        </Modal>
      </div>
    </form>
  );
}

export default AddReceiver
