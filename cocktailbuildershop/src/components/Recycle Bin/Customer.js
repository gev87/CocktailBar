import React, { useState, useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import  MainContext from "../context/MainContext";
import {Button,  Container } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { makeStyles,Grid,Link } from "@material-ui/core";


	// The user object has basic properties such as display name, email, etc.

const useStyles = makeStyles((theme) => ({
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	root: {
		"& > *": {
			margin: theme.spacing(1),
		},
	},
}));

export default function Customer() {
	const [error, setError] = useState("");
	const { currentUser, logout} = useContext(MainContext);
	const navigate = useNavigate();
	const classes = useStyles();
	
console.log(true)

	async function handleLogout() {
		setError("");
		try {
			await logout();
			navigate("/");
		} catch {
			setError("Failed to Log out");
		}
	}
console.log(currentUser)
	return (
		<Container
			style={{ padding: "30px", backgroundColor: "#cfe8fc", width: "300px" }}
		>
			<Grid container component="main" className={classes.root}>
				<h2>
					User: {currentUser ? currentUser.displayName : <Navigate to="/" />}
				</h2>
				{error && (
					<Alert variant="filled" severity="error">
						{error}
					</Alert>
				)}
				<div>
					<strong>Email:</strong> {currentUser?.email}
					</div>
				{/*ete es hanenq mekel App-i meji private route (mainpagei)skzbnakan ej@ kberi*/}
				<div className={classes.root}>
					<Button
						className={classes.submit}
						onClick={() => navigate("/update-profile")}
						variant="contained"
						color="primary"
					>
						Update Profile
					</Button>
					<div>
						<Grid item>
							<Link onClick={handleLogout} href="/" variant="body2">
								{"Log Out"}
							</Link>
						</Grid>
					</div>
				</div>
			</Grid>
		</Container>
	);
}
