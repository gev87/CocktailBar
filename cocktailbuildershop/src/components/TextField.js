import React from "react";
import {
	createStyles,
	alpha,
	Theme,
	ThemeProvider,
	withStyles,
	makeStyles,
	createTheme,
} from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import InputLabel from "@material-ui/core/InputLabel";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import { green } from "@material-ui/core/colors";
import { OutlinedInputProps } from "@material-ui/core/OutlinedInput";

const BootstrapInput = withStyles((theme) =>
	createStyles({
		root: {
			"label + &": {
				marginTop: theme.spacing(3),
			},
		},
		input: {
			borderRadius: 4,
			position: "relative",
			backgroundColor: theme.palette.common.white,
			border: "1px solid #ced4da",
			fontSize: 16,
			width: "auto",
			padding: "10px 12px",
			transition: theme.transitions.create(["border-color", "box-shadow"]),
			// Use the system font instead of the default Roboto font.
			fontFamily: [
				"-apple-system",
				"BlinkMacSystemFont",
				'"Segoe UI"',
				"Roboto",
				'"Helvetica Neue"',
				"Arial",
				"sans-serif",
				'"Apple Color Emoji"',
				'"Segoe UI Emoji"',
				'"Segoe UI Symbol"',
			].join(","),
			"&:focus": {
				boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
				borderColor: theme.palette.primary.main,
			},
		},
	})
)(InputBase);

export default function  customInput() {
    const classes = useStyles();

    return (
        <form className={classes.root} noValidate>
             <BootstrapInput  id="bootstrap-input" />
      </form>
    )
}