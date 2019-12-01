import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchConfigurator } from '../../../redux/actions/configuratorActions';
import ConfiguratorLayout from '../layouts/ConfiguratorLayout/ConfiguratorLayout';

const Configurator = (props: any) => {
	useEffect(() => {
		const { getConfigurator } = props;
		getConfigurator();
	}, []);

	const { configurator } = props;
	const { data } = configurator;

	return <ConfiguratorLayout data={data} />;
};

const mapDispatchToProps = (dispatch: any) => ({
	getConfigurator: () => dispatch(fetchConfigurator()),
});

const mapStateToProps = (state: any) => ({
	configurator: state.configurator,
});

export default connect(mapStateToProps, mapDispatchToProps)(Configurator);
