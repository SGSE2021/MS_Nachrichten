import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import SchoolIcon from '@material-ui/icons/School';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { BrowserRouter as Router, Redirect } from 'react-router-dom'


import MessagesSendShowTabs from './MessagesSendShowTabs'
import getUserById from './helper/GetUsers';
import SvgIcon from '@material-ui/icons/Menu';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  largeIcon: {
    fontSize: "10em"
  },
}));

export default function PersistentDrawerLeft({ loggedUser }) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const renderAdminUserItems = (role) => {
    if (role === 2) {
      return <div>
        <ListItem component="a" href="https://sgse2021-ilias.westeurope.cloudapp.azure.com/users/students" button key={'Studierende'}>
          <ListItemText primary={'Studierende'} />
        </ListItem>
        <ListItem component="a" href="https://sgse2021-ilias.westeurope.cloudapp.azure.com/users/lecturers" button key={'Lehrende'}>
          <ListItemText primary={'Lehrende'} />
        </ListItem>
      </div>
    }
  }

  if (loggedUser === null) {
    return (
      <Router>
        <Redirect to="https://sgse2021-ilias.westeurope.cloudapp.azure.com/users/" />
      </Router>
    )
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap position="left">
            Ilias2.0 Nachrichten
          </Typography>
          <div>
            <IconButton
              component="a"
              href="https://sgse2021-ilias.westeurope.cloudapp.azure.com/users/settings"
            >
              <AccountCircleIcon fontSize="large" />
            </IconButton>
          </div>
          <div>
            <label>
              {loggedUser.firstname + ' ' + loggedUser.lastname}
            </label>
          </div>
        </Toolbar>

      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <header>
          <SvgIcon component={SchoolIcon} className={classes.largeIcon}/>
          <h3>Ilias2.0</h3>
        </header>
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <Router>
          <List>
            <ListItem component="a" href="https://sgse2021-ilias.westeurope.cloudapp.azure.com/users/" button key={'Startseite'}>
              <ListItemText primary={'Startseite'} />
            </ListItem>
            <ListItem component="a" href="https://sgse2021-ilias.westeurope.cloudapp.azure.com/messages/" button key={'Nachrichten'}>
              <ListItemText primary={'Nachrichten'} />
            </ListItem>
            <ListItem component="a" href="https://sgse2021-ilias.westeurope.cloudapp.azure.com/courses/" button key={'Kurse'}>
              <ListItemText primary={'Kurse'} />
            </ListItem>
            <ListItem component="a" href="https://sgse2021-ilias.westeurope.cloudapp.azure.com/exams/" button key={'Prüfungen'}>
              <ListItemText primary={'Prüfungen'} />
            </ListItem>
            {
              renderAdminUserItems(loggedUser.role)
            }
            <ListItem component="a" href="https://sgse2021-ilias.westeurope.cloudapp.azure.com/users/" button key={'Raumbelegung'}>
              <ListItemText primary={'Raumbelegung'} />
            </ListItem>
            <ListItem component="a" href="https://sgse2021-ilias.westeurope.cloudapp.azure.com/users/logout" button key={'Ausloggen'}>
              <ListItemText primary={'Ausloggen'} />
            </ListItem>
          </List>
        </Router>
        <Divider />
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <MessagesSendShowTabs loggedUser={loggedUser} />
      </main>
    </div>
  );


}