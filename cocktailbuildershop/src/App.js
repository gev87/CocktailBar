import React, { useContext } from "react";
import Signup from "./components/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartContext, CartProvider } from "./context/CartContext";
import Login from "./components/Login";
import ForgotPassWord from "./components/ForgotPassword";
import UpdateProfile from "./components/UpdateProfile";
//import Container from "@material-ui/core/Container";
import Auth from "./components/Auth";
import Demo from "./components/Demo";
import ShopingCard from "./components/ShopingCard";



function App() {

	return (
		/*<Container
			style={{ padding: "30px", backgroundColor: "#cfe8fc", width: "500px" }}
		>*/
		<BrowserRouter>
			<Auth>
				<CartProvider>
					<Routes>
						<Route exact path="/" element={<Demo />} />
						<Route path="/update-profile" element={<UpdateProfile />} />
						<Route path="/signup" element={<Signup />} />
						<Route path="/login" element={<Login />} />
						<Route path="/forgot-password" element={<ForgotPassWord />} />
						<Route path="/shoping-card" element={<ShopingCard />} />
					</Routes>
				</CartProvider>
			</Auth>
		</BrowserRouter>
		/*</Container>*/
	);
}

export default App;
