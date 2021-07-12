import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import FormHelperText from '@material-ui/core/FormHelperText';





const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: "100%",
    },
  },
  table: {
    maxHeight: 440,
    overflowX: 'auto'
  },
  button: {
    margin: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  container: {
    maxHeight: 440,
  },
}));


export const AddReceiverMessageForm = ({ loggedUser,
  onClose,
  newMessageReceiver,
  handleReceiverChange,
  filter,
  handleSelectionChange,
  getUsers,
  handleCheckboxChange,
  selectedUsers,
  isUserSelected,
  teacherCourses,
  studentCourses }) => {
  const classes = useStyles();



  return (
    <form className={classes.root} noValidate autoComplete="off" >
      <div>
        <FormControl className={classes.formControl}>
          {(loggedUser.role === 1) &&
            <Select
              labelId="simple-select-label"
              id="simple-select"
              value={filter}
              onChange={handleSelectionChange}
            >
              <MenuItem value={"Studierende"}>Studierende</MenuItem>
              <MenuItem value={"Lehrende"}>Lehrende</MenuItem>
              <MenuItem value={"Andimistrative"}>Andimistrative</MenuItem>
              <MenuItem value={"Studiengang"}>Studiengang</MenuItem>
              {studentCourses.map((course) => (
                <MenuItem value={"CourseSelectionStudent," + String(course.id)}>Kurs: {course.name}</MenuItem>
              ))}
            </Select>
          }
          {(loggedUser.role === 2) &&
            <Select
              labelId="simple-select-label"
              id="simple-select"
              value={filter}
              onChange={handleSelectionChange}
            >
              <MenuItem value={"Studierende"}>Studierende</MenuItem>
              <MenuItem value={"Lehrende"}>Lehrende</MenuItem>
              <MenuItem value={"Andimistrative"}>Andimistrative</MenuItem>
              <MenuItem value={"Alle"}>Alle</MenuItem>
            </Select>
          }
          {(loggedUser.role === 3) &&
            <FormControl variant="outlined" className={classes.formControl}>
              <Select
                id="simple-select-user-type"
                value={filter}
                onChange={handleSelectionChange}
              >
                <MenuItem value={"Auswählen"}>Auswählen</MenuItem>
                <MenuItem value={"Studierende"}>Studierende</MenuItem>
                <MenuItem value={"Lehrende"}>Lehrende</MenuItem>
                <MenuItem value={"Andimistrative"}>Andimistrative</MenuItem>
                <MenuItem value={"Fachbereich"}>Fachbereich</MenuItem>
                {teacherCourses.map((course) => (
                  <MenuItem value={"CourseSelectionLecturer," + String(course.id)}>Kurs: {course.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          }

        </FormControl>
      </div>
      <div>
        <TableContainer className={classes.container} >
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Ausgewählt</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getUsers().map((row) => (
                <TableRow key={row.id}>
                  <TableCell align="left">{row.firstname + ' ' + row.lastname}</TableCell>
                  <TableCell align="left">
                    <Checkbox
                      defaultChecked={isUserSelected(row)}
                      onChange={(event) => handleCheckboxChange(event, row)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => {
            handleReceiverChange(selectedUsers);
            onClose();
          }}>
          Hinzufügen
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={onClose}>
          Abbrechen
        </Button>
      </div>
    </form>
  );
};
export default AddReceiverMessageForm;
