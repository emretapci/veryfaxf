import axios from "axios";

export default async () => {
	let res = await axios({
		method: 'get',
		url: process.env.REACT_APP_BACKEND_URL + '/checksession',
		withCredentials: true,
		validateStatus: () => true
	});
	return res.data.user;
}
