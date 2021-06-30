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
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';




const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: "100%",
    },
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
}));


export const AddReceiverMessageForm = ({ sender, message, onClose, onAnswer }) => {
  const classes = useStyles();

  const [filter, setFilter] = React.useState('');

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  const tempTestUsers = [
    {
      'name': 'Test Student',
      'roll': 'student',
      'course': 'Test course',
      'selected': false
    },
    {
      'name': 'Test Lehrender',
      'roll': 'lehrender',
      'course': 'Test course',
      'selected': false
    },
    {
      'name': 'Test Verwaltender',
      'roll': 'verwaltender',
      'course': '',
      'selected': false
    },
  ]

  function getUsers() {
    return tempTestUsers
    // return { name, course };
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filter}
            onChange={handleChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Ausgewählt</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getUsers().map((row) => (
              <TableRow key={row.name}>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{(() => {
                  if (row.selected) {
                    return <CheckBoxIcon />
                  }
                  else {
                    return <CheckBoxOutlineBlankIcon />
                  }
                })()
                }</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}>
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
