import * as types from './actionTypes';
import { FETCH_TESTIMONIALS } from '../../endpoints/endpoints';
import Req from '../../util/AxiosRequest';

const data = new Req();

export default [];

export function fetchTestimonials() {
	return dispatch => {
		dispatch({ type: types.TESTIMONIALS_INIT });
		return data[FETCH_TESTIMONIALS.method](FETCH_TESTIMONIALS.endpoint())
			.then(response => {
				dispatch({ type: types.TESTIMONIALS_SUCCESS, payload: response.data.slider });
			})
			.catch(() => {
				dispatch({ type: types.TESTIMONIALS_FAILURE });
			});
	};
}
