import { Button, Layout, Modal, Form, Input, Table, InputNumber } from 'antd';
import Column from 'antd/es/table/Column';
import { PlusCircleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useSetting } from './Setting.hooks';

interface DataType {
    service: string;
    price: {
        min: number;
        max: number;
    };
    note: string;
}


const Setting = () => {
    const { 
        data, 
        isVisible, 
        form, 
        currencyFormatter, 
        showModal, 
        handleAddOrUpdateService, 
        handleCancel,
        handleEditService,
        handleDeleteService

    } = useSetting()
    return (
        <Layout.Content className='py-3 px-6 mx-3'>
            <Button icon={<PlusCircleOutlined />} type='primary' onClick={showModal}>Add Service</Button>
            <div className='mt-3'>
                <Table
                    virtual
                    pagination={false}
                    scroll={{ y: 600, x: 1080 }}
                    dataSource={data}
                    rowKey={(service: DataType) => (service.service)}
                >
                    
                    <Column title="Dịch vụ" dataIndex="service" />
                    <Column 
                        title="Giá dịch vụ" 
                        dataIndex="price" 
                        render={price => {
                            return (
                                <p>
                                {
                                    price['min'] === price['max'] ?
                                    (price['min'] === 0 ? 'Miễn phí' : currencyFormatter.format(price['max'])) :
                                    (currencyFormatter.format(price['min']) + ' - ' + currencyFormatter.format(price['max']))
                                }
                                </p>
                            )
                        }}
                    />
                    <Column title="Ghi chú" dataIndex="note" />
                    <Column title="Edit" render={(service: DataType) => (<Button icon={<EditOutlined />} onClick={()=>handleEditService(service)}/>)} />
                    <Column title="Delete" render={(service: DataType) => (<Button icon={<DeleteOutlined />} onClick={() =>handleDeleteService(service)}/>)} />
                </Table>
            </div>
            <Modal
                title='Thêm dịch vụ'
                visible={isVisible}
                onCancel={handleCancel}
                onOk={handleAddOrUpdateService}
            >
                <Form 
                    form={form} 
                    layout='vertical'
                    requiredMark='optional'
                >
                        <Form.Item
                            name='service'
                            label='Dịch vụ'
                            rules={[{ required: true, message: 'Please input the service!' }]}
                        >
                            <Input placeholder="Nhập tên dịch vụ ..." />
                        </Form.Item>
                        <div className='flex justify-between'>
                            <Form.Item
                                name={['price', 'min']}
                                label='Giá thấp nhất'
                                rules={[{ required: true, message: 'Please input the price!' }]}
                                >
                                <InputNumber placeholder="Nhập giá thấp nhất" className='w-56'/>
                            </Form.Item>
                            <Form.Item
                                name={['price', 'max']}
                                label='Giá cao nhất'
                                rules={[{ required: true, message: 'Please input the price!' }]}
                                >
                                <InputNumber placeholder="Nhập giá cao nhất" className='w-56'/>
                            </Form.Item>
                        </div>
                        <Form.Item
                            name='note'
                            label='Ghi chú'
                        >
                            <Input placeholder="Nhập ghi chú ..." className='w-full' defaultValue={''}/>
                        </Form.Item>
                </Form>
            </Modal>
        </Layout.Content>
    );
}

export default Setting;
