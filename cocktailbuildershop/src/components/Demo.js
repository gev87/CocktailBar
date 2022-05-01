import React, { useState } from "react";
// import { Link, Navigate } from "react-router-dom";
import CocktailCards from "./CocktailCards";
import Footer from "./Footer";
import ListImage from './ListImage'


export default function Demo() {


	return (
		<>
			<NavBar />
			{/* <CustomSwiper/> */}
			<CocktailCards />
			<ListImage/>
			<Footer/>
			{/* { {currentUser ? <Customer /> : <div><Link to="/login">Log in</Link>{"  or  "} 	<Link to="/signup">Sign up</Link> </div>} } */}
		</>
	);
}
