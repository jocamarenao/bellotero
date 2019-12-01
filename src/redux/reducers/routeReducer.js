import { ROUTES_INIT, ROUTES_SUCCESS, ROUTES_FAILURE } from '../actions/actionTypes';

const initialState = {
	data: [],
	isLoading: true,
	hasData: false,
	errors: [],
	status: 200,
};

export default function stuff(state = initialState, action) {
	let newState;
	switch (action.type) {
		case ROUTES_INIT:
			newState = {
				...state,
				status: null,
				isLoading: true,
				hasData: false,
				errors: [],
			};
			return newState;
		case ROUTES_SUCCESS:
			newState = {
				...state,
				isLoading: false,
				status: 200,
				hasData: Array.isArray(action.payload) ? !!action.payload.length : action.payload,
				data: action.payload,
			};
			return newState;
		case ROUTES_FAILURE:
			newState = {
				...state,
				isLoading: false,
				status: action.response.status,
			};
			return newState;
		default:
			return state;
	}
}
