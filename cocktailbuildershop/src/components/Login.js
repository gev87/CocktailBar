import React, { useContext, useRef, useState } from "react";
import MainContext from "../context/MainContext";
import { useNavigate, Navigate } from "react-router-dom";
import { TextField, FormControlLabel, Checkbox } from "@material-ui/core";
import { makeStyles, Avatar, Button, CssBaseline } from "@material-ui/core";
import { Link, Paper, Box, Grid, Typography } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Alert } from "@material-ui/lab";
import Demo from "./Demo";

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{"Copyright © "}
			<Link color="inherit" href="./">
				Cocktail Menu
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	root: {
		height: "100vh",
	},
	root1: {
		width: "100%",
		"& > * + *": {
			marginTop: theme.spacing(2),
		},
	},
	image: {
		// backgroundImage: "url(https://source.unsplash.com/random)", //nkar@ poxel
		backgroundRepeat: "no-repeat",
		backgroundColor:
			theme.palette.type === "light"
				? theme.palette.grey[50]
				: theme.palette.grey[900],
		backgroundSize: "cover",
		backgroundPosition: "center",
	},
	paper: {
		margin: theme.spacing(8, 4),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function Login() {
	const classes = useStyles();
	const emailRef = useRef();
	const passwordRef = useRef();
	const { login, currentUser } = useContext(MainContext);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const [show, setShow] = useState("password");

	async function handleSubmit(e) {
		e.preventDefault();
		try {
			setError("");
			setLoading(true);
			await login(emailRef.current.value, passwordRef.current.value);
			navigate("/");
		} catch {
			setError("Failed to sign in");
		}
		setLoading(false);
	}

	return (
		<Grid
			container
			onSubmit={handleSubmit}
			component="main"
			className={classes.root}
		>
			<CssBaseline />
			<Grid item xs={false} sm={4} md={7} className={classes.image} ><Demo/></Grid>
			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					{currentUser && <Navigate to="/" />}
					<Typography component="h1" variant="h5">
						Log in
					</Typography>
					{error && (
						<div className={classes.root1}>
							<Alert variant="filled" severity="error">
								{error}
							</Alert>
						</div>
					)}
					<form className={classes.form} noValidate>
						<TextField
							inputRef={emailRef}
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
						/>
						<TextField
							inputRef={passwordRef}
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type={show}
							id="password"
							autoComplete="current-password"
						/>
						<FormControlLabel
							control={
								<Checkbox
									onClick={() =>
										setShow(show === "password" ? "text" : "password")
									}
									color="primary"
								/>
							}
							label="Show password"
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
						>
							Log In
						</Button>
						<Grid container>
							<Grid item xs>
								<Link href="/forgot-password" variant="body2">
									Forgot password?
								</Link>
							</Grid>
							<Grid item>
								<Link
									href="/signup"
									variant="body2"
									style={{ paddingRight: "140px" }}
								>
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
							<Grid item>
								<Link href="/" variant="body2">
									{"Cancel"}
								</Link>
							</Grid>
						</Grid>
						<hr />
						<Box mt={5}>
							<Copyright />
						</Box>
					</form>
				</div>
			</Grid>
		</Grid>
	);
}

/*function Login() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const { login, currentUser } = useContext(MainContext);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	

	async function handleSubmit(e) {
		e.preventDefault();
		try {
			setError("");
			setLoading(true);
			await login(emailRef.current.value, passwordRef.current.value);
			navigate("/")
		} catch {
			setError("Failed to sign in");
		}
		setLoading(false);
	}

	return (
		<>
			<Card>
				<Card.Body>
					{currentUser && <Navigate to="/" />}
					<h2 className="text-center mb-4">Log In</h2>
					{error && <Alert variant="danger">{error}</Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group id="email">
							<Form.Label>Email</Form.Label>
							<Form.Control type="email" ref={emailRef} required />
						</Form.Group>
						<Form.Group id="password">
							<Form.Label>Password</Form.Label>
							<Form.Control type="password" ref={passwordRef} required />
						</Form.Group>

						<br />
						<Button disabled={loading} className="w-100" type="submit">
							Log In
						</Button>
					</Form>
					<div className="w-100 text-center mt-3">
						<Link to="/forgot-password">Forgot Password?</Link>
					</div>
				</Card.Body>
			</Card>
			<div className="w-100 text-center mt-2">
				Need an accout?
				<Link to="/signup"> Sign up</Link>
			</div>
		</>
	);
}

export default Login;
*/
