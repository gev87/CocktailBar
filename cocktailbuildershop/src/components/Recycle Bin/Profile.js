//nerka pahin chenq ogtagorcum
import Signup from "../Signup";
import { AuthProvider } from "../../context/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "../MainPage";
import Login from "../Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassWord from "../ForgotPassword";
import UpdateProfile from "../UpdateProfile";
import React from "react";
import Container from "@material-ui/core/Container";

function Profile() {
	return (
		<AuthProvider>
			<Container
				style={{ padding: "30px", backgroundColor: "#cfe8fc", width: "500px" }}
			>
				<div>
					<BrowserRouter>
						<AuthProvider>
							<Routes>
								<Route exact path="/" element={<MainPage />} />
								<Route path="/update-profile" element={<UpdateProfile />} />
								<Route path="/signup" element={<Signup />} />
								<Route path="/login" element={<Login />} />
								<Route path="/forgot-password" element={<ForgotPassWord />} />
							</Routes>
						</AuthProvider>
					</BrowserRouter>
				</div>
			</Container>
		</AuthProvider>
	);
}

export default Profile;
