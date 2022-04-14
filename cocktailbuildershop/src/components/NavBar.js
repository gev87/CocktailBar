import React, { useState, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { alpha, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { Link as ReactLink } from "react-router-dom";
import MainContext from "../context/MainContext";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { TEMP } from "../consts/const";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 70,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: "white",
    fontFamily: "Georgia, serif",
    fontSize: "15px",
  },
  title2: {
    flexGrow: 1,
    color: "white",
    fontSize: "15px",
    fontFamily: "Georgia, serif",
    marginRight: 10,
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function MenuAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [error, setError] = useState("");
  const { currentUser, logout } = useContext(MainContext);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  async function handleLogout() {
    setError("");
    try {
      await logout();
      navigate("/");
    } catch {
      setError("Failed to Log out");
    }
  }
  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            className={classes.title}
            onClick={() => {
              navigate("/");
            }}
				style={{
					cursor: 'pointer'
				}}
          >
            Home
          </Typography>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div>
            <Typography variant="h6" className={classes.title2}>
              {`Hello : ${currentUser ? currentUser.displayName : "Guest"}`}
            </Typography>
          </div>
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                {!currentUser ? (
                  <ReactLink to="/login">Login</ReactLink>
                ) : (
                  <ReactLink to="/update-profile">Update Profile</ReactLink>
                )}
              </MenuItem>
              <MenuItem onClick={handleClose}>
                {!currentUser ? (
                  <ReactLink to="/signup">Sing Up</ReactLink>
                ) : (
                  <ReactLink onClick={handleLogout} to="/">
                    Log Out
                  </ReactLink>
                )}
              </MenuItem>
            </Menu>
          </div>
          <div>
            {currentUser ? (
              <>
				  <h6 style={{
								  paddingLeft: 7,
								  margin: 0,
							  }}
					>{TEMP.length}</h6>
				  <ShoppingCartIcon
							  style={{
								  paddingBottom: 13,
								  margin: 0
							  }}
							  onClick={() => {
								  navigate("/shoping-card");
							  } } /></>
            ) : (
              ""
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}