import React, { useState, useEffect } from 'react';
import axios from "axios";
import { ShoppingCart as ShoppingCartIcon } from '@material-ui/icons';
import {
	Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
	TextField, List, ListItem, ListItemText, Typography, Select, MenuItem, Button
} from '@material-ui/core';

export default props => {
	const [countryCodes, setCountryCodes] = useState([]);
	const [countryCode, setCountryCode] = useState('');
	const [areaCode, setAreaCode] = useState('');
	const [prefix, setPrefix] = useState('');
	const [availableNumbers, setAvailableNumbers] = useState([]);
	const [askToBuyNumberDialogOpened, setAskToBuyNumberDialogOpened] = React.useState(false);
	const [numberToBuy, setNumberToBuy] = React.useState('');

	useEffect(() => {
		axios({
			method: 'get',
			url: process.env.REACT_APP_BACKEND_URL + '/fax/countryCodes',
			withCredentials: true,
			validateStatus: () => true
		}).then(res => {
			setCountryCodes(res.data);
			setCountryCode(res.data[0]);
		});
	}, []);

	const getAvailableNumbers = () => {
		axios({
			method: 'post',
			url: process.env.REACT_APP_BACKEND_URL + '/fax/availableNumbers',
			withCredentials: true,
			data: {
				countryCode,
				areaCode,
				prefix
			},
			validateStatus: () => true
		}).then(res => {
			setAvailableNumbers(res.data);
		});
	}

	const buyNumber = () => {
		axios({
			method: 'post',
			url: process.env.REACT_APP_BACKEND_URL + '/fax/buyNumber',
			withCredentials: true,
			data: {
				number: numberToBuy
			},
			validateStatus: () => true
		}).then(res => {
			//TODO
		});
		setAskToBuyNumberDialogOpened(false);
	}

	return (
		<div>
			<form>
				<Typography>Select country</Typography>
				<Select id='country-code' value={countryCode} onChange={event => setCountryCode(event.target.value)}>
					{
						countryCodes.map(cc => (
							<MenuItem key={cc} value={cc}>{cc}</MenuItem>
						))
					}
				</Select>
				<Typography>Area code</Typography>
				<TextField onChange={event => setAreaCode(event.target.value)}></TextField>
				<Typography>Prefix</Typography>
				<TextField onChange={event => setPrefix(event.target.value)}></TextField>
			</form>
			<Button variant='contained' color='primary' onClick={getAvailableNumbers}>available numbers</Button>
			<List component='nav'>
				{availableNumbers.map(n => (
					<ListItem button key={n.phone_number} onClick={() => {
						setNumberToBuy(n.phone_number);
						setAskToBuyNumberDialogOpened(true);
					}}>
						<ShoppingCartIcon />
						<ListItemText primary={n.phone_number} />
					</ListItem>
				))}
			</List>
			<Dialog open={askToBuyNumberDialogOpened} onClose={() => setAskToBuyNumberDialogOpened(false)}>
				<DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Are you sure you want to buy this number? {numberToBuy}
        			</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setAskToBuyNumberDialogOpened(false)} color="primary">
						Cancel
          			</Button>
					<Button onClick={buyNumber} color="primary" autoFocus>
						Buy
          			</Button>
				</DialogActions>
			</Dialog>
		</div >
	);
}