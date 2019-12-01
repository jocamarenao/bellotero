import React from 'react';
import { Slider, InputNumber, Row, Col } from 'antd';

const CalculatorConcept = (props: any) => {
	const { handleChange, value, initialValue, min, max, title } = props;

	return (
		<>
			<Row>
				<Col span={5} style={{ marginBottom: '1%' }}>
					<h1>{title}</h1>
				</Col>
				<Col span={15}>
					<Slider
						min={min}
						max={max}
						onChange={handleChange}
						value={typeof value === 'number' ? value : initialValue}
					/>
				</Col>
				<Col span={4}>
					<InputNumber
						min={min}
						max={max}
						style={{ marginLeft: 16, width: '80%' }}
						value={value}
						onChange={handleChange}
					/>
				</Col>
			</Row>
		</>
	);
};

export default CalculatorConcept;
