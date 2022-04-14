import React from "react";
import { useContext } from "react";
// import { Link, Navigate } from "react-router-dom";
import MainContext from "../context/MainContext";
// import Customer from "./Customer";
import NavBar from "./NavBar"
import ListImage from './ListImage'

export default function Demo() {
	const { currentUser } = useContext(MainContext)
	return (
		<>
			<NavBar/>
			<ListImage/>
			Home page
			{/* {currentUser ? <Customer /> : <div><Link to="/login">Log in</Link>{"  or  "} 	<Link to="/signup">Sign up</Link> </div>} */}
		</>
	);
}