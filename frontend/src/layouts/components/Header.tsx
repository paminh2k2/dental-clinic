import { Image, Layout } from 'antd';
import Logo from '../../assets/Logo.png';
import Avatar from '../../assets/avatar.png';

const Header = () => {

    return (
        <Layout.Header className='flex flex-row justify-between h-14 items-center border-solid border-b border-zinc-100 px-40'>
            <Image 
                src={Logo} 
                preview={false}
                width={40}
            />
            <img src={Avatar} alt="" className='w-10 h-10 rounded-full  flex-1/4'/>
        </Layout.Header>
    )
}

export default Header