
import React,{useContext, useRef, useState} from "react";
import {useNavigate,Navigate } from "react-router-dom";

//import { Link,useNavigate,Navigate } from "react-router-dom";
import MainContext from "../context/MainContext";


import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Alert } from "react-bootstrap";

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{"Copyright © "}
			<Link color="inherit" href="https://mui.com/">
				Your Website
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
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
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function Signup() {
	const classes = useStyles();
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const { signup, currentUser } = useContext(MainContext);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
	const nameRef = useRef();

	async function handleSubmit(e) {
		e.preventDefault();
		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError("Passwords do NOT match");
		}
		if (passwordRef.current.value.length < 6) {
			alert("Password must have at least 6 characters");
			return setError("Weak password");
		}
		try {
			setError("");
			setLoading(true);
			await signup(
				emailRef.current.value,
				passwordRef.current.value,
				nameRef.current.value
			);
			navigate("/");
		} catch {
			setError("Failed to create an account");
		}
		setLoading(false);
	}

	return (
		<Container onSubmit={handleSubmit} component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				{currentUser && <Navigate to="/" />}
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				{error && <Alert severity="error">{error}</Alert>}
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								inputRef={nameRef}
								autoComplete="fname"
								name="Name"
								variant="outlined"
								required
								fullWidth
								id="Name"
								label="Name"
								autoFocus
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								type="email"
								inputRef={emailRef}
								variant="outlined"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								inputRef={passwordRef}
								variant="outlined"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
							/>
						</Grid>
						<Grid item xs={12}>
							<Grid item xs={12}>
								<TextField
									inputRef={passwordConfirmRef}
									variant="outlined"
									required
									fullWidth
									name="password"
									label="Password Confirmation"
									type="password"
									id="password-confirm"
									autoComplete="current-password"
								/>
							</Grid>
							<FormControlLabel
								control={
									<Checkbox
										onClick={() => setLoading(!loading)}
										value="allowExtraEmails"
										color="primary"
									/>
								}
								label="I am over 18 years old."
							/>
						</Grid>
					</Grid>
					<Button
						disabled={loading}
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Sign Up
					</Button>
					<Grid container justifyContent="flex-end">
						<Grid item>
							<Link
								href="/login"
								variant="body2"
								style={{ paddingRight: "100px" }}
							>
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			<Box mt={5}>
				<Copyright />
			</Box>
		</Container>
	);
}





/*function Signup() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const { signup,currentUser } = useContext(MainContext);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const nameRef = useRef();

	async function handleSubmit(e) {
		e.preventDefault();
		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError("Passwords do NOT match");
		}
		if (passwordRef.current.value.length < 6) {
			alert("Password must have at least 6 characters");
			return setError("Weak password");
		}
		try {
			setError("");
			setLoading(true);
			await signup(
				emailRef.current.value,
				passwordRef.current.value,
				nameRef.current.value
			);
			navigate("/");
		} catch {
			setError("Failed to create an account");
		}
		setLoading(false);
	}

	return (
		<>
			<Card>
				<Card.Body>
					{currentUser && <Navigate to="/" />}
					<h2 className="text-center mb-4">Sign Up</h2>
					{error && <Alert variant="danger">{error}</Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group id="name">
							<Form.Label>Name</Form.Label>
							<Form.Control type="text" ref={nameRef} required />
						</Form.Group>
						<Form.Group id="email">
							<Form.Label>Email</Form.Label>
							<Form.Control type="email" ref={emailRef} required />
						</Form.Group>
						<Form.Group id="password">
							<Form.Label>Password</Form.Label>
							<Form.Control type="password" ref={passwordRef} required />
						</Form.Group>
						<Form.Group id="password-confirm">
							<Form.Label>Password Confirmation</Form.Label>
							<Form.Control type="password" ref={passwordConfirmRef} required />
						</Form.Group>
						<br />
						<Button disabled={loading} className="w-100" type="submit">
							Sign Up
						</Button>
					</Form>
				</Card.Body>
			</Card>
			<div className="w-100 text-center mt-25">
				Already have an account? Just
				<Link to="/login"> Log In</Link>
			</div>
		</>
	);
}

export default Signup;*/
