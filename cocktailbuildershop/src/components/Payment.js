import React from "react"
import NavBar from "./NavBar";
import Cards from "react-credit-cards";
import { useState } from "react";
import "react-credit-cards/es/styles-compiled.css";
import THEMES from "../consts/THEMES";
import { Button,Container,Input,TextField,Typography } from "@material-ui/core";


export default function Payment() {
	const [number, setNumber] = useState("")
	const [name,setName] = useState("");
	const [cvc,setCvc] = useState("");
	const [expiry, setExpiry] = useState("");
	const [focus,setFocus] = useState("");
	const classes = THEMES();

	return (
		<>
			<NavBar />
			<div
				className={classes.heroContent}
				style={{ color: "#171818", paddingTop: "10px" }}
			>
				<Container maxWidth="sm">
					<Typography
						component="h2"
						variant="h2"
						align="center"
						color="textPrimary"
						gutterBottom
					>
						Payment
					</Typography>
					<Typography
						variant="h5"
						align="center"
						color="textSecondary"
						paragraph
					>
						{" "}
						After buying our cocktails you will get annual free trip around the
						sun
					</Typography>
					<div style={{ paddingBottom: "10px" }} id="PaymentForm">
						<Cards
							cvc={cvc}
							expiry={expiry}
							focused={focus}
							name={name}
							number={number}
						/>
					</div>
					<div style={{ padding: "10px" }}>
						<TextField
							variant="outlined"
							type="tel"
							name="number"
							placeholder="Card Number"
							value={number}
							onChange={(e) => setNumber(e.target.value)}
							onFocus={(e) => setFocus(e.target.name)}
							fullWidth
							style={{ maxLength: "4" }}
						/>
					</div>
					<div style={{ padding: "10px" }}>
						<TextField
							variant="outlined"
							fullWidth
							type="text"
							name="name"
							placeholder="Name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							onFocus={(e) => setFocus(e.target.name)}
						/>
					</div>
					<div style={{ display: "flex", padding: "10px" }}>
						<TextField
							variant="outlined"
							fullWidth
							type="text"
							name="expiry"
							placeholder="MM/YY Expiry"
							value={expiry}
							onChange={(e) => setExpiry(e.target.value)}
							onFocus={(e) => setFocus(e.target.name)}
						/>
						<TextField
							variant="outlined"
							fullWidth
							type="tel"
							name="cvc"
							placeholder="CVC"
							value={cvc}
							onChange={(e) => setCvc(e.target.value)}
							onFocus={(e) => setFocus(e.target.name)}
						/>
					</div>
					<Button fullWidth variant="contained" color="primary">
						Pay Now
					</Button>
				</Container>
			</div>
		</>
	);
  }

  