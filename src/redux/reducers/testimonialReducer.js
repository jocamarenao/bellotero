import { TESTIMONIALS_INIT, TESTIMONIALS_SUCCESS, TESTIMONIALS_FAILURE } from '../actions/actionTypes';

const initialState = {
	data: [],
	isLoading: true,
	hasData: false,
	errors: [],
};

export default function stuff(state = initialState, action) {
	let newState;
	switch (action.type) {
		case TESTIMONIALS_INIT:
			newState = {
				...state,
				isLoading: true,
				hasData: false,
				errors: [],
			};
			return newState;
		case TESTIMONIALS_SUCCESS:
			newState = {
				...state,
				isLoading: false,
				hasData: Array.isArray(action.payload) ? !!action.payload.length : action.payload,
				data: action.payload,
			};
			return newState;
		case TESTIMONIALS_FAILURE:
			newState = {
				...state,
				isLoading: false,
			};
			return newState;
		default:
			return state;
	}
}
