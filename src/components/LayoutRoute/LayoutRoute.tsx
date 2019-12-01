import React from 'react';
import { Route } from 'react-router-dom';
import AppLayout from '../../layouts/AppLayout/AppLayout';

interface Props {
	component: any;
	exact: boolean;
	path: string;
	name: string;
}

const ProtectedRoute: any = (props: Props) => {
	const { component: Component, name, ...rest } = props;
	const renderComponent: any = (renderComponentProps: any) => {
		return (
			<AppLayout name={name}>
				<Component {...renderComponentProps} />
			</AppLayout>
		);
	};
	return <Route render={renderComponent} {...rest} />;
};

export default ProtectedRoute;
