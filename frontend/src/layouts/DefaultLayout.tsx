import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';

const { Content, Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[]= [
    { key: '1', label: 'Trang chủ' },
    { key: '2', label: 'Lịch hẹn' },
    { key: '3', label: 'Hồ sơ bệnh nhân' },
    { key: '4', label: 'Doanh thu' },
    { key: '5', label: 'Chi phí' },
    { key: '6', label: 'Vật tư' }
];

const pathMap: { [key: string]: string } = {
    '1': '/',
    '2': '/schedule',
    '3': '/profiles',
    '4': '/revenue',
    '5': '/expense',
    '6': '/material'
};

interface DefaultLayoutProps {
    children: ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
    const navigate = useNavigate();  // useNavigate hook

    const handleMenuClick: MenuProps['onClick'] = e => {
        const path = pathMap[e.key];
        if (path) {
            navigate(path);
        }
    };

    return (
        <Layout className='h-screen flex flex-col overflow-hidden'>
            <Header />
            <Layout className='flex pt-4 mx-32'>
                <Sider className='border-r bg-inherit border-black'>
                    <Menu
                        items={items}
                        className='h-full text-xl'
                        onClick={handleMenuClick}
                    />
                </Sider>
                <Content>
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default DefaultLayout;
