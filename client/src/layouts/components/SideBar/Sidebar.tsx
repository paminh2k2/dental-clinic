import { Avatar, Button, Image, Menu, MenuProps } from "antd"
import Logo from '~/assets/Logo.png'
import {
    HomeFilled,
    ScheduleFilled,
    FolderFilled, 
    FundFilled,
    ProfileOutlined,
    LogoutOutlined, 
    SettingFilled
} from "@ant-design/icons"
import { useNavigate } from 'react-router-dom';

const items = [
    {
        key: 'home',
        label: 'Home',
        icon: <HomeFilled />,
    },
    {
        key: 'appointment',
        label: 'Appointment',
        icon: <ScheduleFilled />,
    },
    {
        key: 'profiles',
        label: 'Profiles',
        icon: <FolderFilled />,
    },
    {
        key: 'static',
        label: 'Static',
        icon: <FundFilled />,
    },
    {
        key: 'setting',
        label: 'Setting',
        icon: <SettingFilled />,
    },
]

const pathMap: { [key: string]: string } = {
    'home': '/',
    'appointment': '/appointment',
    'profiles': '/profiles',
    'static': '/static',
    'expense': '/expense',
    'setting': '/setting'
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
                    style={{border: 0}}
                >
                    {items.map(item => (
                        <Menu.Item
                            key={item.key}
                            icon={item.icon}
                            
                        >
                            {item.label}
                        </Menu.Item>
                    ))}
                </Menu>
                    
            </div>
            <div className="flex justify-center items-center">
                <Button className="bg-transparent text-[#8d8598]" icon={<LogoutOutlined/>}/>
            </div>
        </div>
    )
}

export default SideBar