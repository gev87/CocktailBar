import React, { useState, useContext } from "react";
import { useNavigate, Link as ReactLink } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Badge } from "@material-ui/core";
import { IconButton, MenuItem, Menu, InputBase } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import SearchIcon from "@material-ui/icons/Search";
import MainContext from "../context/MainContext";
import { CartContext } from "../context/CartContext";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import MenuDrawer from "./MenuDrawer";

//////////
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		marginTop: 70,
		color: 'red',
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
/////////////////////
export default function NavBar() {
	const classes = useStyles();

import HomeIcon from "@material-ui/icons/Home";
import THEMES from "../consts/THEMES";


export default function MenuAppBar({ popularIngsSwitch, popularCocktailsSwitch }) {
	const classes = THEMES();

	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const [, setError] = useState("");
	const { currentUser, logout } = useContext(MainContext);
	const navigate = useNavigate();
	const { cart } = useContext(CartContext);
	const [openMenu, setOpenMenu] = useState(false);

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
		<div className={classes.rootnav}>
			<AppBar style={{ backgroundColor: "#4052b5", color: "white" }}>
				<Toolbar>
					<IconButton
						edge="start"
						className={classes.menuButton}
						color="inherit"
						aria-label="menu"
						onClick={() => setOpenMenu(true)}
					>
						<MenuIcon />
					</IconButton>
					<IconButton
						className={classes.title}
						onClick={() => {
							navigate("/");
						}}
					>
						<HomeIcon />
						Home
					</IconButton>
					<IconButton
						className={classes.title}
						onClick={() => {
							navigate("/");
							popularCocktailsSwitch();
						}}
					>
						<img
							alt="icon"
							style={{ width: "45px", borderRadius: "30%" }}
							src="/images/icon.png"
						/>{" "}
						Popular Cocktails
					</IconButton>
					<IconButton
						className={classes.title}
						onClick={() => {
							navigate("/");
							popularIngsSwitch();
						}}
					>
						<img
							alt="icon"
							style={{ width: "60px", borderRadius: "30%" }}
							src="https://thecocktaildb.com/images/ingredients/Baileys irish cream.png"
						/>{" "}
						Popular Ingredients
					</IconButton>
					<IconButton
						style={{ background: "#4052b5" }}
						className={classes.title}
						onClick={() => {
							navigate("/cocktail-builder");
						}}
					>
						<img
							alt="icon"
							style={{ width: "60px", borderRadius: "30%" }}
							src="/images/icon2.jpg"
						/>{" "}
						Cocktail Builder
					</IconButton>

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
						<Typography variant="h6" className={classes.title}>
							{`Hello : ${currentUser ? currentUser.displayName : "Guest"}`}
						</Typography>

						{currentUser ? (
							<Typography variant="h6" className={classes.title}>
								{" "}
								{"Email : " + currentUser.email}
							</Typography>
						) : null}
					</div>
					<div>
						{!currentUser ? (
							<>
								<Button
									className={classes.title}
									color="inherit"
									onClick={() => {
										navigate("/login");
									}}
								>
									Login
								</Button>
								<Button
									className={classes.title}
									color="inherit"
									onClick={() => {
										navigate("/signup");
									}}
								>
									Sign up
								</Button>
							</>
						) : (
							<>
								<IconButton
									className={classes.title}
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
										<ReactLink
											style={{ color: "#4052b5" }}
											to="/update-profile"
										>
											Update Profile
										</ReactLink>
									</MenuItem>
									<MenuItem onClick={handleClose}>
										<ReactLink
											style={{ color: "#4052b5" }}
											onClick={handleLogout}
											to="/"
										>
											Log Out
										</ReactLink>
									</MenuItem>
								</Menu>
							</>
						)}
					</div>
					<div>
						{currentUser ? (
							<IconButton className={classes.title}>
								<Badge
									overlap="rectangular"
									badgeContent={cart.reduce(
										(current, elem) => current + elem.qty,
										0
									)}
									color="secondary"
								>
									<ShoppingCartIcon
										onClick={() => {
											navigate("/shoping-card");
										}}
									/>
								</Badge>
							</IconButton>
						) : (
							""
						)}
					</div>
				</Toolbar>
			</AppBar>
			<MenuDrawer
				open={openMenu}
				close={() => setOpenMenu(false)}
			/>
		</div>
	);
}
