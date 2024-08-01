import { InputNumber, Layout, Select } from 'antd';
import React from 'react';
import { useRevenue } from './Revenue.hook';

const Revenue: React.FC = () => {
    const {
        options,
        monthoptions,
        selectedOption,
        onChangeOption,
    } = useRevenue()
    
    return (
        <Layout.Content className='py-3 px-6 mx-3'>
            <div className='flex'>
                <Select
                    options={options}
                    className='w-40 pr-2'
                    onChange={onChangeOption}
                    defaultValue={1}
                    />
                {selectedOption === 3 ? (
                    <div className='flex'>
                        <Select
                            className='px-2'
                            placeholder='Năm'

                        />
                        <Select
                            className='px-2'
                            placeholder='Tháng'
                            options={monthoptions}
                        />
                        <InputNumber placeholder='Lọc ngày'/>
                    </div>
                ): ''}
            </div>
            <div>
                
            </div>
        </Layout.Content>
    );
}

export default Revenue;
