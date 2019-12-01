import { combineReducers } from 'redux';
import calculatorReducer from './calculatorReducer';
import routeReducer from './routeReducer';
import testimonialReducer from './testimonialReducer';
import configuratorReducer from './configuratorReducer';

const rootReducer = combineReducers({
	stuffs: calculatorReducer,
	routes: routeReducer,
	testimonials: testimonialReducer,
	configurator: configuratorReducer,
});

export default rootReducer;
