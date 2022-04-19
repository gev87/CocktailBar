import React from "react";
// import { Link, Navigate } from "react-router-dom";
import NavBar from "./NavBar";
import CocktailCards from "./CocktailCards";

export default function Demo() {
	return (
		<>
			<NavBar />
			<CocktailCards />
			Home page
			{/* { {currentUser ? <Customer /> : <div><Link to="/login">Log in</Link>{"  or  "} 	<Link to="/signup">Sign up</Link> </div>} } */}
		</>
	);
}