import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Phone as PhoneIcon, Menu as MenuIcon } from '@material-ui/icons';
import axios from "axios";
import { AppBar, Toolbar, Button, IconButton, Typography } from '@material-ui/core';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}));

export default props => {
	const classes = useStyles();

	const [loggedIn, setLoggedIn] = useState(true);

	const logout = async () => {
		let res = await axios({
			method: 'delete',
			url: process.env.REACT_APP_BACKEND_URL + '/logout',
			withCredentials: true,
			validateStatus: () => true
		});
		setLoggedIn(false);
	}

	if (!loggedIn) {
		props.setUser(null);
		return <div/>;
	}

	return (
		<React.Fragment>
			<AppBar position='static'>
				<Toolbar>
					<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" className={classes.title}>
						News
    				</Typography>
					<Typography color="inherit">{props.user.email}</Typography>
					<Typography color="inherit">{props.user.emailApproved ? '[e-mail approved]' : '[e-mail not approved]'}</Typography>
					<Button color="inherit" onClick={logout}>Logout</Button>
				</Toolbar>
			</AppBar>
		</React.Fragment>
	);
}