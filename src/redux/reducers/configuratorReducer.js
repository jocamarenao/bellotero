import { CONFIGURATOR_INIT, CONFIGURATOR_SUCCESS, CONFIGURATOR_FAILURE } from '../actions/actionTypes';

const initialState = {
	data: [],
	isLoading: true,
	hasData: false,
	errors: [],
};

export default function stuff(state = initialState, action) {
	let newState;
	switch (action.type) {
		case CONFIGURATOR_INIT:
			newState = {
				...state,
				isLoading: true,
				hasData: false,
				errors: [],
			};
			return newState;
		case CONFIGURATOR_SUCCESS:
			newState = {
				...state,
				isLoading: false,
				hasData: Array.isArray(action.payload) ? !!action.payload.length : action.payload,
				data: action.payload,
			};
			return newState;
		case CONFIGURATOR_FAILURE:
			newState = {
				...state,
				isLoading: false,
			};
			return newState;
		default:
			return state;
	}
}
