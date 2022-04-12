import React, { useState, useContext } from "react";
import { Card,Button,Alert } from "react-bootstrap";
import { Link, useNavigate  } from "react-router-dom";
import  MainContext from "../context/MainContext";
import { Navigate } from "react-router-dom";

	// The user object has basic properties such as display name, email, etc.

export default function MainPage() {
	const [error, setError] = useState("");
	const { currentUser, logout} = useContext(MainContext);
	const navigate = useNavigate();
	


	async function handleLogout() {
		setError("");
		try {
			await logout();
			navigate("/login");
		} catch {
			setError("Failed to Log out");
		}
	}

	return (
		<>
			<Card>
				<Card.Body>
					<h2 className="text-center mb-4">
						User:{" "}
						{currentUser ? currentUser.displayName : <Navigate to="/login" />}
						<hr />
					</h2>
					{error && <Alert variant="danger">{error}</Alert>}
					<strong></strong>
					<strong>Email:</strong> {currentUser?.email}
					{/*ete es hanenq mekel App-i meji private route (mainpagei)skzbnakan ej@ kberi*/}
					<Link to="/update-profile" className="btn btn-primary w-100 mt-3">
						Update Profile
					</Link>
				</Card.Body>
			</Card>
			<div className="w-100 text-center mt-2">
				<Button variant="link" onClick={handleLogout}>
					Log Out
				</Button>
			</div>
		</>
	);
}
