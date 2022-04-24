import Signup from "./components/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./components/Auth"
import Login from "./components/Login";
import ForgotPassWord from "./components/ForgotPassword";
import UpdateProfile from "./components/UpdateProfile";
//import Container from "@material-ui/core/Container";
import { CartProvider } from "./context/CartContext";
import Demo from "./components/Demo";
import Basket from "./components/Basket";
import CocktailBuilder from "./components/CocktailBuilder";

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
						<Route path="/!" element={<Demo />} />
						<Route path="/update-profile" element={<UpdateProfile />} />
						<Route path="/signup" element={<Signup />} />
						<Route path="/login" element={<Login />} />
						<Route path="/forgot-password" element={<ForgotPassWord />} />
						<Route path="/shoping-card" element={<Basket />} />
						<Route path ="/cocktail-builder" element = {<CocktailBuilder/>}/>
					</Routes>
				</CartProvider>
		</Auth>
			</BrowserRouter>
	);
}

export default App;
