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

const latter = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "v", "w", "y", "z",];
// const latter = "abc";

const useStyles = makeStyles((theme) => ({
	list: {
		elevation: 105,
		width: 210,
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
	},
	accord: {
		margin: 0,
		padding: 0,
		backgroundColor: "#303f9f",
		color: "#ffffff",
		width: "100%",
	},
}));

export default function MenuDrawer({ open, close, itemData}) {
	const classes = useStyles();
	// const [itemData, setItemData] = useState([]);
	const { filteredApi, setFilteredApi } = useContext(CartContext);
	const objForMap = {
		alcoholic: ["Alcoholic", "Non alcoholic", "Optional alcohol"],
		category: ["Shot", "Cocktail", "Ordinary Drink", "Beer", "Other/Unknown", "Punch / Party Drink", "Coffee / Tea", "Soft Drink", "Homemade Liqueur", "Cocoa", "Shake",],
		stateYoutube: ["YoutubeVideo"],
	};
	const [checkedValue, setCheckedValue] = useState([]);
	const transitionDuration = 1000;

	// useEffect(() => {
	// 	const temp = [];
	// 	for (let elem of latter) {
	// 		fetch(`https://thecocktaildb.com/api/json/v1/1/search.php?f=${elem}`)
	// 			.then((result) => result.json())
	// 			.then((data) => {
	// 				data.drinks
	// 					? temp.push(...data.drinks)
	// 					: temp.push(...data.drinks.drinks);
	// 				if (elem === "c") {
	// 					setItemData(temp);
	// 				}
	// 			});
	// 	}
	// }, []);


	useEffect(() => {
		const result = [];
		let youtube = 'YoutubeVideo'
		console.log(youtube)
		for (const objElem of itemData) {
			if (checkedValue.includes('YoutubeVideo')) {
				youtube = objElem.strVideo
			}
			for (let i = 0; i < checkedValue.length; i++) {

				if ((checkedValue.includes('Alcoholic') || checkedValue.includes('Non alcoholic') || checkedValue.includes('Optional alcohol')) && checkedValue.length === 1) {
					// console.log(-1)
					if (Object.values(objElem).includes(checkedValue[i])) {
						if (!Boolean(result.find((element) => element.idDrink === objElem.idDrink))) {
							result.push(objElem);
						}
					}

				}
				if (!checkedValue.includes('Alcoholic') && !checkedValue.includes('Non alcoholic') && !checkedValue.includes('Optional alcohol') && checkedValue.length) {
					// console.log(0)
					if (Object.values(objElem).includes(checkedValue[i])) {
						if (!Boolean(result.find((element) => element.idDrink === objElem.idDrink))) {
							result.push(objElem);
						}
					}

				}
				if (checkedValue.includes('Alcoholic') && checkedValue.includes('Non alcoholic') && checkedValue.includes('Optional alcohol') && youtube) {
					// console.log(1)
					if (youtube !== "YoutubeVideo") {
						if (!Boolean(result.find((element) => element.idDrink === objElem.idDrink))) {
							result.push(objElem);
						}
					}
					if (checkedValue.length === 3) {
						setFilteredApi(itemData)
						return
					}
				}
				if (checkedValue.includes('Alcoholic') && checkedValue.includes('Non alcoholic') || checkedValue.includes('Alcoholic') && checkedValue.includes('Optional alcohol') || checkedValue.includes('Non alcoholic') && checkedValue.includes('Optional alcohol')) {
					// console.log(2)
					if (checkedValue.length === 2) {
						if (Object.values(objElem).includes(checkedValue[0]) || Object.values(objElem).includes(checkedValue[1])) {
							// console.log('ok')
							if (!Boolean(result.find((element) => element.idDrink === objElem.idDrink))) {
								result.push(objElem);
							}
						}
					}
				}

				if (checkedValue.includes('Alcoholic') && !checkedValue.includes('Non alcoholic') && !checkedValue.includes('Optional alcohol')) {
					// console.log(3)youtube
					if (Object.values(objElem).includes('Alcoholic')) {
						if (Object.values(objElem).includes(checkedValue[i]) && checkedValue[i] !== 'Alcoholic') {
							if (!Boolean(result.find((element) => element.idDrink === objElem.idDrink))) {
								result.push(objElem);
							}
						}
					}
				}
				if (!checkedValue.includes('Alcoholic') && checkedValue.includes('Non alcoholic') && !checkedValue.includes('Optional alcohol')) {
					// console.log(4)
					if (Object.values(objElem).includes('Non alcoholic')) {
						if (Object.values(objElem).includes(checkedValue[i]) && checkedValue[i] !== 'Non alcoholic') {
							if (!Boolean(result.find((element) => element.idDrink === objElem.idDrink))) {
								result.push(objElem);
							}
						}
					}
				}
				if (!checkedValue.includes('Alcoholic') && !checkedValue.includes('Non alcoholic') && checkedValue.includes('Optional alcohol')) {
					// console.log(5)
					if (Object.values(objElem).includes('Optional alcohol')) {
						if (Object.values(objElem).includes(checkedValue[i]) && checkedValue[i] !== 'Optional alcohol') {
							if (!Boolean(result.find((element) => element.idDrink === objElem.idDrink))) {
								result.push(objElem);
							}
						}
					}
				}
				if (checkedValue.includes('Alcoholic') && checkedValue.includes('Non alcoholic') && !checkedValue.includes('Optional alcohol')) {
					// console.log(6)
					if (Object.values(objElem).includes('Alcoholic') || Object.values(objElem).includes('Non alcoholic')) {
						if ((Object.values(objElem).includes(checkedValue[i]) && checkedValue[i] !== 'Alcoholic') &&
							(Object.values(objElem).includes(checkedValue[i]) && checkedValue[i] !== 'Non alcoholic')) {
							if (!Boolean(result.find((element) => element.idDrink === objElem.idDrink))) {
								result.push(objElem);
							}
						}
					}
				}
				if (checkedValue.includes('Alcoholic') && !checkedValue.includes('Non alcoholic') && checkedValue.includes('Optional alcohol')) {
					// console.log(7)
					if (Object.values(objElem).includes('Alcoholic') || Object.values(objElem).includes('Optional alcohol')) {
						if ((Object.values(objElem).includes(checkedValue[i]) && checkedValue[i] !== 'Alcoholic') &&
							(Object.values(objElem).includes(checkedValue[i]) && checkedValue[i] !== 'Optional alcohol')) {
							if (!Boolean(result.find((element) => element.idDrink === objElem.idDrink))) {
								result.push(objElem);
							}
						}
					}
				}
				if (!checkedValue.includes('Alcoholic') && checkedValue.includes('Non alcoholic') && checkedValue.includes('Optional alcohol')) {
					// console.log(8)
					if (Object.values(objElem).includes('Non alcoholic') || Object.values(objElem).includes('Optional alcohol')) {
						if ((Object.values(objElem).includes(checkedValue[i]) && checkedValue[i] !== 'Non alcoholic') &&
							(Object.values(objElem).includes(checkedValue[i]) && checkedValue[i] !== 'Optional alcohol')) {
							if (!Boolean(result.find((element) => element.idDrink === objElem.idDrink))) {
								result.push(objElem);
							}
						}
					}
				}
				if (checkedValue.includes('Alcoholic') && checkedValue.includes('Non alcoholic') && checkedValue.includes('Optional alcohol')) {
					// console.log(9)
					if (Object.values(objElem).includes('Alcoholic') || Object.values(objElem).includes('Non alcoholic') || Object.values(objElem).includes('Optional alcohol')) {
						if ((Object.values(objElem).includes(checkedValue[i]) && checkedValue[i] !== 'Alcoholic') &&
							(Object.values(objElem).includes(checkedValue[i]) && checkedValue[i] !== 'Non alcoholic') &&
							(Object.values(objElem).includes(checkedValue[i]) && checkedValue[i] !== 'Optional alcohol')) {
							if (!Boolean(result.find((element) => element.idDrink === objElem.idDrink))) {
								result.push(objElem);
							}
						}
					}
				}
			}
		}
		setFilteredApi(result);
	}, [checkedValue]);

	// console.log(checkedValue, filteredApi)


	const handleChange = (event) => {
		if (!checkedValue.includes(event.target.name)) {
			setCheckedValue(checkedValue.concat(event.target.name));
		} else {
			setCheckedValue(
				checkedValue.filter((elem) => elem !== event.target.name)
			);
		}
	};
	const list = () => (
		<div className={classes.list}>
			<Accordion className={classes.accord}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1a-content"
					id="panel1a-header"
				>
					<Typography className={classes.heading}>Alcoholic</Typography>
				</AccordionSummary>
				{objForMap.alcoholic.map((elem) => (
					<AccordionDetails style={{ margin: 3, padding: 1 }} key={elem}>
						<Accordion className={classes.accord}>
							<FormControlLabel
								control={
									<Checkbox
										checked={checkedValue.includes(elem)}
										onChange={handleChange}
										name={elem}
										style={{ color: 'white' }}
									/>
								}
								label={elem}
								style={{ margin: 0, padding: 0 }}
							/>
						</Accordion>
					</AccordionDetails>
				))}
			</Accordion>
			<Accordion className={classes.accord}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon style={{}} />}
					aria-controls="panel1a-content"
					id="panel1a-header"
				>
					<Typography className={classes.heading}>Category</Typography>
				</AccordionSummary>
				{objForMap.category.map((elem) => (
					<AccordionDetails style={{ margin: 3, padding: 1 }} key={elem}>
						<Accordion className={classes.accord}>
							<FormControlLabel
								aria-label="Acknowledge"
								onClick={(event) => event.stopPropagation()}
								onFocus={(event) => event.stopPropagation()}
								control={
									<Checkbox
										checked={checkedValue.includes(elem)}
										onChange={handleChange}
										name={elem}
										style={{ color: 'white' }}
									/>
								}
								label={elem}
								style={{ margin: 0, padding: 0 }}
							/>
						</Accordion>
					</AccordionDetails>
				))}
			</Accordion>
			<AccordionDetails style={{ margin: 3, padding: 1 }}>
				<Accordion className={classes.accord}>
					<FormControlLabel
						control={
							<Checkbox
								checked={checkedValue.includes("YoutubeVideo")}
								onChange={handleChange}
								name="YoutubeVideo"
								style={{ color: 'white' }}
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
	const filterResult = () => (
		<div className={classes.list} style={{ height: 20 }} >
			<Accordion className={classes.accord} >
				<Typography
					className={classes.heading}
					style={{
						color: 'rgb(240, 150, 210)',
						textAlign: 'right', paddingRight: 5
					}}
				>
					Filtered {filteredApi.length === 1 ? 'item' : 'items'} {filteredApi.length} in {itemData.length}.
				</Typography>
			</Accordion>
		</div>
	);
	const clearFilter = () => (
		<div>
			<AccordionSummary
				style={{
					padding: 0,
					position: 'fixed',
					left: '120px'
				}}
			>
				<Typography className={classes.heading} onClick={() => setCheckedValue([])}>Clear Filter</Typography>
			</AccordionSummary>
		</div>
	)

	// function f() {
	// 	let temp = []
	// 	for (let item of itemData) {
	// 		if (item.strIngredient1) {
	// 			if (!temp.includes(item.strIngredient1)) {
	// 				temp.push(item.strIngredient1)
	// 			}
	// 		}
	// 		if (item.strIngredient2) {
	// 			if (!temp.includes(item.strIngredient2)) {
	// 				temp.push(item.strIngredient2)
	// 			}
	// 		}
	// 		if (item.strIngredient3) {
	// 			if (!temp.includes(item.strIngredient3)) {
	// 				temp.push(item.strIngredient3)
	// 			}
	// 		}
	// 		if (item.strIngredient4) {
	// 			if (!temp.includes(item.strIngredient4)) {
	// 				temp.push(item.strIngredient4)
	// 			}
	// 		}
	// 		if (item.strIngredient5) {
	// 			if (!temp.includes(item.strIngredient5)) {
	// 				temp.push(item.strIngredient5)
	// 			}
	// 		}
	// 		if (item.strIngredient6) {
	// 			if (!temp.includes(item.strIngredient6)) {
	// 				temp.push(item.strIngredient6)
	// 			}
	// 		}
	// 		if (item.strIngredient7) {
	// 			if (!temp.includes(item.strIngredient7)) {
	// 				temp.push(item.strIngredient7)
	// 			}
	// 		}
	// 		if (item.strIngredient8) {
	// 			if (!temp.includes(item.strIngredient8)) {
	// 				temp.push(item.strIngredient8)
	// 			}
	// 		}
	// 		if (item.strIngredient9) {
	// 			if (!temp.includes(item.strIngredient9)) {
	// 				temp.push(item.strIngredient9)
	// 			}
	// 		}
	// 		if (item.strIngredient10) {
	// 			if (!!temp.includes(item.strIngredient10)) {
	// 				temp.push(item.strIngredient10)
	// 			}
	// 		}
	// 		if (item.strIngredient11 ) {
	// 			if (!temp.includes(item.strIngredient11 )) {
	// 				temp.push(item.strIngredient11 )
	// 			}
	// 		}
	// 	}
	// 	return temp
	// }
	// console.log(f())

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
					PaperProps={{
						style: { marginTop: 84.4, backgroundColor: "#303f9f" },
					}}
				>
					{checkedValue.length ? filterResult() : ''}
					{list()}
					{checkedValue.length ? clearFilter() : ''}
				</Drawer>
			</React.Fragment>
		</div>
	);
}
