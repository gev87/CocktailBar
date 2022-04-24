import React from "react";
import { makeStyles, Container,Typography } from "@material-ui/core";
import NavBar from "./NavBar";

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PRICES from "../Prices";

const useStyles = makeStyles((theme) => ({
	heroContent: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(8, 0, 6),
	},
}));



function ComboBox() {
  return (
    <Autocomplete
      id="combo-box-demo"
      options={PRICES}
      getOptionLabel={(option) => option}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
    />
  );
}


export default function CocktailBuilder() {
	const classes = useStyles();

	return (
        <>
            
			<NavBar />
			<div className={classes.heroContent}>
				<Container maxWidth="sm">
					<Typography
						component="h1"
						variant="h2"
						align="center"
						color="textPrimary"
						gutterBottom
					>
						Cocktail Builder
                    </Typography>
                    <img style={{width:"50%", paddingLeft:"140px"} }src="/images/cocktail1.jpg" />
					<Typography
						variant="h5"
						align="center"
						color="textSecondary"
						paragraph
					>
						Here is the place where you can try yourself by making personal
						cocktail. Add up to 4 ingridients you want in your cocktail and
						enjoy it.
					</Typography>
				</Container>
            </div>
            <ComboBox></ComboBox>

		</>
	);
}
