import './App.css';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect
} from "react-router-dom";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Portal from "./Portal";

const App = props => {
	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<Redirect to="/signin"/>
				</Route>
				<Route path="/signup">
					<SignUp />
				</Route>
				<Route path="/signin">
					<SignIn />
				</Route>
				<Route path="/portal">
					<Portal />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
