import { FilterOutlined } from '@ant-design/icons';
import type { PaginationProps } from 'antd';
import { Button, Input, Layout, Modal, Table, Tag } from 'antd';
import Column from 'antd/es/table/Column';
import { useState } from 'react';
import Profile from '~/components/Profile/Profile';
import { data } from './Appointment.hook';
const {Search} = Input


const Appointments = () => {
    const [current, setCurrent] = useState(1);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    const onChange: PaginationProps['onChange'] = (page) => {
        setCurrent(page);
    };

    const showModal = (record: any) => {
        setSelectedRow(record);
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        setSelectedRow(null);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedRow(null);
    };

    return (
        <Layout.Content
            className='mx-4'
        >
            <div className='border-b mt-2 text-2xl h-10 border-black font-semibold'>
                <p>LỊCH HẸN</p>
            </div>
            <div className='mt-2'>
                <div className='bg-white rounded overflow-hidden'>
                    <div className='h-12 flex items-center justify-end'>
                        <Search
                            className='w-80'
                            placeholder='Tìm kiếm khách hàng...'
                        />
                        <Button
                            className='mx-2 flex items-center'
                        >
                            <FilterOutlined/>
                            Filter
                        </Button>
                    </div>
                    <Table
                        dataSource={data}
                        pagination={{
                            current: current,
                            pageSize: 8,
                            position: ['bottomCenter'],
                            onChange: onChange
                        }}
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: () => {
                                    showModal(record);
                                },
                            };
                        }}
                    >
                        <Column
                            title="Mã hồ sơ"
                            dataIndex='ms'
                            render={(ms) => (
                                <>
                                    {ms === 0 ? (<Tag color='green' >New</Tag>) : (<Tag color='blue'>{ms}</Tag>)}
                                </>
                            )}
                            width={100}
                        />
                        <Column
                            title='Họ và tên'
                            dataIndex='name'
                            width={240}
                        />
                        <Column
                        title='Ngày hẹn' 
                        dataIndex='date'
                        render={(date) => (
                            <p>
                                {date.day < 10 ? ('0' + date.day) : date.day}/{date.month < 10 ? ('0' + date.month) : date.month}/{date.year}
                            </p>
                        )}
                        width={100}
                        />
                        <Column 
                            title='Giờ hẹn'
                            dataIndex='time'
                            render= {(time) => (
                                <p>{time.hour}h{time.minute < 10 ? ('0' + time.minute): time.minute}</p>
                            )}
                            width={100}
                        />
                        <Column
                            title="Bác sĩ thực hiện"
                            dataIndex='doctor'
                            width={240}
                        />
                        <Column
                            title='Dịch vụ' 
                            dataIndex='services'
                            render={(services: string[]) => {
                                return (
                                    <ul>
                                        {services.map((service) => (
                                            <li>{service}</li>
                                        ))}
                                    </ul>
                                )
                            }
                            }
                        />
                    </Table>
                </div>
            </div>
            <Modal
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Hủy
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleOk}>
                        Cập nhật
                    </Button>,
                ]}
                width={1080}
            >   
                <div className='min-h-128 overflow-x-auto'>
                    {selectedRow && (<Profile ms = {selectedRow['ms']}/>)}
                </div>
            </Modal>
        </Layout.Content>
    )
}

export default Appointments