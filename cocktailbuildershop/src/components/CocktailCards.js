import React, { useState, useEffect, useContext } from "react";
import { Button, Card, CardActions, CardContent } from "@material-ui/core";
import { CardMedia, Grid, Typography, Container } from "@material-ui/core";
import { CartContext } from "../context/CartContext";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
// import Pages from "./Pages";
import PRICES from "../consts/PRICES";
import THEMES from "../consts/THEMES";
import CustomSwiper from "./CustomSwiper";
import MainContext from "../context/MainContext";
import NavBar from "./NavBar"
import NONALCOHOLIC from "../consts/NONALCOHOLIC";
import ImgDialog from "./ImgDialog";








export default function CocktailCards() {
	const classes = THEMES();
	const [data, setData] = useState([]);
	const { onAdd, onDouble } = useContext(CartContext);
	// const [currentPage, setCurrentPage] = useState(1);
	// const [itemsPerPage] = useState(48);
	const [show, setShow] = useState([]);
	const [ing, setIng] = useState();
	const { currentUser } = useContext(MainContext)
	const [header, setHeader] = useState("MOST POPULAR COCKTAILS");
	const [popularIngs, setPopularIngs] = useState(true);
	const [popularCocktails, setPopularCocktails] = useState(true);
	const { filteredApi, setFilteredApi } = useContext(CartContext);
	const [selectItem, setSelectItem] = useState("");
	const [openDlg1Dialog, setDialog1Open] = useState(false);


	useEffect(() => {
		let each = [];
		let letters = "abcdefghijklmnopqrstuvwxyz0123456789";
		let urls = [];
		for (let letter of letters) {
			urls.push(
				"https://thecocktaildb.com/api/json/v1/1/search.php?f=" + letter
			);
		}

		let requests = urls.map((url) => fetch(url));
		Promise.all(requests)
			.then((responses) => Promise.all(responses.map((item) => item.json())))
			.then((items) => {
				items.forEach((item) => {
					if (item.drinks !== null) each = each.concat(item.drinks);
				});
				for (let cocktail of each) {
					let ingPrice1 = PRICES.hasOwnProperty(cocktail.strIngredient1)
						? PRICES[cocktail.strIngredient1]
						: 3;
					let ingPrice2 = PRICES.hasOwnProperty(cocktail.strIngredient2)
						? PRICES[cocktail.strIngredient2]
						: 3;
					let ingPrice3 = PRICES.hasOwnProperty(cocktail.strIngredient3)
						? PRICES[cocktail.strIngredient3]
						: cocktail.strIngredient3 === null
							? 0
							: 3;
					let ingPrice4 = PRICES.hasOwnProperty(cocktail.strIngredient4)
						? PRICES[cocktail.strIngredient4]
						: cocktail.strIngredient4 === null
							? 0
							: 3;
					let ingPrice5 = PRICES.hasOwnProperty(cocktail.strIngredient5)
						? PRICES[cocktail.strIngredient5]
						: cocktail.strIngredient5 === null
							? 0
							: 3;
					let ingPrice6 = PRICES.hasOwnProperty(cocktail.strIngredient6)
						? PRICES[cocktail.strIngredient6]
						: cocktail.strIngredient6 === null
							? 0
							: 3;
					cocktail.price =
						ingPrice1 +
						ingPrice2 +
						ingPrice3 +
						ingPrice4 +
						ingPrice5 +
						ingPrice6;
				}
				setPopularCocktails([
					each[66],
					each[84],
					each[275],
					each[228],
					each[51],
					each[47],
					each[256],
					each[268],
					each[237],
					each[96],
					each[405],
					each[236],
				]);
				setData(each);
			});

	}, [])

	useEffect(() => {
		if (filteredApi.length) {
			setShow(filteredApi)
		} else if (data.length) {
			setShow(popularCocktails);
		}
	}, [data, popularCocktails, filteredApi]);



	function filterByIngredient(i) {
		setIng(i);
		setHeader("Cocktails Maid of " + i)
		let filtereddata = [];
		for (let cocktail of data) {
			if (
				[
					cocktail.strIngredient1,
					cocktail.strIngredient2,
					cocktail.strIngredient3,
					cocktail.strIngredient4,
				].includes(i)
			) {
				filtereddata = filtereddata.concat(cocktail);
			}
		}
		setShow(filtereddata);
	}

	function popularIngsSwitch() {
		popularIngs ? setPopularIngs(false) : setPopularIngs(true);
	}

	function popularCocktailsSwitch() {
		setHeader("MOST POPULAR COCKTAILS");
		setShow(popularCocktails);
	}

	// const indexOfLastItem = currentPage * itemsPerPage;
	// const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	// const currentItems = show.slice(indexOfFirstItem, indexOfLastItem);
	// const paginate = (pageNumber) => setCurrentPage(pageNumber);

	return (
		<>
			<main>
				<NavBar
					popularIngsSwitch={popularIngsSwitch}
					popularCocktailsSwitch={popularCocktailsSwitch}
				/>
				<div style={{ backgroundColor: "#4052b5" }}>
					<img alt="background" src="/images/cocktailbackground.jpg"/>
				</div>
				{popularIngs && (
					<CustomSwiper filterByIngredient={(i) => filterByIngredient(i)} />
				)}
				<div style={{ backgroundColor: "#4052b5", color: "black" }}>
					<br />
					<Typography variant="h4" align="center" paragraph>
						{header}
					</Typography>
					<Container className={classes.cardGrid} maxWidth="md">
						<Grid container spacing={4}>
							{show.map((card) => (
								<Grid item key={card.idDrink} xs={12} sm={6} md={4}>
									<Card className={classes.card}>
										<CardMedia
											className={classes.cardMedia}
											image={card.strDrinkThumb}
											title={card.strDrink}
											onClick={() => {setSelectItem(card); setDialog1Open(true)}}
										/>
										<CardContent className={classes.cardContent}>
											<Typography gutterBottom variant="h5" component="h2">
												{card.strDrink}
											</Typography>

											<Typography>{card.strCategory}</Typography>
										</CardContent>
										{currentUser && card.strAlcoholic === "Alcoholic" && (
											<Button
												onClick={() => onDouble(card)}
												color="primary"
												variant="outlined"
												style={{ marginLeft: "10px", marginRight: "10px" }}
											>
												{ing
													? "Double <<" + ing + ">>  /+$" + PRICES[ing] + ".00"
													: !NONALCOHOLIC.hasOwnProperty(card.strIngredient1)
														? "Double <<" +
														card.strIngredient1 +
														">>  /+$" +
														PRICES[card.strIngredient1] +
														".00"
														: !NONALCOHOLIC.hasOwnProperty(card.strIngredient2)
															? "Double <<" +
															card.strIngredient2 +
															">>  /+$" +
															PRICES[card.strIngredient2] +
															".00"
															: !NONALCOHOLIC.hasOwnProperty(card.strIngredient3)
																? "Double <<" +
																card.strIngredient3 +
																">>  /+$" +
																PRICES[card.strIngredient3] +
																".00"
																: !NONALCOHOLIC.hasOwnProperty(card.strIngredient4)
																	? "Double <<" +
																	card.strIngredient4 +
																	">>  /+$" +
																	PRICES[card.strIngredient4] +
																	".00"
																	: !NONALCOHOLIC.hasOwnProperty(card.strIngredient5)
																		? "Double <<" +
																		card.strIngredient5 +
																		">>  /+$" +
																		PRICES[card.strIngredient5] +
																		".00"
																		: "Double <<" +
																		card.strIngredient6 +
																		">>  /+$" +
																		PRICES[card.strIngredient6] +
																		".00"}
											</Button>
										)}
										<CardActions>
											{currentUser && (
												<>
													<Button
														onClick={() => onAdd(card)}
														size="small"
														color="primary"
														variant="outlined"
													>
														ADD TO{" "}
														<ShoppingCartIcon
															style={{ paddingLeft: "10px", color: "#6be909" }}
														/>
													</Button>
													<Button
														variant="outlined"
														size="small"
														color="primary"
													>
														Order Now
													</Button>
												</>
											)}
											<Grid item>
												<Typography variant="button">
													${card.price}.00
												</Typography>{" "}
											</Grid>
										</CardActions>
									</Card>
								</Grid>
							))}
						</Grid>
						{/* <br />
					<div>
						<Pages
							itemsPerPage={itemsPerPage}
							totalItems={show.length}
							paginate={paginate}
						/>
					</div> */}
					</Container>
					<ImgDialog
						open={openDlg1Dialog}
						close={() => setDialog1Open(false)}
						data={selectItem}
					/>
				</div>
			</main>
		</>
	);
}

