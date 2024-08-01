import { Layout } from 'antd';
import React from 'react';
import { useStore } from './Store.hook';


const Revenue: React.FC = () => {
    
    const {

    } = useStore()

    return (
        <Layout.Content className='py-3 px-6 mx-3'>
            Store
        </Layout.Content>
    );
}

export default Revenue;
