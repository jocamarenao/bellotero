import React from 'react';
import { PageHeader, Card, Breadcrumb } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import breadcrumbNameMap from '../../../../Routes/breadcrumbs';
import styles from './index.module.css';

interface Props {
	children: object;
	name: string;
}

const Routes = (props: any) => {
	const { children, name, location } = props;
	const pathSnippets = location.pathname.split('/').filter((i: any) => i);

	const extraBreadcrumbItems = pathSnippets.map((_: any, index: any) => {
		const from = 0;
		const to = 1;
		const url = `/${pathSnippets.slice(from, parseInt(index, 10) + to).join('/')}`;
		if (!breadcrumbNameMap[url]) return null;
		return (
			<Breadcrumb.Item key={url}>
				<Link to={url}>{breadcrumbNameMap[url]}</Link>
			</Breadcrumb.Item>
		);
	});

	const breadcrumbItems = [
		<Breadcrumb.Item key="home">
			<Link to="/home">Home</Link>
		</Breadcrumb.Item>,
	].concat(extraBreadcrumbItems);

	const breads = (
		<>
			<Breadcrumb>{breadcrumbItems}</Breadcrumb>
			{name}
		</>
	);

	return (
		<div style={{ height: '100%' }}>
			<div className={styles.pageHeaderColor}>
				<PageHeader style={{ background: '#1890FF', margin: 10 }} title={breads} />
			</div>
			<Card style={{ background: '#fff', margin: 10 }}>{children}</Card>
		</div>
	);
};

export default withRouter(Routes);
