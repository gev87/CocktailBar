import React, { useContext, useRef, useState } from "react";
//import { Form, Button, Card, Alert } from "react-bootstrap";
import MainContext from "../context/MainContext";
//import { Link } from "react-router-dom";
import { Avatar,Button,Link,Paper } from "@material-ui/core";
import { CssBaseline, TextField, Typography } from "@material-ui/core";
import { makeStyles,Box,Grid } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Demo from "./Demo";

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{"Copyright © "}
			<Link color="inherit" href="/">
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
		// backgroundImage: "url(https://source.unsplash.com/random)",
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
		backgroundColor: " #303f9f",
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function ForgotPassWord() {
	const classes = useStyles();
	const emailRef = useRef();
	const { resetPassword } = useContext(MainContext);
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);

	async function handleSubmit(e) {
		e.preventDefault();
		try {
			setMessage("");
			setError("");
			setLoading(true);
			await resetPassword(emailRef.current.value);
			setMessage("Check your inbox for further instructures");
		} catch {
			setError("Failed to reset password");
		}
		setLoading(false);
	}

	return (
		<Grid container component="main" className={classes.root}>
			<CssBaseline />
			<Grid item xs={false} sm={4} md={7} className={classes.image} ><Demo/></Grid>
			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
				<div className={classes.paper}>
					<Avatar className={classes.avatar}></Avatar>
					<Typography component="h1" variant="h5">
						Password Reset
					</Typography>
					{error && (
						<div className={classes.root1}>
							<Alert variant="filled" severity="error">
								{error}
							</Alert>
						</div>
					)}
					{message && (
						<div className={classes.root1}>
							<Alert variant="filled" severity="success">
								{message}
							</Alert>
						</div>
					)}
					<form onSubmit={handleSubmit} className={classes.form} noValidate>
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
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							disabled={loading}
						>
							Reset Password
						</Button>
						<br />
						<Grid container>
							<Grid item xs>
								<Link href="/login" variant="body2">
									Log In
								</Link>
							</Grid>
							<Grid item style={{padding:"15px"} }>
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

						<Box mt={5}>
							<Copyright />
						</Box>
					</form>
				</div>
			</Grid>
		</Grid>
	);
}

/*function ForgotPassWord() {
	const emailRef = useRef();
	const { resetPassword } = useContext(MainContext);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("")
	const [loading, setLoading] = useState(false);
	
	

	async function handleSubmit(e) {
		e.preventDefault();
        try {
            setMessage("");
			setError("");
			setLoading(true);
            await resetPassword(emailRef.current.value);
            setMessage("Check your inbox for further instructures");
		} catch {
			setError("Failed to reset password");
		}
		setLoading(false);
	}

	return (
		<>
			<Card>
				<Card.Body>
					<h2 className="text-center mb-4">Password Reset</h2>
					{error && <Alert variant="danger">{error}</Alert>}
					{message && <Alert variant="success">{message}</Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group id="email">
							<Form.Label>Email</Form.Label>
							<Form.Control type="email" ref={emailRef} required />
						</Form.Group>
						<br />
						<Button disabled={loading} className="w-100" type="submit">
							Reset Password
						</Button>
					</Form>
					<div className="w-100 text-center mt-3">
						<Link to="/login">Login</Link>
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

export default ForgotPassWord;*/
