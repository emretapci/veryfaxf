import './App.css';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
	Link
} from "react-router-dom";
import Signup from "./SignUp";

const App = props => {
	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<Redirect to="/signup"/>
				</Route>
				<Route path="/signup">
					<Signup />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
