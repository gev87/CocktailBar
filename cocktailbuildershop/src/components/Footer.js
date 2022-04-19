import { Link, makeStyles, Typography } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
	footer: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(6),
	},
}));

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


export default function Footer() {
	const classes = useStyles();
	return (
		<div>
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
		</div>
	)
}