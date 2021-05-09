import React, { useState, useEffect } from 'react';
import SignIn from "./SignIn";
import Portal from "./Portal";
import getSessionUser from "./Session";

const App = props => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		getSessionUser().then(user => {
			setUser(user);
		});
	}, []);

	if (user) {
		return <Portal user={user} setUser={setUser} />
	}
	else {
		return <SignIn setUser={setUser} />
	}
}

export default App;
