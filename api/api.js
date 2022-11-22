import axios from "axios";
import { API_KEY } from "@env";

export const api = () => {
	console.log(API_KEY)
	return axios.create({
		baseURL: "https://api.humorapi.com/",
		headers: {
			"x-api-key": API_KEY,
		},
	});
};
