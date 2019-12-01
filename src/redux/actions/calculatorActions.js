import * as types from './actionTypes';
import { GET_ALL } from '../../endpoints/endpoints';
import Req from '../../util/AxiosRequest';

const data = new Req();

export default [];

export function fetchStuff() {
	return dispatch => {
		dispatch({ type: types.CALCULATOR_INIT });
		return data[GET_ALL.method](GET_ALL.endpoint())
			.then(response => {
				dispatch({ type: types.CALCULATOR_SUCCESS, payload: response.data.results });
			})
			.catch(() => {
				dispatch({ type: types.CALCULATOR_FAILURE });
			});
	};
}
