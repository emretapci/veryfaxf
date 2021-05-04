import React, { useState } from 'react';
import Drawer from '@material-ui/core/Drawer'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PhoneIcon from '@material-ui/icons/Phone';

const useStyles = makeStyles((theme) => ({
}));

export default props => {
	const classes = useStyles();

	return (
		<Drawer anchor='left' open='true'>
			<List>
				{['+1 576 5847384', '+1 645 2544356'].map((text, index) => (
					<ListItem button key={text}>
						<ListItemIcon>
							<PhoneIcon/>
						</ListItemIcon>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
		</Drawer>
	);
}