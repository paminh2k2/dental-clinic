import { Layout } from 'antd';
import { services1, services2 } from '../../assets/services/services';
import Services from '../../components/Services/Services';



const Home = () => {
    return (
        <Layout.Content
            className='mx-4'
        >
            <div className='border-b mt-2 text-2xl h-10 border-black font-semibold'>
                <p>BẢNG GIÁ NHA KHOA</p>
            </div>
            <div className='grid grid-cols-2 mt-2'>
                <div>
                    {services1.map(services=> {
                        return (
                            <Services
                                title={services.title}
                                service = {services.service}
                            />
                        )
                    })}
                </div>
                <div>
                {services2.map(services => {
                        return (
                            <Services
                                title={services.title}
                                service = {services.service}
                            />
                        )
                    })}
                </div>
            </div>
        </Layout.Content>
    )
}

export default Home