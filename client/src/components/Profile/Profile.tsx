import { Column } from '@ant-design/charts';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Form, Input, InputNumber, Modal, Row, Select, Table } from 'antd';
import React from 'react';
import { useProfile } from './Profile.hook';

interface ProfileProps {
    _id: string;
    code: { year: number, count: number };
    fullname: string;
    yearofbirth: string;
    sex: string;
    job: string;
    phone: string;
    address: string;
    record: string[];
    schedules: {
        date: string;
        tooth: string;
        schedule: string;
        amount: number;
        price: number;
        discount: number;
        total: number;
    }[];
}

const Profile: React.FC<ProfileProps> = ({ _id, code, fullname, yearofbirth, sex, job, phone, address, record, schedules }) => {
    const {
        records,
        isVisible,
        services,
        selectedService,
        history,
        form,
        currencyFormatter,
        handleChangeService,
        handleOpen,
        handleCancel,
        handleUpdateRecord,
        handleAddSchedule
    } = useProfile({
        _id,
        code,
        fullname,
        yearofbirth,
        sex,
        job,
        phone,
        address,
        record,
        schedules 
    });

    return (
        <div className='px-3'>
            <div className='flex justify-between'>
                <p className='text-lg font-bold'>{code.year + (code.count < 10 ? '.0' : '.') + code.count} - {fullname}</p>
            </div>
            <div className='grid grid-cols-4 text-lg'>
                <span>Năm sinh: {yearofbirth}</span>
                <span>Giới tính: {sex === 'male' ? 'Nam' : 'Nữ'}</span>
                <span>Nghề nghiệp: {job}</span>
                <span>Số điện thoại: {phone.substring(0, 4) + ' ' + phone.substring(4, 7) + ' ' + phone.substring(7, 10)}</span>
            </div>
            <p className='text-lg'>Địa chỉ: {address}</p>
            <div className='mt-1'>
                <div className='flex items-center'>
                    <p className='font-semibold'>ĐÁNH GIÁ MỘT SỐ BỆNH TRẠNG</p>
                    <Button onClick={handleUpdateRecord} className='ml-2'>Update</Button>
                </div>
                <Checkbox.Group defaultValue={record} onChange={(checkedValues) => form.setFieldsValue({ record: checkedValues })}>
                    <Row>
                        {records?.map((record) => (
                            <Col span={8} key={record}>
                                <Checkbox value={record}>{record}</Checkbox>
                            </Col>
                        ))}
                    </Row>
                </Checkbox.Group>
            </div>
            <div className='mt-1'>
                <div className='flex items-center'>
                    <p className='font-semibold'>KẾ HOẠCH ĐIỀU TRỊ</p>
                    <Button icon={<PlusCircleOutlined />} className='ml-2' onClick={handleOpen} />
                </div>
                <div>
                    <Table
                        virtual
                        pagination={false}
                        scroll={{ y: 600, x: 1080 }}
                        dataSource={history}
                    >
                        <Column title='Ngày thực hiện' dataIndex='date' />
                        <Column title='Răng' dataIndex='tooth' />
                        <Column title='Kế hoạch điều trị' dataIndex='schedule' />
                        <Column title='Số lượng' dataIndex='amount' />
                        <Column title='Đơn giá' dataIndex='price' />
                        <Column title='Giảm giá' dataIndex='discount' />
                        <Column title='Tổng' dataIndex='total' />
                    </Table>
                </div>
            </div>
            <Modal
                title='Thêm kế hoạch điều trị'
                visible={isVisible}
                onCancel={handleCancel}
                onOk={handleAddSchedule}
            >
                <Form
                    form={form}
                    layout='vertical'
                    requiredMark='optional'
                >
                    <Form.Item
                        name='schedule'
                        label='Dịch vụ'
                        rules={[{ required: true, message: 'Vui lòng chọn một dịch vụ!' }]}
                    >
                        <Select
                            showSearch
                            placeholder="Chọn dịch vụ"
                            optionFilterProp='label'
                            onChange={handleChangeService}
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            options={services.map((item: any) => ({
                                value: item.service,
                                label: item.service
                            }))}
                        />
                    </Form.Item>
                    <div className='flex justify-between'>
                        <Form.Item
                            name='tooth'
                            label='Răng'
                            rules={[{ required: true, message: 'Vui lòng nhập răng thực hiện!' }]}
                        >
                            <Input placeholder='Chọn 1 răng' className='w-56' />
                        </Form.Item>
                        <Form.Item
                            name='price'
                            label={`Đơn giá 
                                ${selectedService ? 
                                (
                                    selectedService.price.min === selectedService.price.max ?
                                    currencyFormatter.format(selectedService.price.max) :
                                    ( currencyFormatter.format(selectedService.price.min) + ' - ' + currencyFormatter.format(selectedService.price.max))
                                ) :
                                ''}
                                `}
                            rules={[{ required: true, message: 'Vui lòng chọn giá!' }]}
                        >
                            <InputNumber placeholder='Nhập giá' className='w-56' />
                        </Form.Item>
                    </div>
                    <Form.Item
                        name='discount'
                        label='Giảm giá'
                        rules={[{ required: true, message: 'Vui lòng nhập một số tiền giảm giá!' }]}
                    >
                        <InputNumber placeholder='Nhập số tiền giảm' className='w-full' />
                    </Form.Item>
                    <Form.Item name="record" style={{ display: 'none' }}>
                        <Input type="hidden" />
                    </Form.Item>
                    
                </Form>
            </Modal>
        </div>
    );
};

export default Profile;
