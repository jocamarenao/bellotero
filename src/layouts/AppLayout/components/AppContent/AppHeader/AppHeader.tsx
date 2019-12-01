import React from 'react';
import { Icon } from 'antd';

interface Props {
	collapsed: boolean;
	toggle: () => void;
}

const AppHeader = (props: Props) => {
	const { collapsed, toggle } = props;
	return (
		<div style={{ marginLeft: '1%' }}>
			<Icon
				style={{ fontSize: '20px' }}
				className="trigger"
				type={collapsed ? 'menu-unfold' : 'menu-fold'}
				onClick={toggle}
			/>
		</div>
	);
};

export default AppHeader;