// import React, { useState, useEffect, useContext } from "react";
// import { makeStyles,ImageListItem,Grid,Paper } from "@material-ui/core";
// import { Button, ImageList, ButtonBase } from "@material-ui/core";
// import Typography from "@material-ui/core/Typography";
// import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
// import { CartContext } from "../context/CartContext";
// import { AppBar } from "@material-ui/core";

// const useStyles = makeStyles((theme) => ({
// 	root: {
// 		flexGrow: 1,
// 		backgroundColor: "rgb(245 245 245)",
// 	},
// 	paper: {
// 		padding: theme.spacing(2),
// 		margin: "auto",
// 		maxWidth: 250,
// 	},
// 	image: {
// 		width: 250,
// 		height: 250,
// 	},
// 	img: {
// 		margin: "auto",
// 		display: "block",
// 		maxWidth: "85%",
// 		maxHeight: "85%",
// 		borderRadius: "10%",
// 	},
// }));

// export default function RecipeReviewCard() {
// 	const classes = useStyles();
// 	// const [expanded, setExpanded] = useState(false);
// 	const [data, setData] = useState([]);
// 	const { onAdd } = useContext(CartContext);

// 	useEffect(() => {
// 		fetch(
// 			"https://thecocktaildb.com/api/json/v1/1/search.php?s=margarita")
// 				.then((result) => result.json())
// 			.then((item) => {
// 				setData(item.drinks);
// 			});
// 	},[]);

