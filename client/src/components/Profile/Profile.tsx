import React from 'react';
import { useProfile } from './Profile.hook';
import { Checkbox, Col, Form, InputNumber, Modal, Row, Select, Table } from 'antd';
import { Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Column } from '@ant-design/charts';
import { ScriptTarget } from 'typescript';

interface ProfileProps {
    code: {year: number, count: number};
    fullname: string;
    yearofbirth: string;
    sex:string;
    job: string;
    phone: string;
    address: string
    record: string[];
    schedules: {
        date: string;
        tooth: number;
        schedule: string;
        amount: number;
        price: number;
        discount: number;
        total: number;
        paid: number;
        unpaid: number;
    }[]
}

const Profile: React.FC<ProfileProps> = ({ code, fullname, yearofbirth, sex, job, phone, address,record, schedules }) => {
    const {
        records,
        isVisible,
        services,
        form,
        handleOpen,
        handleCancel,
        handleAddSchedule
    } = useProfile({
        code,
        fullname,
        yearofbirth,
        sex,
        job,
        phone,
        address,
        record,
        schedules 
    })

    return (
        <div className='px-3'>
            <div className='flex justify-between'>
                <p className='text-lg font-bold'>{code.year + (code.count< 10 ? '.0' :  '.') + code.count} - {fullname}</p>
                {/* <Button icon={<PlusCircleOutlined />} type='primary'>Add Schedule</Button> */}
            </div>
            <div className='grid grid-cols-4 text-lg'>
                <span>Năm sinh: {yearofbirth}</span>
                <span>Giới tính: {sex==='male'? 'Nam' : 'Nữ'}</span>
                <span>Nghề nghiệp: {job}</span>
                <span>Số điện thoại: {phone.substring(0,4) + ' '+ phone.substring(4,7) + ' ' + phone.substring(7,10)}</span>
            </div>
            <p className='text-lg'>Địa chỉ: {address}</p>
            <div className='mt-1'>
                <div className='flex items-center'>
                    <p className='font-semibold'>ĐÁNH GIÁ MỘT SỐ BỆNH TRẠNG</p>
                </div>
                <Checkbox.Group>
                    <Row>
                    {records?.map((record) => {
                        return (
                            <Col span={8}>
                                <Checkbox value={record}>{record}</Checkbox>
                            </Col>
                        )
                    })}
                    </Row>
                </Checkbox.Group>
            </div>
            <div className='mt-1'>
                <div className='flex items-center'>
                    <p className='font-semibold'>KẾ HOẠCH ĐIỀU TRỊ</p>
                    <Button icon={<PlusCircleOutlined/>} className='ml-2' onClick={handleOpen}/>
                </div>
                <div>
                    <Table
                        virtual
                        pagination={false}
                        scroll={{ y: 600, x: 1080 }}
                        dataSource={schedules}
                    >
                        < Column title='Ngày thực hiện' dataIndex='date' />
                        < Column title='Răng' dataIndex='tooth' />
                        < Column title='Kế hoạch điều trị' dataIndex='schedule' />
                        < Column title='Số lượng' dataIndex='amount' />
                        < Column title='Đơn giá' dataIndex='price' />
                        < Column title='Giảm giá' dataIndex='discount' />
                        < Column title='Tổng' dataIndex='total' />
                    </Table>
                </div>
            </div>
            <Modal
                title='Thêm kế hoạch điều trị'
                visible={isVisible}
                onCancel={handleCancel}
                onOk={handleAddSchedule}
            >
                < Form
                    form={form} 
                    layout='vertical'
                    requiredMark='optional'
                >
                    < Form.Item
                        name='schedule'
                        label='Dịch vụ'
                        rules={[{ required: true, message: 'Please input the service!' }]}
                    >
                        <Select
                            showSearch
                            placeholder="Chọn dịch vụ"
                            optionFilterProp='label'
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            options={services}
                        />
                    </Form.Item>
                    <div className='flex justify-between'>
                        <Form.Item
                            name='tooth'
                            label='Răng'
                            rules={[{ required: true, message: 'Vui lòng nhập răng thực hiện!' }]}
                        >
                            <InputNumber placeholder='Chọn 1 răng'/>
                        </Form.Item>
                        <Form.Item
                            name='amount'
                            label='Số lượng'
                            rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}
                        >
                            <InputNumber placeholder='Nhập một số'/>
                        </Form.Item>
                    </div>
                </Form>
            </Modal>
        </div>
    );
};

export default Profile;
