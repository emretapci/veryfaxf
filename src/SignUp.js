import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from './Copyright';
import axios from "axios";
import { Redirect } from 'react-router-dom';

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

export default function SignUp() {
	const classes = useStyles();

	const [firstName, setFirstName] = useState();
	const [lastName, setLastName] = useState();
	const [email, setEmail] = useState();
	const [password1, setPassword1] = useState();
	const [password2, setPassword2] = useState();
	const [passwordsMatch, setPasswordsMatch] = useState(true);
	const [loggedIn, setLoggedIn] = useState(false);

	useEffect(() => setPasswordsMatch(password1 == password2), [password1, password2]);

	const signUp = async () => {
		let res = await axios({
			method: 'post',
			url: process.env.REACT_APP_BACKEND_URL + '/login',
			withCredentials: true,
			data: {
				firstName, lastName, email, password: password1
			}
		});

		if (res.status == 200)
			setLoggedIn(true);
	}

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign up
        		</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete="fname"
								name="firstName"
								variant="outlined"
								required
								fullWidth
								id="firstName"
								label="First Name"
								autoFocus
								onChange={event => setFirstName(event.target.value)}
								onKeyPress={event => event.key == 'Enter' && signUp()}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="lastName"
								label="Last Name"
								name="lastName"
								autoComplete="lname"
								onChange={event => setLastName(event.target.value)}
								onKeyPress={event => event.key == 'Enter' && signUp()}
							/>
						</Grid>
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
								onKeyPress={event => event.key == 'Enter' && signUp()}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="password1"
								label="Password"
								type="password"
								id="password1"
								autoComplete="new-password"
								onChange={event => setPassword1(event.target.value)}
								onKeyPress={event => event.key == 'Enter' && signUp()}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="password2"
								label="Repeat Password"
								type="password"
								id="password2"
								autoComplete="repeat-password"
								onChange={event => setPassword2(event.target.value)}
								onKeyPress={event => event.key == 'Enter' && signUp()}
							/>
						</Grid>
						<Grid item xs={12}>
							{!passwordsMatch ?
								<Typography align="center" color="error">
									Passwords do not match
								</Typography>
								: null
							}
						</Grid>
					</Grid>
					<Button
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={signUp}
					>
						Sign Up
         			</Button>
					<Grid container justify="flex-end">
						<Grid item>
							<Link href="/signin" variant="body2">
								Already have an account? Sign in
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