// 	// const handleExpandClick = () => {
// 	// 	setExpanded(!expanded);
// 	// };

// 	return (
// 		<div className={classes.root}>
// 			<ImageList rowHeight="auto" gap={20} cols={3}>
// 				{data.map((item) => (
// 					<ImageListItem key={item.idDrink}>
// 						<Paper className={classes.paper} elevation={10}>
// 							<Grid item>
// 								<ButtonBase
// 									style={{ borderRadius: "10%" }}
// 									onMouseEnter={(event) =>
// 										(event.target.style.background = "#f50057")
// 									}
// 									onMouseLeave={(event) =>
// 										(event.target.style.background = "white")
// 									}
// 									className={classes.image}
// 								>
// 									<img
// 										className={classes.img}
// 										alt="complex"
// 										src={item.strDrinkThumb}
// 									/>
// 								</ButtonBase>
// 							</Grid>
// 							<Grid item xs={12} sm container>
// 								<Grid item xs container direction="column" spacing={2}>
// 									<Grid item xs>
// 										<Typography color="secondary" variant="h6" gutterBottom>
// 											{item.strDrink}
// 										</Typography>
// 										<Typography variant="body2" gutterBottom>
// 											{item.strCategory}
// 										</Typography>
// 										{/* <Typography variant="body2" color="textSecondary">
// 											ID: 1030114
// 										</Typography> */}
// 									</Grid>
// 									{/* <Grid item>
// 										<Typography variant="body2" style={{ cursor: "pointer" }}>
// 											Remove
// 										</Typography>
// 									</Grid> */}
// 								</Grid>
// 								<Grid item>
// 									<Typography variant="button">$19.00;</Typography>
// 								</Grid>
// 								<Grid item></Grid>
// 							</Grid>
// 							<Button
// 								onClick={() => onAdd(item)}
// 								variant="contained"
// 								color="secondary"
// 							>
// 								Add to{" "}
// 								<ShoppingCartIcon
// 									style={{ paddingLeft: "10px", color: "green" }}
// 								/>
// 							</Button>
// 						</Paper>
// 						<br />
// 					</ImageListItem>
// 				))}
// 			</ImageList>
// 		</div>
// 	);
// }

/*
const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: 10,
		marginLeft: 20,
		marginRight: 20,
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		overflow: 'hidden',
		backgroundColor: theme.palette.background.paper,
	},
	icon: {
		color: 'rgba(255, 255, 255, 0.54)',
	},
	media: {
		width: 300,
		height: 300,
		paddingTop: '56.25%', // 16:9
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},
	avatar: {
		backgroundColor: red[500],
	},
}));

export default function RecipeReviewCard() {
	const classes = useStyles();
	const [expanded, setExpanded] = useState(false);
	const [data,setData] = useState([]);
	 const [cart, setCart, onAdd] = useContext(CartContext);

	useEffect(() => {
		fetch("https://thecocktaildb.com/api/json/v1/1/search.php?s=margarita")
			.then((result) => result.json())
			.then((item) => {
				setData(item.drinks);
			});
	}, []);



	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<div className={classes.root}>
			{data.map((item) => (
				<ImageList key={item.idDrink} gap={50} rowHeight="auto" cols={4}>
					<Card >
						{ <CardHeader
							avatar={
								<Avatar aria-label="recipe" className={classes.avatar}>
									R
								</Avatar>
							}
							action={
								<IconButton aria-label="settings">
									<MoreVertIcon />
								</IconButton>
							}
							title={item.strDrink}
							subheader="September 14, 2016"
						/> }
						<CardMedia
							className={classes.media}
							image={item.strDrinkThumb}
							title={item.strDrink}
						/>
						<CardContent>
							<Typography variant="h5" color="primary" component="p">
								{item.strDrink}
							</Typography>
						</CardContent>
						<CardActions disableSpacing>
							<IconButton aria-label="add to favorites">
								<FavoriteIcon />
							</IconButton>
							<IconButton aria-label="share">
								<ShareIcon />
							</IconButton>
							<IconButton
								className={clsx(classes.expand, {
									[classes.expandOpen]: expanded,
								})}
								onClick={handleExpandClick}
								aria-expanded={expanded}
								aria-label="show more"
								position="absolute"
							>
								<ExpandMoreIcon />
							</IconButton>
						</CardActions>
						<Collapse in={expanded} timeout="auto">
							<CardContent>
								<Typography paragraph>Method:</Typography>
								<Typography paragraph>
									Heat 1/2 cup of the broth in a pot until simmering, add
									saffron and set aside for 10 minutes.
								</Typography>
							</CardContent>
						</Collapse>
					</Card>
				</ImageList>
			))}
		</div>
	);
}*/
