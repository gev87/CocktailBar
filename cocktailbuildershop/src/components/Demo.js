import React from "react";
import { useContext } from "react";
// import { Link, Navigate } from "react-router-dom";
import MainContext from "../context/MainContext";
import NavBar from "./NavBar";
import CardContent from './CardContent';

export default function Demo() {
	const { currentUser } = useContext(MainContext)
	return (
		<>
			<NavBar />
			<CardContent />
			Home page
			{/* { {currentUser ? <Customer /> : <div><Link to="/login">Log in</Link>{"  or  "} 	<Link to="/signup">Sign up</Link> </div>} } */}
		</>
	);
}