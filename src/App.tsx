import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes/Routes';
import configureStore from './redux/store/configureStore';
import 'antd/dist/antd.css';
import 'sweetalert2/dist/sweetalert2.css';

const store = configureStore();

const App: React.FC<{}> = (props: any): any => {
	return (
		<Provider store={store}>
			<Router>
				<Routes />
			</Router>
		</Provider>
	);
};

export default App;
