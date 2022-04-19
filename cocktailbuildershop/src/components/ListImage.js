import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ItemCard from "../context/context";
import MainContext from "../context/MainContext";
import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "space-around",
		overflow: "hidden",
		backgroundColor: theme.palette.background.paper,
	},
	icon: {
		color: "rgba(255, 255, 255, 0.54)",
	},
	iconlogged: {
		color: 'lightgreen',
	}
}));

export default function TitlebarImageList() {
	const classes = useStyles();
	const [itemData, setItemData] = useState([]);
	const { bayItem, setBayItem } = useContext(ItemCard);
	const { currentUser, logout } = useContext(MainContext);
	const latter = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'v', 'w', 'y', 'z']



	useEffect(() => {
		const asd = []
		for (let elem of latter) {
			fetch(`https://thecocktaildb.com/api/json/v1/1/search.php?f=${elem}`)
				.then((result) => result.json())
				.then((data) => {
					data.drinks? asd.push(...data.drinks) : asd.push(...data.drinks.drinks)
					if (elem === 'z') {
						setItemData(asd)
					}
				});
			}
	}, []);




	console.log(itemData)
	return (
		<div className={classes.root}>
			<ImageList rowHeight={200} gap={5} cols={6}>
				{itemData.map((item) => (
					<ImageListItem key={uuidv4()}>
						<img src={item.strDrinkThumb} alt={item.strDrink} />
						<ImageListItemBar style={{
							height: 40
						}}
							title={item.strDrink}
							subtitle={<span>Category: {item.strCategory}</span>}
							actionIcon={
								<IconButton
									aria-label={`info about ${item.strIngredient1}`}
									className={!currentUser ? classes.icon : classes.iconlogged}
									onClick={() =>
										setBayItem([...bayItem, item])
									}
								>
									<AddShoppingCartIcon />
								</IconButton>
							}
						/>
					</ImageListItem>
				))}
			</ImageList>
		</div>
	);
}



// import React, { useState, useEffect, useContext } from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import ImageList from "@material-ui/core/ImageList";
// import ImageListItem from "@material-ui/core/ImageListItem";
// import ImageListItemBar from "@material-ui/core/ImageListItemBar";
// import IconButton from "@material-ui/core/IconButton";
// import InfoIcon from "@material-ui/icons/Info";
// import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
// import { CartContext } from "../context/CartContext"
// import { Table } from "@material-ui/core";



// const useStyles = makeStyles((theme) => ({
// 	root: {
// 		display: "flex",
// 		flexWrap: "wrap",
// 		justifyContent: "space-around",
// 		overflow: "hidden",
// 		backgroundColor: theme.palette.background.paper,
// 	},
// 	icon: {
// 		color: "rgba(255, 255, 255, 0.54)",
// 	},
// 	image: {
// 		width: 200,
// 		height: 200,
// 	},
// 	img: {
// 		margin: "auto",
// 		display: "block",
// 		maxWidth: "100%",
// 		maxHeight: "100%",
// 	},
// }));

// export default function TitlebarImageList() {
//   const classes = useStyles();
//   const [itemData,setItemData] = useState([]);
// 	const { onAdd } = useContext(CartContext);
   
  


//   useEffect(() => {
//     fetch("https://thecocktaildb.com/api/json/v1/1/search.php?s=margarita")
//       .then((result) => result.json())
//       .then((data) => {
//         setItemData(data.drinks);
//       });
//   },[]);
  


//   return (
// 		<div className={classes.root}>
// 			<ImageList rowHeight={200} gap={4} cols={6}>
// 				{itemData.map((item) => (
// 					<ImageListItem key={item.idDrink}>
// 						<img
// 							src={item.strDrinkThumb}
// 							alt={item.strDrink}
// 							className={classes.img}
// 						/>
// 						<ImageListItemBar
// 							title={item.strDrink}
// 							subtitle={<span>Category: {item.strCategory}</span>}
// 							actionIcon={
// 								<IconButton
// 									aria-label={`info about ${item.strIngredient1}`}
// 									className={classes.icon}
// 									onClick={() => onAdd(item)}
// 								>
// 									<AddShoppingCartIcon color="primary" />
// 								</IconButton>
// 							}
// 						/>
// 					</ImageListItem>
// 				))}
// 			</ImageList>
// 		</div>
// 	);
// }
