import * as types from './actionTypes';
import { FETCH_CONFIGURATOR } from '../../endpoints/endpoints';
import Req from '../../util/AxiosRequest';

const data = new Req();

export default [];

export function fetchConfigurator() {
	return dispatch => {
		dispatch({ type: types.CONFIGURATOR_INIT });
		return data[FETCH_CONFIGURATOR.method](FETCH_CONFIGURATOR.endpoint())
			.then(response => {
				dispatch({ type: types.CONFIGURATOR_SUCCESS, payload: response.data.calculator });
			})
			.catch(() => {
				dispatch({ type: types.CONFIGURATOR_FAILURE });
			});
	};
}
