import {
    FolderFilled,
    FundFilled,
    HomeFilled,
    LogoutOutlined,
    ScheduleFilled,
    SettingFilled
} from "@ant-design/icons";
import { Avatar, Button, Menu, MenuProps } from "antd";
import { useNavigate } from 'react-router-dom';
import Logo from '~/assets/Logo.png';

const items = [
    {
        key: 'home',
        label: 'Trang chủ',
        icon: <HomeFilled />,
    },
    {
        key: 'appointment',
        label: 'Lịch hẹn',
        icon: <ScheduleFilled />,
    },
    {
        key: 'profiles',
        label: 'Hồ sơ',
        icon: <FolderFilled />,
    },
    {
        key: 'report',
        label: 'Báo cáo',
        icon: <FundFilled />,
        children: [
            {key:'revenue', label: 'Doanh thu'},
            {key:'expense', label: 'Chi phí'},
            {key: 'store', label: 'Kho'}
        ]
    },
    {
        key: 'services',
        label: 'Dịch vụ',
        icon: <SettingFilled />,
    },
]

const pathMap: { [key: string]: string } = {
    'home': '/',
    'appointment': '/appointment',
    'expense': '/expense',
    'revenue': '/revenue',
    'store': '/store',
    'profiles': '/profiles',
    'report': '/report',
    'services': '/services',
};

const SideBar = () => {
    const navigate = useNavigate();  // useNavigate hook

    const handleMenuClick: MenuProps['onClick'] = (e) => {
        const path = pathMap[e.key];
        if (path) {
            navigate(path);
        }
    }
    return (
        <div className="grid content-between my-10">
            <div>
                <div className="flex justify-center">
                    <Avatar
                        size={54}
                        src={Logo}
                        className="mb-10"
                    />
                </div>
                <Menu
                    onClick={handleMenuClick}
                    style={{border: 0, width: 150 }}
                    defaultSelectedKeys={['home']}
                    items={items}
                    mode="inline"
                />
            </div>
            <div className="flex justify-center items-center">
                <Button className="bg-transparent text-[#8d8598]" icon={<LogoutOutlined/>}/>
            </div>
        </div>
    )
}

export default SideBar