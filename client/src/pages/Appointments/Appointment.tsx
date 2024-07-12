import React, { useState } from 'react';
import { Button, Input, Layout, Table, Modal, Form, DatePicker, TimePicker, Select, message } from 'antd';
import { EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import Column from 'antd/es/table/Column';
import dayjs, { Dayjs } from 'dayjs';
import { useAppointments } from './Appointment.hooks';

const { Option } = Select;

interface DataType {
    key: string;
    name: string;
    date: Dayjs;
    time: Dayjs;
    services: string[];
}

const initialData: DataType[] = [
    {
        key: '1',
        name: 'Pham Anh Minh',
        date: dayjs('2002-01-01', 'YYYY-MM-DD'),
        time: dayjs('09:20', 'HH:mm'),
        services: ['Cao voi']
    }
];

const Appointment = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const {
        data,
        isVisible,
        isEdit,
        editingKey,
        form,
        showModal,
        handleCancel,
        handleAdd,
        handleDelete,
        handleEdit,
    } = useAppointments()
    const filteredData = data.filter(appointment =>
        appointment.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Layout.Content className='py-3 px-6 mx-3'>
            <div className='flex justify-between'>
                <Input
                    placeholder='Nhập tên khách hàng'
                    className='w-80'
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button icon={<PlusCircleOutlined />} type='primary' onClick={showModal}>
                    Add Appointment
                </Button>
            </div>
            <div className='mt-3 h-[41rem] overflow-y-hidden bg-white'>
                <Table
                    virtual
                    pagination={false}
                    scroll={{ y: 600, x: 1080 }}
                    dataSource={filteredData}
                    
                >
                    <Column title="Họ và tên" dataIndex='name' />
                    <Column
                        title="Ngày hẹn"
                        dataIndex='date'
                        render={(date) => dayjs.isDayjs(date) ? date.format('DD-MM-YYYY') : dayjs(date).format('DD-MM-YYYY')}
                    />
                    <Column
                        title="Giờ hẹn"
                        dataIndex='time'
                        render={(time) => dayjs.isDayjs(time) ? time.format('HH:mm') : dayjs(time).format('HH:mm')}
                    />
                    <Column title="Dịch vụ" dataIndex='services' render={(services) => services.join(', ')} />
                    <Column
                        title="Edit"
                        render={(_, record: DataType) => (
                            <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
                        )}
                    />
                    <Column
                        title="Cancel"
                        render={(_, record: DataType) => (
                            <Button onClick={() => handleDelete(record.key)}>Cancel</Button>
                        )}
                    />
                </Table>
            </div>

            <Modal
                title={isEdit ? "Edit Appointment" : "Add Appointment"}
                visible={isVisible}
                onCancel={handleCancel}
                onOk={handleAdd}
                okText={isEdit ? "Update" : "Add"}
                cancelText="Cancel"
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="name"
                        label="Tên khách hàng"
                        rules={[{ required: true, message: 'Vui lòng nhập tên khách hàng!' }]}
                    >
                        <Input placeholder="Nhập tên khách hàng" />
                    </Form.Item>
                    <Form.Item
                        name="date"
                        label="Ngày hẹn"
                        rules={[{ required: true, message: 'Vui lòng chọn ngày hẹn!' }]}
                    >
                        <DatePicker format="DD-MM-YYYY" />
                    </Form.Item>
                    <Form.Item
                        name="time"
                        label="Giờ hẹn"
                        rules={[{ required: true, message: 'Vui lòng chọn giờ hẹn!' }]}
                    >
                        <TimePicker format="HH:mm" />
                    </Form.Item>
                    <Form.Item
                        name="services"
                        label="Dịch vụ"
                        rules={[{ required: true, message: 'Vui lòng chọn dịch vụ!' }]}
                    >
                        <Select mode="tags" placeholder="Chọn hoặc nhập dịch vụ">
                            <Option value="Cao voi">Cao voi</Option>
                            <Option value="Tẩy trắng răng">Tẩy trắng răng</Option>
                            <Option value="Khám răng">Khám răng</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </Layout.Content>
    );
};

export default Appointment;
