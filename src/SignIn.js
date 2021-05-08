import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link, Grid, TextField, Container, Typography, makeStyles } from '@material-ui/core';
import Copyright from './Copyright';
import Session from "./Session";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default props => {
	const classes = useStyles();

	const [user, setUser] = useState();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [loggedIn, setLoggedIn] = useState(false);
	const [errorText, setErrorText] = useState([]);

	const signIn = async () => {
		let res = await axios({
			method: 'post',
			url: process.env.REACT_APP_BACKEND_URL + '/login',
			withCredentials: true,
			data: {
				email, password
			},
			validateStatus: () => true
		});

		let errorText2 = [];
		switch (res.status) {
			case 200:
				setUser(res.data.user);
				setLoggedIn(true);
				setErrorText([]);
				break;
			case 401:
				errorText2.push(`Invalid password.`);
				errorText2.push(<Link>Forgot password?</Link>)
				setErrorText(errorText2);
				break;
			case 404:
				errorText2 = [];
				errorText2.push(`User with e-mail ${email} not found.`);
				setErrorText(errorText2);
				break;
		}
	}

	const signUp = () => {
		props.setPage('SignUp');
		return;
	}

	if (loggedIn) {
		props.setUser(user);
		return <Redirect to='/portal' />
	}

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
        		</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								onChange={event => setEmail(event.target.value)}
								onKeyPress={event => event.key == 'Enter' && signIn()}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
								onChange={event => setPassword(event.target.value)}
								onKeyPress={event => event.key == 'Enter' && signIn()}
							/>
						</Grid>
						<Grid item xs={12}>
							{errorText && errorText.length > 0 ?
								errorText.map(e => (
									<Typography align="center" color="error">
										{e}
									</Typography>
								))
								: null
							}
						</Grid>
					</Grid>
					<Button
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={signIn}
					>
						Sign In
         			</Button>
					<Grid container justify="flex-end">
						<Grid item>
							<Link onClick={signUp}>
								Not registered? Sign up
            				</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			<Box mt={5}>
				<Copyright />
			</Box>
		</Container>
	);
}