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
import { BrowserRouter as Router, Link } from 'react-router-dom'


import MessagesSendShowTabs from './MessagesSendShowTabs'


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
}));

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleNavigatorClick = (key) => {
    console.log("test");
    console.log(key);
    return <a href={'http://google.com'}>Google</a>
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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
          <Typography variant="h6" noWrap>
            Ilias2.0
          </Typography>
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
          <img src={SchoolIcon} alt="Ilias2.0 Logo" />
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
            <ListItem component="a" href="https://sgse2021.westeurope.cloudapp.azure.com/users/" button key={'Startseite'}>
              <ListItemText primary={'Startseite'} />
            </ListItem>
            <ListItem component="a" href="https://sgse2021.westeurope.cloudapp.azure.com/messages/" button key={'Startseite'}>
              <ListItemText primary={'Nachrichten'} />
            </ListItem>
            <ListItem component="a" href="https://sgse2021.westeurope.cloudapp.azure.com/courses/" button key={'Startseite'}>
              <ListItemText primary={'Kurse'} />
            </ListItem>
            <ListItem component="a" href="https://sgse2021.westeurope.cloudapp.azure.com/exams/" button key={'Startseite'}>
              <ListItemText primary={'Prüfungen'} />
            </ListItem>
            <ListItem component="a" href="https://sgse2021.westeurope.cloudapp.azure.com/users/" button key={'Startseite'}>
              <ListItemText primary={'Studierende'} />
            </ListItem>
            <ListItem component="a" href="https://sgse2021.westeurope.cloudapp.azure.com/users/" button key={'Startseite'}>
              <ListItemText primary={'Lehrende'} />
            </ListItem>
            <ListItem component="a" href="https://sgse2021.westeurope.cloudapp.azure.com/users/" button key={'Startseite'}>
              <ListItemText primary={'Raumbelegung'} />
            </ListItem>
            <ListItem component="a" href="https://sgse2021.westeurope.cloudapp.azure.com/users/" button key={'Startseite'}>
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
        <MessagesSendShowTabs />
      </main>
    </div>
  );


}