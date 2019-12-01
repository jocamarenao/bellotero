import React from 'react';
import { Spin } from 'antd';
import './index.css';

const Loading: any = () => {
	return (
		<div className="loading">
			<Spin size="large" />
		</div>
	);
};

export default Loading;
