import React, { useState } from 'react';
import { Link, AppBar, Toolbar, TextField, Typography, Button, IconButton, Badge, makeStyles } from '@material-ui/core';
import { Phone as PhoneIcon, Menu as MenuIcon, Mail as MailIcon } from '@material-ui/icons';
import SignIn from "./SignIn";
import axios from "axios";
import getSessionUser from "./Session";

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

	const [user, setUser] = useState(null);
	const [sessionChecked, setSessionChecked] = useState(false);

	if (!sessionChecked) {
		setSessionChecked(true);
		getSessionUser().then(user => {
			console.log(user);
			setUser(user);
		});
	}

	if (!user) {
		return <SignIn setUser={setUser} />
	}

	const logout = async () => {
		let res = await axios({
			method: 'delete',
			url: process.env.REACT_APP_BACKEND_URL + '/logout',
			withCredentials: true,
			validateStatus: () => true
		});
		setUser(null);
	}

	return (
		<React.Fragment>
			<AppBar position='static'>
				<Toolbar>
					<Typography variant="h6" className={classes.title}>
						Conversations
						<Badge badgeContent={4} color="secondary">
							<MailIcon />
						</Badge>
					</Typography>
					<Typography variant="h6" className={classes.title}>
						Credits & billing
					</Typography>
					<Typography variant="h6" className={classes.title}>
						<Link color='inherit'>Phone numbers</Link>
						<PhoneIcon />
					</Typography>
					<IconButton aria-label="show 4 new mails" color="inherit">
					</IconButton>
					{user
						? <React.Fragment>
							<Typography color="inherit">{user.email}</Typography>
							<Typography color="inherit">{user.emailApproved ? '[e-mail approved]' : '[e-mail not approved]'}</Typography>
							<Button color="inherit" onClick={logout}>Logout</Button>
						</React.Fragment>
						: null
					}
				</Toolbar>
			</AppBar>
		</React.Fragment>
	);
}