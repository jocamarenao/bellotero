import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, Switch } from 'react-router-dom';
import LayoutRoute from '../components/LayoutRoute/LayoutRoute';
import { fetchRoutes } from '../redux/actions/routeActions';
import Loading from '../components/Loading/Loading';
import components from './components';
import Common from '../util/Common';

const Routes = (props: any): any => {
	useEffect(() => {
		const { getRoutes } = props;
		const getData = async () => {
			await getRoutes();
		};
		getData();
	}, []);

	const { routesData } = props;
	const { isLoading, hasData, data } = routesData;

	const getRoutes = (): any => {
		const routes: any = [];
		routes.push(<LayoutRoute key="Home" exact path="/home" component={components.Home} name="Home" />);
		data.forEach((item: any) => {
			routes.push(
				<LayoutRoute
					key={item.text}
					exact
					path={Common.getPath(item)}
					component={components[item.text]}
					name={item.text}
				/>
			);
		});
		routes.push(<LayoutRoute key="notFound" exact={false} path="/" component={components.NotFound} name="NotFound" />);
		return routes;
	};
	return <>{!isLoading && hasData ? <Switch>{getRoutes()}</Switch> : <Loading />}</>;
};

const mapStateToProps = (state: any) => ({
	routesData: state.routes,
});

const mapDispatchToProps = (dispatch: any) => ({
	getRoutes: () => dispatch(fetchRoutes()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Routes));
