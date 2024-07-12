import { Layout } from 'antd';
import BarChart from '~/components/BarChart/BarChart';
import { useStatic } from './Static.hooks';

const Static = () => {
    const {data} = useStatic()
    return (
        <Layout.Content
            className='flex justify-center p-3 h-full items-center'
        > 
          <div className='h-144 w-[60rem]'>
            <BarChart data={data} />
          </div>
          
        </Layout.Content>
    )
}

export default Static
