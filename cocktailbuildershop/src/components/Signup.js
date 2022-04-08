
import React,{useContext, useRef, useState} from "react";
import { Form, Button,Alert,Card } from "react-bootstrap";
import { Link,useNavigate,Navigate } from "react-router-dom";
import MainContext from "../context/MainContext";




function Signup() {
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

export default Signup;
