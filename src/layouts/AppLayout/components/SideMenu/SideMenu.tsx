import React from 'react';
import { connect } from 'react-redux';
import { Menu, Icon } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import Common from '../../../../util/Common';

const SideMenu = (props: any) => {
	const { location, routes } = props;
	return (
		<>
			<Menu theme="dark" mode="inline" selectedKeys={[location.pathname]}>
				<Menu.Item key="/home">
					<Icon style={{ display: 'inline' }} type="home" />
					<Link style={{ display: 'inline' }} to="/home">
						Home
					</Link>
				</Menu.Item>
				{routes.data.map((route: any) => {
					return (
						<Menu.Item key={Common.getPath(route)}>
							<Icon style={{ display: 'inline' }} type="caret-right" />
							<Link style={{ display: 'inline' }} to={Common.getPath(route)}>
								{route.text}
							</Link>
						</Menu.Item>
					);
				})}
			</Menu>
		</>
	);
};

const mapStateToProps = (state: any) => ({
	routes: state.routes,
});

export default connect(mapStateToProps)(withRouter(SideMenu));
