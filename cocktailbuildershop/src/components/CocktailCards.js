import React, { useState, useEffect, useContext } from "react";
import { Button, Card, CardActions, CardContent } from "@material-ui/core";
import { CardMedia, Grid, Typography } from "@material-ui/core";
import { makeStyles, Container, Link } from "@material-ui/core";
import { CartContext } from "../context/CartContext";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{"Copyright © "}
			<Link color="inherit" href="/">
				Cocktail Menu
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	icon: {
		marginRight: theme.spacing(2),
	},
	heroContent: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(8, 0, 6),
	},
	heroButtons: {
		marginTop: theme.spacing(4),
	},
	cardGrid: {
		paddingTop: theme.spacing(8),
		paddingBottom: theme.spacing(8),
	},
	card: {
		height: "100%",
		display: "flex",
		flexDirection: "column",
	},
	cardMedia: {
		paddingTop: "95%", // 16:9
	},
	cardContent: {
		flexGrow: 1,
	},
	footer: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(6),
	},
}));

//const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function CocktailCards() {
	const classes = useStyles();

	const [data, setData] = useState([]);
	const { onAdd } = useContext(CartContext);

	useEffect(() => {
		fetch("https://thecocktaildb.com/api/json/v1/1/search.php?s=margarita")
			.then((result) => result.json())
			.then((item) => {
				setData(item.drinks);
			});
	}, []);
	return (
		<React.Fragment>
			{/* <p>
				<img src="url(/images/login.jpg)" />
			</p>
			 */}
			<main>
				{/* Hero unit */}
				<div className={classes.heroContent}>
					<Container maxWidth="sm">
						<Typography
							component="h1"
							variant="h2"
							align="center"
							color="textPrimary"
							gutterBottom
						>
							Cocktails
						</Typography>
						<Typography
							variant="h5"
							align="center"
							color="textSecondary"
							paragraph
						>
							Something short and leading about the collection below—its
							contents, the creator, etc. Make it short and sweet, but not too
							short so folks don&apos;t simply skip over it entirely.
						</Typography>
					</Container>
				</div>
				<Container className={classes.cardGrid} maxWidth="md">
					<Grid container spacing={4}>
						{data.map((card) => (
							<Grid item key={card.idDrink} xs={12} sm={6} md={4}>
								<Card className={classes.card}>
									<CardMedia
										className={classes.cardMedia}
										image={card.strDrinkThumb}
										title={card.strDrink}
									/>
									<CardContent className={classes.cardContent}>
										<Typography gutterBottom variant="h5" component="h2">
											{card.strDrink}
										</Typography>
										<Typography>{card.strCategory}</Typography>
									</CardContent>
									<CardActions>
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
										<Button size="small" color="primary">
											Edit
										</Button>
										<Grid item>
											<Typography variant="button">$19.00</Typography>{" "}
										</Grid>
									</CardActions>
								</Card>
							</Grid>
						))}
					</Grid>
				</Container>
			</main>
			{/* Footer */}
			<footer className={classes.footer}>
				{/* <Typography variant="h6" align="center" gutterBottom>
					Footer
				</Typography>
				<Typography
					variant="subtitle1"
					align="center"
					color="textSecondary"
					component="p"
				>
					Something here to give the footer a purpose!
				</Typography> */}
				<Copyright />
			</footer>
			{/* End footer */}
		</React.Fragment>
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
