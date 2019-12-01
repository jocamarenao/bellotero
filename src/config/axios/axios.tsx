import axios from 'axios';
import { SYSTEM_ALERT } from '../../settings/Errors';
import Alert from '../../util/Alert';

const alert = new Alert();
const configInstance = { baseURL: process.env.REACT_APP_BASE_URL };

const instances = {
	api: axios.create(configInstance),
};

function handleError(error: any) {
	const { status } = error;
	if (SYSTEM_ALERT.includes(status)) {
		alert.toast('error', 'Internal error', {});
	}
}

export const getURLParams = function getURLParams(query: any) {
	const payload = query;
	if (typeof query !== 'object') {
		return '';
	}
	const response = Object.keys(query)
		.map(item => `${item}=${encodeURIComponent(payload[item])}`)
		.join('&');
	return `?${response}`;
};

instances.api.interceptors.response.use(
	(response: any) => response,
	error => {
		handleError(error.response);
		return Promise.reject(error.response);
	}
);

export const { api } = instances;
export default instances;
