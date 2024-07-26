import { Column } from '@ant-design/charts';
import { ArrowLeftOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Form, Input, InputNumber, Layout, Modal, Row, Select, Table } from 'antd';
import { useParams } from 'react-router-dom';
import { useDetailProfile } from './DetailProfile.hook';

const DetailProfile: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const validID = id ?? '';
    const {
        records,
        currencyFormatter,
        form,
        data,
        history,
        isVisible,
        isVisiblePay,
        services,
        selectedService,
        curID,
        handleBack,
        handleUpdateRecords,
        showModal,
        handleCancel,
        handleChangeService,
        handleAddSchedule,
        handleCancelPay,
        onOpenPay,
        onPay,
    } = useDetailProfile(validID);

    return (
        <Layout.Content className='py-3 px-2 m-3 bg-white'>
            <div className='flex'>
                <Button icon={<ArrowLeftOutlined />} onClick={handleBack} />
                <p className="text-lg font-bold ml-2">{id} - {data?.fullname}</p>
            </div>
            <div className="grid grid-cols-4 text-lg">
                <span>Năm sinh: {data?.yearofbirth}</span>
                <span>Giới tính: {data?.sex === 'male' ? 'Nam' : 'Nữ'}</span>
                <span>Nghề nghiệp: {data?.job}</span>
                <span>Số điện thoại: {data?.phone}</span>
            </div>
            <p className='text-lg'>Địa chỉ: {data?.address}</p>
            <div className="mt-1">
                <div className="flex items-center">
                    <p className="font-semibold">ĐÁNH GIÁ MỘT SỐ BỆNH TRẠNG</p>
                    <Button className='ml-2' onClick={handleUpdateRecords}>Update</Button>
                </div>
                <Checkbox.Group
                    value={data?.record ??[]}
                    onChange={(checkedValues) => form.setFieldsValue({ record: checkedValues })}
                >
                    <Row>
                        {records.map((rec) => (
                            <Col span={8} key={rec}>
                                <Checkbox value={rec}>{rec}</Checkbox>
                            </Col>
                        ))}
                    </Row>
                </Checkbox.Group>
            </div>
            <div className="mt-1">
                <div className="flex items-center">
                    <p className="font-semibold">KẾ HOẠCH ĐIỀU TRỊ</p>
                    <Button className="ml-2" icon={<PlusCircleOutlined />} onClick={showModal}/>
                </div>
                <Table
                    virtual
                    pagination={false}
                    scroll={{ y: 600, x: 1000 }}
                    dataSource={history}
                    rowKey='id'
                    onRow={(schedule) => ({
                        onClick: () =>onOpenPay(schedule),
                    })}
                >
                    <Column title='STT' dataIndex='id' width={60}/>
                    <Column title='Ngày thực hiện' dataIndex='date' />
                    <Column title='Răng' dataIndex='tooth' />
                    <Column title='Kế hoạch điều trị' dataIndex='schedule' />
                    <Column title='Số lượng' dataIndex='amount' />
                    <Column title='Đơn giá' dataIndex='price' />
                    <Column title='Giảm giá' dataIndex='discount' />
                    <Column title='Tổng' dataIndex='total' />
                    <Column title='Đã thanh toán' dataIndex='paid' />
                    <Column title='Chưa thanh toán' dataIndex='unpaid' />
                </Table>
            </div>
            <Modal
                title='THÊM KẾ HOẠCH ĐIỀU TRỊ'
                open={isVisible}
                onOk={handleAddSchedule}
                onCancel={handleCancel}
            >
                <Form
                    form={form}
                    layout='vertical'
                    requiredMark='optional'
                >
                    <Form.Item
                        name='date'
                        label='Ngày thực hiện'
                        rules={[{ required: true, message: 'Vui lòng nhập ngày thực hiện!' }]}
                    >
                        <Input placeholder='Nhập ngày thực hiện: DD-MM-YYYY' className='w-full'/>
                    </Form.Item>
                    <Form.Item
                        name='schedule'
                        label='Dịch vụ'
                        rules={[{ required: true, message: 'Vui lòng chọn 1 dịch vụ!' }]}
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
                    <Form.Item
                        name='tooth'
                        label='Răng'
                        rules={[{ required: true, message: 'Vui lòng nhập răng thực hiện!' }]}
                    >
                        <Input placeholder='Chọn những răng thực hiện' className='w-full' />
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
                            ''
                            }
                        `}
                        rules={[{ required: true, message: 'Vui lòng chọn giá!' }]}
                    >
                        <InputNumber placeholder='Nhập giá' className='w-full' />
                    </Form.Item>
                    <Form.Item
                        name='discount'
                        label='Giảm giá'
                        rules={[{ required: true, message: 'Vui lòng nhập số tiền được giảm!' }]}

                    >
                        <InputNumber className='w-full' placeholder='Nhập giá giảm' />
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                title={`NHẬP SỐ TIỀN ĐÃ THANH TOÁN - ${curID}`}
                open={isVisiblePay}
                onOk={onPay}
                onCancel={handleCancelPay}
            >
                <Form
                    form={form}
                    layout='vertical'
                    requiredMark='optional'
                >
                    <Form.Item
                        name='paid'
                        label='Đã thanh toán'
                        rules={[{ required: true, message: 'Vui lòng nhập số tiền đã thanh toán!' }]}

                    >
                        <InputNumber placeholder='Nhập số tiền đã thanh toán' className='w-full'/>
                    </Form.Item>
                </Form>
            </Modal>
        </Layout.Content>
    );
};

export default DetailProfile;
