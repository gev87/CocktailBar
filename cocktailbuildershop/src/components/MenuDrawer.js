import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { CartContext } from "../context/CartContext";

const latter = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'v', 'w', 'y', 'z']
// const latter = "abc";

const useStyles = makeStyles((theme) => ({
	list: {
		elevation: 105,
		width: 250,
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
	},
	padding: 0,
}));

export default function MenuDrawer({ open, close }) {
	const classes = useStyles();
	const [itemData, setItemData] = useState([]);
	const { filteredApi, setFilteredApi } = useContext(CartContext);
	const objForMap = {
		alcoholic: ['Alcoholic', "Non alcoholic", "Optional alcohol"],
		category: ['Shot', 'Cocktail', "Ordinary Drink", 'Beer', "Other/Unknown", "Punch / Party Drink", "Coffee / Tea", "Soft Drink", "Homemade Liqueur", 'Cocoa', 'Shake'],
		ingredient: ["Egg yolk", "Sugar", "Milk", "Light rum", "Bourbon", "Vanilla extract", "Salt", "Whipping cream", "Egg white", "Nutmeg"],
		stateYoutube: ['YoutubeVideo']
	}
	const [checkedValue, setCheckedValue] = useState([])
	const transitionDuration = 1000;

	useEffect(() => {
		const temp = [];
		for (let elem of latter) {
			fetch(`https://thecocktaildb.com/api/json/v1/1/search.php?f=${elem}`)
				.then((result) => result.json())
				.then((data) => {
					data.drinks
						? temp.push(...data.drinks)
						: temp.push(...data.drinks.drinks);
					if (elem === "z") {
						setItemData(temp);
					}
				});
		}
	}, []);

	useEffect(() => {
		const result = [];
		for (const objElem of itemData) {
			if (checkedValue.includes('YoutubeVideo') && objElem.strVideo) {
				result.push(objElem)
			}
			for (const [key, value] of Object.entries(objElem)) {
				if (checkedValue.includes(value)) {
					if (!result.length) {
						result.push(objElem)
					}
					if (!Boolean(result.find((element) => (element.idDrink === objElem.idDrink)))) {
						result.push(objElem)
					}
				}
			}
		}
		setFilteredApi(result)
	}, [checkedValue])

	const handleChange = (event) => {
		if (!checkedValue.includes(event.target.name)) {
			setCheckedValue(checkedValue.concat(event.target.name))
		} else {
			setCheckedValue(checkedValue.filter((elem) => (elem !== event.target.name)))
		}
	};
	const list = () => (
		<div className={classes.list} role="presentation">
			<Accordion style={{ margin: 0, padding: 0 }}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1a-content"
					id="panel1a-header"
				>
					<Typography className={classes.heading}>Alcoholic</Typography>
				</AccordionSummary>
				{objForMap.alcoholic.map((elem) => (
					<AccordionDetails style={{ margin: 3, padding: 1 }} key={elem}>
						<Accordion style={{ backgroundColor: "#854587", width: "100%" }}>
							<FormControlLabel
								control={<Checkbox
									checked={checkedValue.includes(elem)}
									onChange={handleChange}
									name={elem} />}
								label={elem}
								style={{ margin: 0, padding: 0 }} />
						</Accordion>
					</AccordionDetails>
				))}
			</Accordion>
			<Accordion style={{ margin: 0, padding: 0 }}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1a-content"
					id="panel1a-header"
				>
					<Typography className={classes.heading}>Category</Typography>
				</AccordionSummary>
				{objForMap.category.map((elem) => (
					<AccordionDetails style={{ margin: 3, padding: 1 }} key={elem}>
						<Accordion style={{ backgroundColor: "#854587", width: "100%" }}>
							<FormControlLabel
								aria-label="Acknowledge"
								onClick={(event) => event.stopPropagation()}
								onFocus={(event) => event.stopPropagation()}
								control={<Checkbox
									checked={checkedValue.includes(elem)}
									onChange={handleChange}
									name={elem} />}
								label={elem}
								style={{ margin: 0, padding: 0 }} />
						</Accordion>
					</AccordionDetails>
				))}
			</Accordion>
			<Accordion style={{ margin: 0, padding: 0 }}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1a-content"
					id="panel1a-header"
				>
					<Typography className={classes.heading}>Ingredient</Typography>
				</AccordionSummary>
				{objForMap.ingredient.map((elem) => (
					<AccordionDetails style={{ margin: 3, padding: 1 }} key={elem}>
						<Accordion style={{ backgroundColor: "#854587", width: "100%" }}>
							<FormControlLabel
								aria-label="Acknowledge"
								onClick={(event) => event.stopPropagation()}
								onFocus={(event) => event.stopPropagation()}
								control={<Checkbox
									checked={checkedValue.includes(elem)}
									onChange={handleChange}
									name={elem} />}
								label={elem}
								style={{ margin: 0, padding: 0 }} />
						</Accordion>
					</AccordionDetails>
				))}
			</Accordion>
			<AccordionDetails style={{ margin: 3, padding: 1 }}>
				<Accordion style={{ backgroundColor: "#854587", width: "100%" }}>
					<FormControlLabel
						control={
							<Checkbox
								checked={checkedValue.includes("YoutubeVideo")}
								onChange={handleChange}
								name="YoutubeVideo"
							// color="primary"
							/>
						}
						label={"YoutubeVideo"}
						style={{ margin: 0, padding: 0 }}
					// cursor={"pointer"}
					/>
				</Accordion>
			</AccordionDetails>
		</div>
	);

	function f() {
		let temp = []
		for (let item of itemData) {
			if (item.strIngredient1) {
				if (!temp.includes(item.strIngredient1)) {
					temp.push(item.strIngredient1)
				}
			}
			if (item.strIngredient2) {
				if (!temp.includes(item.strIngredient2)) {
					temp.push(item.strIngredient2)
				}
			}
			if (item.strIngredient3) {
				if (!temp.includes(item.strIngredient3)) {
					temp.push(item.strIngredient3)
				}
			}
			if (item.strIngredient4) {
				if (!temp.includes(item.strIngredient4)) {
					temp.push(item.strIngredient4)
				}
			}
			if (item.strIngredient5) {
				if (!temp.includes(item.strIngredient5)) {
					temp.push(item.strIngredient5)
				}
			}
			if (item.strIngredient6) {
				if (!temp.includes(item.strIngredient6)) {
					temp.push(item.strIngredient6)
				}
			}
			if (item.strIngredient7) {
				if (!temp.includes(item.strIngredient7)) {
					temp.push(item.strIngredient7)
				}
			}
			if (item.strIngredient8) {
				if (!temp.includes(item.strIngredient8)) {
					temp.push(item.strIngredient8)
				}
			}
			if (item.strIngredient9) {
				if (!temp.includes(item.strIngredient9)) {
					temp.push(item.strIngredient9)
				}
			}
			if (item.strIngredient10) {
				if (!!temp.includes(item.strIngredient10)) {
					temp.push(item.strIngredient10)
				}
			}
			if (item.strIngredient11 ) {
				if (!temp.includes(item.strIngredient11 )) {
					temp.push(item.strIngredient11 )
				}
			}
		}
		return temp
	}


	return (
		<div className={classes.root}>
			<React.Fragment>
				<Drawer
					open={open}
					onClose={close}
					transitionDuration={{
						enter: transitionDuration,
						exit: transitionDuration,
					}}
					variant="temporary"
					PaperProps={{ style: { marginTop: 64, backgroundColor: "#781187" } }}
				>
					{list()}
				</Drawer>
			</React.Fragment>
		</div>
	);
}
