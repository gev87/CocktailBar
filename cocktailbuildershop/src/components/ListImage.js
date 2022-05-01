import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";
import IconButton from "@material-ui/core/IconButton";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import MainContext from "../context/MainContext";
import ImgDialog from "./ImgDialog";
import { CartContext } from "../context/CartContext";
import { v4 as uuidv4 } from 'uuid';

// const latter = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'v', 'w', 'y', 'z']
// const latter = "abc";
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
		color: "lightgreen",
	},
}));

export default function TitlebarImageList() {
	const classes = useStyles();
	// const [itemData, setItemData] = useState([]);
	const { filteredApi, setFilteredApi } = useContext(CartContext);
	const { currentUser, logout } = useContext(MainContext);
	const [selectItem, setSelectItem] = useState("");
	const [openDlg1Dialog, setDialog1Open] = useState(false);


	console.log(filteredApi)
	// useEffect(() => {
	// 	const asd = [];
	// 	for (let elem of latter) {
	// 		fetch(`https://thecocktaildb.com/api/json/v1/1/search.php?f=${elem}`)
	// 		// fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${elem}`)
	// 			.then((result) => result.json())
	// 			.then((data) => {
	// 				data.drinks
	// 					? asd.push(...data.drinks)
	// 					: asd.push(...data.drinks.drinks);
	// 				if (elem === "z") {
	// 					// console.log(latter[elem])
	// 					setItemData(asd);
	// 				}
	// 			});
	// 	}
	// }, []);
	// console.log(itemData)
	// const categoryArr = [];s
// console.log(categoryArr)

	return (
		<div className={classes.root}>
			<ImageList rowHeight={200} gap={5} cols={6}>
				{filteredApi.map((item) => {
				
					return (
					<ImageListItem key={item.idDrink}>
						<img
							src={item.strDrinkThumb}
							alt={item.strDrink}
							onClick={() => {setSelectItem(item); setDialog1Open(true)}}
						/>
						<ImageListItemBar
							style={{
								height: 40,
							}}
							title={item.strDrink}
							subtitle={<span>Category: {item.strCategory}</span>}
							actionIcon={
								<IconButton
									aria-label={`info about ${item.strIngredient1}`}
									className={!currentUser ? classes.icon : classes.iconlogged}
								>
									<AddShoppingCartIcon />
								</IconButton>
							}
						/>
						
					</ImageListItem>
					
				)})}
			</ImageList>
			<ImgDialog
				open={openDlg1Dialog}
				close={() => setDialog1Open(false)}
				data={selectItem}
			/>
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
