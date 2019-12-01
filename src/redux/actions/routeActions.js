import * as types from './actionTypes';
import { FETCH_ROUTES } from '../../endpoints/endpoints';
import Req from '../../util/AxiosRequest';

const data = new Req();

export default [];

export function fetchRoutes() {
	return dispatch => {
		dispatch({ type: types.ROUTES_INIT });
		return data[FETCH_ROUTES.method](FETCH_ROUTES.endpoint())
			.then(response => {
				dispatch({ type: types.ROUTES_SUCCESS, payload: response.data.menu.items });
			})
			.catch(() => {
				dispatch({ type: types.ROUTES_FAILURE });
			});
	};
}
