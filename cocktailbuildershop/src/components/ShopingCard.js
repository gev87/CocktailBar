import { useContext, useEffect, useState } from "react";
import Navbar from "./NavBar";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import ImageListItem from "@material-ui/core/ImageListItem";
import ImageListItemBar from "@material-ui/core/ImageListItemBar";
import { makeStyles } from "@material-ui/core/styles";
import ImageList from "@material-ui/core/ImageList";
import RemoveShoppingCartSharpIcon from "@material-ui/icons/RemoveShoppingCartSharp";
import { v4 as uuidv4 } from 'uuid';
import ItemCard from "./context";

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
}));

export default function ShopingCard() {
	const classes = useStyles();
	const {bayItem, setBayItem} = useContext(ItemCard)

	function onRemoveItem(ind) {
		// setCardList(cardList.filter((elem, index) => index !== ind))
		setBayItem(bayItem.filter((elem, index) => index !== ind))
	}

	return (
		<>
			<Navbar />
			<ImageList rowHeight={200} gap={5} cols={6}>
				{bayItem.map((item, index) => (
					<ImageListItem key={uuidv4()}>
						<img src={item.strDrinkThumb} alt={item.strDrink} />
						<ImageListItemBar
							title={item.strDrink}
							subtitle={<span>Category: {item.strCategory}</span>}
							actionIcon={
								<>
									<RemoveShoppingCartSharpIcon
										className={classes.icon}
										onClick={() => onRemoveItem(index)}
									/>
									<IconButton
										aria-label={`info about ${item.strIngredient1}`}
										className={classes.icon}
									></IconButton>
								</>
							}
						/>
					</ImageListItem>
				))}
			</ImageList>
			<h1>This is your shoping card</h1>
		</>
	);
}
