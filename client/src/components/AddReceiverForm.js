import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';




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


export const AddReceiverMessageForm = ({ loggedUser, onClose, newMessageReceiver, handleReceiverChange, filter, handleSelectionChange, getUsers, handleCheckboxChange, selectedUsers, isUserSelected }) => {
  const classes = useStyles();
  // const allUsers = users
  // const studyUsers = allUsers.filter(user => user.userType === 'Studierende')
  // const teachUsers = allUsers.filter(user => user.userType === 'Lehrende')
  // const adimUsers = allUsers.filter(user => user.userType === 'Administrative')

  const getFilterItems = () => {
    //students
    if (loggedUser.role === 1) {
      return (
        <div>
          <MenuItem value={10}>Studierende</MenuItem>
          <MenuItem value={20}>Lehrende</MenuItem>
          <MenuItem value={30}>Andimistrative</MenuItem>
          <MenuItem value={40}>Studiengang</MenuItem>
        </div>
      )
    }
    // admins
    else if (loggedUser.role === 2) {
      return (
        <div>
          <MenuItem value={10}>Studierende</MenuItem>
          <MenuItem value={20}>Lehrende</MenuItem>
          <MenuItem value={30}>Andimistrative</MenuItem>
          <MenuItem value={40}>Studiengang</MenuItem>
          <MenuItem value={50}>Fachbereich</MenuItem>
          <MenuItem value={60}>Alle</MenuItem>
        </div>
      )
    }
    //lecturers
    else if (loggedUser.role === 3) {
      return (
        <div>
          <MenuItem value={10}>Studierende</MenuItem>
          <MenuItem value={20}>Lehrende</MenuItem>
          <MenuItem value={30}>Andimistrative</MenuItem>
          <MenuItem value={50}>Fachbereich</MenuItem>
        </div>
      )
    }


  }


  return (
    <form className={classes.root} noValidate autoComplete="off" >
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel id="simple-select-label">Auswahl</InputLabel>
          {(loggedUser.role === 1) &&
            <Select
              labelId="simple-select-label"
              id="simple-select"
              value={filter}
              onChange={handleSelectionChange}
            >
              <MenuItem value={10}>Studierende</MenuItem>
              <MenuItem value={20}>Lehrende</MenuItem>
              <MenuItem value={30}>Andimistrative</MenuItem>
              <MenuItem value={40}>Studiengang</MenuItem>
            </Select>
          }
          {(loggedUser.role === 2) &&
            <Select
              labelId="simple-select-label"
              id="simple-select"
              value={filter}
              onChange={handleSelectionChange}
            >
              <MenuItem value={10}>Studierende</MenuItem>
              <MenuItem value={20}>Lehrende</MenuItem>
              <MenuItem value={30}>Andimistrative</MenuItem>
              <MenuItem value={40}>Studiengang</MenuItem>
              <MenuItem value={50}>Fachbereich</MenuItem>
              <MenuItem value={60}>Alle</MenuItem>
            </Select>
          }
          {(loggedUser.role === 3) &&
            <Select
              labelId="simple-select-label"
              id="simple-select"
              value={filter}
              onChange={handleSelectionChange}
            >
              <MenuItem value={10}>Studierende</MenuItem>
              <MenuItem value={20}>Lehrende</MenuItem>
              <MenuItem value={30}>Andimistrative</MenuItem>
              <MenuItem value={50}>Fachbereich</MenuItem>
            </Select>
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
