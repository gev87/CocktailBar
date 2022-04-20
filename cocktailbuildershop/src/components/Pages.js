import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@mui/material";


const useStyles = makeStyles((theme) => ({
	root: {
		display:"block",
		"& > *": {
			marginTop: theme.spacing(2),
		},
	},
}));

const Pages = ({ itemsPerPage, totalItems, paginate }) => {
	const pageNumbers = [];
	const classes = useStyles();

	for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
		pageNumbers.push(i);
	}
	return (
		<nav>
			<div className={classes.root}>
				{pageNumbers.map((number) => (
					<Button
						key={number}
						onClick={() => paginate(number)}
						href={"!#" + number}
					>
						{number}
					</Button>
				))}
			</div>
		</nav>
	);
};

export default Pages;
