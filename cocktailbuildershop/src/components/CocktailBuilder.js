import React, { useState, useContext,useEffect } from "react";
import { Container, Typography, Button, TextField } from "@material-ui/core";
import NavBar from "./NavBar";
import Autocomplete from "@material-ui/lab/Autocomplete";
import PRICESARR from "../consts/PRICESARR";
import PRICES from "../consts/PRICES";
import { Alert } from "@mui/material";
import MainContext from "../context/MainContext";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ShopIcon from "@material-ui/icons/Shop";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Footer from "./Footer";
import THEMES from "../consts/THEMES";
import {
  writeAsync,
  readOnceGet,
  updateAsync,
} from "../firebase/crudoperations";
import { useNavigate } from "react-router-dom";

function CustomCocktail({addItemToCart}) {
  const [ingridient1, setIngridient1] = useState("");
  const [ingridient2, setIngridient2] = useState("");
  const [ingridient3, setIngridient3] = useState("");
  const [ingridient4, setIngridient4] = useState("");
  const [cocktailName, setCocktailName] = useState("");
  const [error, setError] = useState("");
  const { currentUser } = useContext(MainContext);
  const classes = THEMES();
	const navigate = useNavigate();
	

  let obj = {
    idDrink:
      ingridient1 + ingridient2 + ingridient3 + ingridient4 + cocktailName,
    price:
      PRICES[ingridient1] +
      PRICES[ingridient2] +
      (PRICES[ingridient3] || 0) +
      (PRICES[ingridient4] || 0) +
      3,
    strDrink: cocktailName,
    strCategory: currentUser?.displayName + "'s Creation",
    strDrinkThumb: "/images/cocktail1.jpg",
    strIngredient1: ingridient1,
    strIngredient2: ingridient2,
    strIngredient3: ingridient3,
    strIngredient4: ingridient4,
	};
	
	
  function handleSubmit() {
    if (!currentUser) {
      return setError("Please Sign In");
    }
    if (
      ingridient1.length < 1 ||
      ingridient2.length < 1 ||
      cocktailName.length < 1
    ) {
      return setError(
        "COCkTAIL NAME , INGRIDIENT 1 AND INGRIDIENT 2 ARE REQUIRED"
      );
    }
    addItemToCart(obj);
    setError("Congratulations! You have made a new cocktail");
  }

  function onClean() {
    setIngridient1("");
    setIngridient2("");
    setIngridient3("");
    setIngridient4("");
    setCocktailName("");
    setError("");
  }

  return (
		<div>
			<Container maxWidth="sm">
				{error[2] === "n" ? (
					<div>
						<Alert variant="filled">{error}</Alert>
					</div>
				) : (
					error && (
						<Alert variant="filled" severity="error">
							{error}
						</Alert>
					)
				)}
			</Container>
			<div
				style={{
					display: "flex",
					minWidth: "300px",
					paddingLeft: "300px",
					flexDirection: "row",
					flexWrap: "wrap",
				}}
			>
				<div style={{ paddingTop: "20px" }}>
					<TextField
						inputProps={{ className: classes.input }}
						onChange={(e) => setCocktailName(e.target.value)}
						variant="outlined"
						label="COCKTAIL NAME"
						value={cocktailName}
						style={{ width: 250, padding: "15px 0px" }}
						color="secondary"
					/>

					<Autocomplete
						classes={{ inputRoot: classes.input }}
						onInputChange={(event, newInputvalue) => {
							setIngridient1(newInputvalue);
						}}
						inputValue={ingridient1}
						id="controllable-states-demo"
						options={PRICESARR}
						getOptionLabel={(option) => option.ingridient}
						style={{ width: 250, padding: "15px 0px" }}
						renderInput={(params) => (
							<TextField
								{...params}
								label="INGRIDIENT 1"
								variant="outlined"
								color="secondary"
							/>
						)}
					/>
					<Autocomplete
						classes={{ inputRoot: classes.input }}
						inputValue={ingridient2}
						onInputChange={(event, newInputvalue) => {
							setIngridient2(newInputvalue);
						}}
						id="controllable-states-demo"
						options={PRICESARR}
						getOptionLabel={(option) => option.ingridient}
						style={{ width: 250, padding: "15px 0px" }}
						renderInput={(params) => (
							<TextField
								{...params}
								label="INGRIDIENT 2"
								variant="outlined"
								color="secondary"
							/>
						)}
					/>
					<Autocomplete
						classes={{ inputRoot: classes.input }}
						inputValue={ingridient3}
						onInputChange={(event, newInputvalue) => {
							setIngridient3(newInputvalue);
						}}
						id="controllable-states-demo"
						options={PRICESARR}
						getOptionLabel={(option) => option.ingridient}
						style={{ width: 250, padding: "15px 0px" }}
						renderInput={(params) => (
							<TextField {...params} label="INGRIDIENT 3" variant="outlined" />
						)}
					/>
					<Autocomplete
						classes={{ inputRoot: classes.input }}
						inputValue={ingridient4}
						onInputChange={(event, newInputvalue) => {
							setIngridient4(newInputvalue);
						}}
						id="controllable-states-demo"
						options={PRICESARR}
						getOptionLabel={(option) => option.ingridient}
						style={{ width: 250, padding: "15px 0px" }}
						renderInput={(params) => (
							<TextField {...params} label="INGRIDIENT 4" variant="outlined" />
						)}
					/>
				</div>
				<img
					width="30%"
					style={{ padding: "0px 50px" }}
					src="/images/cocktail1.jpg"
					alt="custom"
				/>

				<div style={{ padding: "0px 50px", width: "150px" }}>
					<Button
						style={{ height: "150px", background: "#ec0000", color: "#6be909" }}
						variant="contained"
						fullWidth
						onClick={handleSubmit}
					>
						ADD To Cart
						<ShoppingCartIcon fontSize="large" />
					</Button>
					<Button
						variant="contained"
						fullWidth
						style={{ height: "150px", background: "yellow", color: "#6e280b" }}
						onClick={onClean}
					>
						CLEAR ALL FIELDS
						<HighlightOffIcon fontSize="large" />
					</Button>
					<Button
						onClick={() => navigate("/payment")}
						color="primary"
						variant="contained"
						fullWidth
						style={{ height: "150px" }}
					>
						ORDER NOW <ShopIcon fontSize="large" />
					</Button>
				</div>
			</div>
		</div>
	);
}
export default function CocktailBuilder() {
	const classes = THEMES();
	const [cartChange, setCartChange] = useState([]);
	const [cart,setCart] = useState([]);
	  const { currentUser } = useContext(MainContext);
	
	useEffect(() => {
		currentUser &&
			readOnceGet(`users/${currentUser.uid}/orders`, (items) => items).then(
				(res) => {
					res && setCart(Object.entries(res));
				}
			);
	}, [currentUser, cartChange]);

	const addItemToCart = (card, func) => {
		currentUser &&
			readOnceGet(`users/${currentUser.uid}/orders`, (items) => items).then(
				(value) => {
					const item =
						value &&
						Object.entries(value).find(
							(e) =>
								e[1].order.idDrink ===
								(func ? func(card).idDrink : card.idDrink)
						);
					!item
						? writeAsync(`users/${currentUser.uid}/orders`, {
								order: func ? func(card) : card,
								quantity: 1,
						  })
						: updateAsync(`users/${currentUser.uid}/orders/${item[0]}`, {
								quantity: ++item[1].quantity,
						  });
					setCartChange([]);
				}
			);
	};

	


  return (
		<div>
			<NavBar
				mainPage={false}
				basketQty={cart.reduce((cur, elem) => cur + elem[1].quantity, 0)}
				showDrawer={false}
			/>
			<div className={classes.heroContent}>
				<Container maxWidth="sm">
					<Typography
						component="h1"
						variant="h2"
						align="center"
						color="textPrimary"
						gutterBottom
						style={{ color: "#ac5b01" }}
					>
						Cocktail Builder
					</Typography>
				</Container>
				<CustomCocktail addItemToCart={addItemToCart} />
				<Container maxWidth="sm">
					<Typography
						variant="h5"
						align="center"
						color="textSecondary"
						paragraph
						style={{ color: "#ac5b01" }}
					>
						Here is the place where you can try yourself by making personal
						cocktail. Add up to 4 ingridients you want in your cocktail and
						enjoy it.
					</Typography>
					<Footer />
				</Container>
			</div>
		</div>
	);
}
