import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import ClassIcon from "@material-ui/icons/Class";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PeopleIcon from "@material-ui/icons/People";
import FolderIcon from "@material-ui/icons/Folder";
import SettingsIcon from "@material-ui/icons/Settings";
import { Link } from "react-router-dom";
// import { connect } from "react-redux";
// import * as actionCreator from "../../store/actions";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    background: "#f5f5f5",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    // marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    // marginLeft: 0,
  },
}));

const Navbar = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const logout = () => {
    props.signout();
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        style={{ background: "#2E3B55" }}
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <Grid container alignItems="center">
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
              Life Naturals Admin
            </Typography>
          </Grid>
          <Grid>
            <Button
              variant="contained"
              size="small"
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        // docked={false}
        // onRequestChange={handleDrawerClose}
        className={classes.drawer}
        variant="temporary"
        onEscapeKeyDown={handleDrawerClose}
        onBackdropClick={handleDrawerClose}
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <Link to="/home">
            <ListItem button>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItem>
          </Link>
          <Link to="/products">
            <ListItem button>
              <ListItemIcon>
                <FolderIcon />
              </ListItemIcon>
              <ListItemText primary={"Products"} />
            </ListItem>
          </Link>
          <ListItem button disabled>
            <ListItemIcon>
              <ClassIcon />
            </ListItemIcon>
            <ListItemText primary={"Categories"} />
          </ListItem>
          <Link to="/orders">
          <ListItem button>
            <ListItemIcon>
              <ListAltIcon />
            </ListItemIcon>
            <ListItemText primary={"Orders"} />
          </ListItem>
          </Link>
          <Link to="/users">
            <ListItem button>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary={"Users"} />
            </ListItem>
          </Link>
          <Link to="/settings">
            <ListItem button>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary={"Settings"} />
            </ListItem>
          </Link>
        </List>
        <Divider />
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {props.children}
      </main>
    </div>
  );
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     signout: () => dispatch(actionCreator.startSignout()),
//   };
// };

export default Navbar;
