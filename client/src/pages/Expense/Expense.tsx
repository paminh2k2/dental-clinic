import { PlusCircleFilled } from '@ant-design/icons';
import { Button, Layout } from 'antd';


const Expense = () => {
    return (
        <Layout.Content className='py-3 px-6 mx-3'>
            <div className='flex justify-between'>
                <p className='text-xl font-medium'>Chi phí phòng khám</p>
                <Button icon={<PlusCircleFilled/>} type='primary'>Tạo chi phí</Button>
            </div>
            <div className='mt-2 bg-white rounded-lg h-[41rem] overflow-y-auto'>
                
            </div>
        </Layout.Content>
    )
}

export default Expense