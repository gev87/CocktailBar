import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LockIcon from '@material-ui/icons/Lock';
import InputIcon from '@material-ui/icons/Input';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const StyledMenu = withStyles({
	paper: {
		border: '1px solid #d3d4d5',
	},
})((props) => (
	<Menu
		elevation={0}
		getContentAnchorEl={null}
		anchorOrigin={{
			vertical: 'bottom',
			horizontal: 'center',
		}}
		transformOrigin={{
			vertical: 'top',
			horizontal: 'center',
		}}
		{...props}
	/>
));

const StyledMenuItem = withStyles((theme) => ({
	root: {
		'&:focus': {
			backgroundColor: theme.palette.primary.main,
		},
		// padding: 0,
	},
}))(MenuItem);

export default function LoginSignUp() {
	const [anchorEl, setAnchorEl] = useState(null);
	const [openLD, setOpenLD] = useState(false);
	const [openSD, setOpenSD] = useState(false);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	const LoginDialog = () => {

		const handleClose = () => {
			setOpenLD(false);
		};

		return (
			<div>
				<Dialog open={openLD} onClose={handleClose} aria-labelledby="form-dialog-title">
					<DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
					<DialogContent>
						<DialogContentText>
							Login Dialog
						</DialogContentText>
						<TextField
							autoFocus
							margin="dense"
							id="name"
							label="Email Address"
							type="email"
							fullWidth
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color="primary">
							Cancel
						</Button>
						<Button onClick={handleClose} color="primary">
							Subscribe
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
	const SignUpDialog = () => {

		const handleClose = () => {
			setOpenSD(false)
		};

		return (
			<div>
				<Dialog open={openSD} onClose={handleClose} aria-labelledby="form-dialog-title">
					<DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
					<DialogContent>
						<DialogContentText>
							SignUp Dialog
						</DialogContentText>
						<TextField
							autoFocus
							margin="dense"
							id="name"
							label="Email Address"
							type="email"
							fullWidth
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color="primary">
							Cancel
						</Button>
						<Button onClick={handleClose} color="primary">
							Subscribe
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}

	return (
		<div>
			<Button
				//   aria-controls="customized-menu"
				//   aria-haspopup="true"
				// variant="contained"
				color="primary"
				variant="outlined"
				size="small"
				onClick={handleClick}
			>
				Buy
			</Button>
			<StyledMenu
				// id="customized-menu"
				anchorEl={anchorEl}
				// keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<StyledMenuItem onClick={() => { setOpenLD(true); handleClose() }}>
					<ListItemIcon>
						<InputIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText primary="Login" />
				</StyledMenuItem>
				<StyledMenuItem onClick={() => { setOpenSD(true); handleClose() }}>
					<ListItemIcon>
						<LockIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText primary="SignUp" />
				</StyledMenuItem>
			</StyledMenu>
			<LoginDialog />
			<SignUpDialog/>
		</div>
	);
}

