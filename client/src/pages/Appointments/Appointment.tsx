import { CloseCircleOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, Layout, Modal, Select, Table } from 'antd';
import Column from 'antd/es/table/Column';
import { useMemo, useState } from 'react';
import { useAppointments } from './Appointment.hooks';

const { Option } = Select;

interface AppointmentType {
    key: string;
    name: string;
    date: string;
    time: string;
    services: string[];
}

const Appointment = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const {
        form,
        services,
        data,
        isVisibleAdd,
        isVisibleEdit,
        appointmentSelected,
        showModalAdd,
        showModalEdit,
        handleCancelAdd,
        handleCancelEdit,
        handleAdd,
        handleEdit,
        handleDelete,
    } = useAppointments()
    
    const filteredData = useMemo(() => {
        if (!searchQuery) return data;
        return data?.filter((appointment: any) =>
            appointment.fullname.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery, data]);

    return (
        <Layout.Content className='py-3 mx-3'>
            {/* Body Appointment */}
            <div className='flex justify-between'>
                <Input
                    placeholder='Nhập tên khách hàng'
                    className='w-80'
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button icon={<PlusCircleOutlined />} type='primary' onClick={showModalAdd}>
                    Thêm hẹn trước
                </Button>
            </div>
            <div className='mt-2 h-[41rem] overflow-y-auto bg-white rounded-lg'>
                <Table
                    virtual
                    pagination={false}
                    scroll={{ y: 600, x: 1080 }}
                    dataSource={filteredData}
                    
                >
                    <Column title="Họ và tên" dataIndex='fullname' width={216}/>
                    <Column
                        title="Ngày hẹn"
                        width={150}
                        dataIndex='date'
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
                        render={(_, record: AppointmentType) => (
                            <Button icon={<EditOutlined />} onClick={() => showModalEdit(record)} />
                        )}
                    />
                    <Column
                        title="Hủy bỏ"
                        width={120}
                        render={(_, record: AppointmentType) => (
                            <Button icon={<CloseCircleOutlined />} onClick={() => handleDelete(record)}/>
                        )}
                    />
                </Table>
            </div>
            {/* Body Appointment */}

            {/* Modal Add appointment */}
            <Modal
                title={"Thêm lịch hẹn"}
                visible={isVisibleAdd}
                onCancel={handleCancelAdd}
                onOk={handleAdd}
            >
                <Form
                    form={form}
                    layout="vertical"
                    requiredMark='optional'
                >
                    <Form.Item
                        name="fullname"
                        label="Tên khách hàng"
                        rules={[{ required: true, message: 'Vui lòng nhập tên khách hàng!' }]}
                    >
                        <Input placeholder="Nhập tên khách hàng" />
                    </Form.Item>
                    <div className='flex justify-between'>
                        <Form.Item
                            name="date"
                            label="Ngày hẹn"
                            rules={[{ required: true, message: 'Vui lòng chọn ngày hẹn!' }]}
                            >
                            <Input placeholder='Nhập ngày hẹn: DD-MM-YYYY' className='w-56'/>
                        </Form.Item>
                        <Form.Item
                            name="time"
                            label="Giờ hẹn"
                            rules={[{ required: true, message: 'Vui lòng chọn giờ hẹn!' }]}
                            >
                            <Input placeholder='Nhập giờ hẹn' className='w-56' />
                        </Form.Item>
                    </div>
                    <Form.Item
                        name="services"
                        label="Dịch vụ"
                        rules={[{ required: true, message: 'Vui lòng chọn dịch vụ!' }]}
                    >
                        <Select mode="tags" placeholder="Chọn hoặc nhập dịch vụ">
                            {services.map((item: any) => {
                                return (
                                    <Option value={item.service}>{item.service}</Option>
                                )
                            })}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
            {/* Modal Add appointment */}

            {/* Modal Edit Appointment */}
            <Modal
                title={`Chỉnh sửa lịch hẹn - ${appointmentSelected?.fullname}`}
                visible={isVisibleEdit}
                onCancel={handleCancelEdit}
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
                            label="Ngày hẹn"
                            rules={[{ required: true, message: 'Vui lòng chọn ngày hẹn!' }]}
                            >
                            <Input placeholder='Nhập ngày hẹn: DD-MM-YYYY' className='w-56'/>
                        </Form.Item>
                        <Form.Item
                            name="time"
                            label="Giờ hẹn"
                            rules={[{ required: true, message: 'Vui lòng chọn giờ hẹn!' }]}
                            >
                            <Input placeholder='Nhập giờ hẹn' className='w-56' />
                        </Form.Item>
                    </div>
                    <Form.Item
                        name="services"
                        label="Dịch vụ"
                        rules={[{ required: true, message: 'Vui lòng chọn dịch vụ!' }]}
                    >
                        <Select mode="tags" placeholder="Chọn hoặc nhập dịch vụ">
                            {services.map((item: any) => {
                                return (
                                    <Option value={item.service}>{item.service}</Option>
                                )
                            })}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
            {/* Modal Edit appointment */}
        </Layout.Content>
    );
};

export default Appointment;
