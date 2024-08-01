import { CheckCircleOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Form, Input, Layout, Modal, Select, Table } from 'antd';
import Column from 'antd/es/table/Column';
import { useHome } from './Home.hooks';
const { Option } = Select;

const Home = () => {
    const {
        data,
        services,
        form,
        isVisible,
        appointmentSelected,
        showModal,
        handleEdit,
        handleCancel,
        handleCompleted,
    } = useHome()

    return (
        <Layout.Content className='py-3 px-6 mx-3'>
            <div className='mt-3 h-[41rem] overflow-y-hidden bg-white rounded-lg'>
                <Table
                    virtual
                    pagination={false}
                    scroll={{ y: 600, x: 1080 }}
                    dataSource={data}
                    
                >
                    <Column title="Họ và tên" dataIndex='fullname' width={216}/>
                    <Column
                        title="Ngày hẹn"
                        dataIndex='date'
                        width={150}
                    />
                    <Column
                        title="Giờ hẹn"
                        dataIndex='time'
                        width={120}
                    />
                    <Column title="Dịch vụ" dataIndex='services' render={(services) => services.join(', ')} />
                    <Column
                        title="Chỉnh sửa"
                        width={120}
                        render={(_, record) => (
                            <Button icon={<EditOutlined />} onClick={() => showModal(record)} />
                        )}
                    />
                    <Column
                        title="Hoàn thành"
                        width={120}
                        render={(_, record) => (
                            <Button icon={<CheckCircleOutlined/>} onClick={() => handleCompleted(record)}/>
                        )}
                    />
                </Table>
            </div>

            <Modal
                title={`Chỉnh sửa lịch hẹn - ${appointmentSelected?.fullname}`}
                visible={isVisible}
                onCancel={handleCancel}
                onOk={handleEdit}
            >
                <Form
                    form={form}
                    layout="vertical"
                    requiredMark='optional'
                >
                    <div className='flex justify-between'>
                        <Form.Item
                            name="date"
                            label="Ngày hẹn: DD-MM-YYYY"
                            rules={[{ required: true, message: 'Vui lòng chọn ngày hẹn!' }]}
                            >
                            <Input placeholder='Nhập ngày hẹn' className='w-56'/>
                        </Form.Item>
                        <Form.Item
                            name="time"
                            label="Giờ hẹn: (Giờ)h(Phút)p"
                            rules={[{ required: true, message: 'Vui lòng chọn giờ hẹn!' }]}
                            >
                            <Input placeholder='Nhập giờ hẹn' className='w-56'/>
                        </Form.Item>
                    </div>
                    <Form.Item
                        name="services"
                        label="Dịch vụ"
                        rules={[{ required: true, message: 'Vui lòng chọn dịch vụ!' }]}
                    >
                        <Select mode="tags" placeholder="Chọn hoặc nhập dịch vụ">
                            {services.map((service: any) => {
                                return (
                                    <Option value={service.service}>{service.service}</Option>
                                )
                            })}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </Layout.Content>
    );
};

export default Home;
