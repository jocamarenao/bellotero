import React from 'react';
import { Card, Row, Col } from 'antd';
import Calculator from '../../components/Calculator/Calculator';

const ConfiguratorLayout = (props: any) => {
	const { data } = props;
	const { title, description } = data;

	return (
		<>
			<Row style={{ marginBottom: '1%' }}>
				<Col>
					<Card>
						<h1 style={{ textAlign: 'center' }}>{title}</h1>
						<p style={{ textAlign: 'center' }}>{description}</p>
					</Card>
				</Col>
			</Row>
			<Row>
				<Col>
					<Card>
						<Calculator />
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default ConfiguratorLayout;
