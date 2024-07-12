import { Layout } from 'antd';


const Expense = () => {
    return (
        <Layout.Content
            className='py-3 px-6'
        >
            <div className='flex justify-between border-b border-black pb-2'>
                <h2 className='text-2xl font-semibold '>Expense</h2>
            </div>
        </Layout.Content>
    )
}

export default Expense