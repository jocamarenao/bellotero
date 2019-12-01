import React, { useState } from 'react';
import { Row, Col } from 'antd';
import CalculatorConcept from './components/CalculatorConcept';

const fixedNumber = 2;

const initialMonthlyValue = 35;
const initialEmployeeValue = 4;

const foodSavingsFactor = 0.3;
const annualSavingsFactor = 1337;

const minMonthly = 10;
const maxMonthly = 100;

const minEmployees = 1;
const maxEmployees = 10;

const Calculator = () => {
	const [monthly, setMonthly] = useState(initialMonthlyValue);
	const [employees, setEmployees] = useState(initialEmployeeValue);
	const [foodSavings, setFoodSavings] = useState(initialMonthlyValue * foodSavingsFactor);
	const [annualSavings, setAnnualSavings] = useState(initialEmployeeValue * annualSavingsFactor + foodSavings);

	const handleMonthlyChange = (value: any) => {
		let newValue = value;
		if (value > maxMonthly) newValue = maxMonthly;
		if (value < minMonthly) newValue = minMonthly;

		setMonthly(newValue);
		const newFoodSaving = newValue * foodSavingsFactor;
		setFoodSavings(newFoodSaving);
		setAnnualSavings(employees * annualSavingsFactor + newFoodSaving);
	};

	const handleEmployeeChange = (value: any) => {
		let newValue = value;
		if (value > maxEmployees) newValue = maxMonthly;
		if (value < minEmployees) newValue = minMonthly;

		setEmployees(newValue);
		setAnnualSavings(newValue * annualSavingsFactor + foodSavings);
	};

	return (
		<>
			<Row style={{ marginBottom: '1%' }}>
				<Col>
					<h1 style={{ textAlign: 'center' }}>Calculator</h1>
				</Col>
			</Row>
			<CalculatorConcept
				handleChange={handleMonthlyChange}
				value={monthly}
				initialValue={initialMonthlyValue}
				min={minMonthly}
				max={maxMonthly}
				title="Monthly ingredient spending"
			/>
			<CalculatorConcept
				handleChange={handleEmployeeChange}
				value={employees}
				initialValue={initialEmployeeValue}
				min={minEmployees}
				max={maxEmployees}
				title="Full time employees that process invoices"
			/>
			<Row>
				<Col span={12} style={{ marginBottom: '1%', textAlign: 'center' }}>
					<h1>{`$${foodSavings.toFixed(fixedNumber)}`}</h1>
					<h1>Estimated cost food savings</h1>
				</Col>
				<Col span={12} style={{ marginBottom: '1%', textAlign: 'center' }}>
					<h1>{`$${annualSavings.toFixed(fixedNumber)}`}</h1>
					<h1>Your estimated annual savings</h1>
				</Col>
			</Row>
		</>
	);
};

export default Calculator;
