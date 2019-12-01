import React, { useState } from 'react';
import { Layout } from 'antd';
import SideMenu from './components/SideMenu/SideMenu';
import AppContent from './components/AppContent/AppContent';
import AppHeader from './components/AppContent/AppHeader/AppHeader';

const { Header, Sider, Content } = Layout;

interface Props {
	children: object;
	name: string;
}

const AppLayout = (props: Props) => {
	const { name } = props;
	const [collapsed, setCollapsed] = useState<boolean>(false);

	return (
		<Layout style={{ height: '100%' }}>
			<Sider breakpoint="lg" trigger={null} collapsedWidth={0} collapsed={collapsed}>
				<SideMenu />
			</Sider>
			<Layout>
				<Header style={{ background: '#fff', padding: 0 }}>
					<AppHeader collapsed={collapsed} toggle={() => setCollapsed(!collapsed)} />
				</Header>
				<Content style={{ margin: '6px 4px 0' }}>
					<AppContent name={name} {...props} />
				</Content>
			</Layout>
		</Layout>
	);
};

export default AppLayout;
