import React, { useContext } from "react";
import { makeStyles, ImageListItem, Typography } from "@material-ui/core";
import { ButtonBase, Button, ImageList, Grid, Paper } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { CartContext } from "../context/CartContext";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import NavBar from "./NavBar";
import Basket from "./Basket"

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: "rgb(245 245 245)",
	},
	paper: {
		padding: theme.spacing(2),
		margin: "auto",
		maxWidth: 250,
	},
	image: {
		width: 250,
		height: 250,
	},
	img: {
		margin: "auto",
		display: "block",
		maxWidth: "85%",
		maxHeight: "85%",
		borderRadius: "10%",
	},
}));

export default function RecipeReviewCard() {
	const classes = useStyles();
	// const [expanded, setExpanded] = useState(false);
	const { cart, onAdd, onRemove } = useContext(CartContext);
	let price = 19 ;

	// const handleExpandClick = () => {
	// 	setExpanded(!expanded);
	// };

	return (
		<div className={classes.root}>
			<Basket/>
			<NavBar />
			<ImageList rowHeight="auto" gap={20} cols={3}>
				{cart.map((item) => (
					<ImageListItem key={item.idDrink}>
						<Paper className={classes.paper} elevation={10}>
							<Grid item>
								<ButtonBase
									style={{ borderRadius: "10%" }}
									onMouseEnter={(event) =>
										(event.target.style.background = "#f50057")
									}
									onMouseLeave={(event) =>
										(event.target.style.background = "white")
									}
									className={classes.image}
								>
									<img
										className={classes.img}
										alt="complex"
										src={item.strDrinkThumb}
									/>
								</ButtonBase>
							</Grid>
							<Grid item xs={12} sm container>
								<Grid item xs container direction="column" spacing={2}>
									<Grid item xs>
										<Typography color="secondary" variant="h6" gutterBottom>
											{item.strDrink}
										</Typography>
										<Typography variant="body2" gutterBottom>
											{item.strCategory}
										</Typography>
										{/* <Typography variant="body2" color="textSecondary">
											ID: 1030114
										</Typography> */}
									</Grid>
									{/* <Grid item>
										<Typography variant="body2" style={{ cursor: "pointer" }}>
											Remove
										</Typography>
									</Grid> */}
								</Grid>
								<Grid item>
									<Typography variant="button">
										${(item.qty * price).toFixed(2)}
									</Typography>
								</Grid>
								<Grid item></Grid>
							</Grid>
							<Typography style={{ color: "green" }} variant="h6">
								<Button
									onClick={() => {
										onAdd(item);
									}}
									variant="contained"
									color="secondary"
									style={{ color: "green" }}
								>
									{" "}
									<ShoppingCartIcon
										style={{ paddingLeft: "10px", color: "green" }}
									/>
									+
								</Button>

								{" " + item.qty + " "}

								<Button
									onClick={() => onRemove(item)}
									variant="contained"
									color="secondary"
									style={{ color: "yellow" }}
								>
									{" "}
									-
									<RemoveShoppingCartIcon
										style={{ paddingLeft: "10px", color: "yellow" }}
									/>
									
								</Button>
							</Typography>
						</Paper>
						<br />
					</ImageListItem>
				))}
			</ImageList>
		</div>
	);
}

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
