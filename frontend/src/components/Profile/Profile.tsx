import { Checkbox, Col, Row } from 'antd';
import React from 'react';

interface ProfileProps {
    ms: number; // Đảm bảo sử dụng 'number' thay vì 'Number'
}

const Profile: React.FC<ProfileProps> = ({ ms }) => {
    return (
        <div className='w-full h-full'>
            <h3 className='flex justify-start text-xl font-medium'>MS: {ms}</h3>
            <h2 className='flex justify-center items-center text-3xl font-semibold'>HỒ SƠ BỆNH NHÂN</h2>
            <div className='mx-4 text-lg'>
                <div className='grid grid-cols-6 mt-4'>
                        <span className='col-span-2'>Họ Và tên: Phạm Anh Minh</span>
                        <span className='col-start-3'>Năm sinh: 2002</span>
                        <span className='col-start-5'>Giới tính: Nam</span>
                </div>
                <div className='grid grid-cols-6 mt-2'>
                        <span className='col-span-4'>Điện thoại: 0917 632 242</span>
                        <span className='col-span-2'>Nghề nghiệp: Sinh viên</span>
                </div>
                <p className='mt-2'>Địa chỉ: KTX đại học quốc gia TP.HCM</p>
                <div>
                    <p className='font-medium mt-2'>ĐÁNH GIÁ TÌNH TRẠNG BỆNH NHÂN</p>
                    <Checkbox.Group style={{width: '100%'}}>
                    <Row>
                        <Col span={12}>
                            <Checkbox value="A">A</Checkbox>
                        </Col>
                        <Col span={12}>
                            <Checkbox value="B">B</Checkbox>
                        </Col>
                        <Col span={12}>
                            <Checkbox value="C">C</Checkbox>
                        </Col>
                        <Col span={12}>
                            <Checkbox value="D">D</Checkbox>
                        </Col>
                        <Col span={12}>
                            <Checkbox value="E">E</Checkbox>
                        </Col>
                    </Row>
                    </Checkbox.Group>
                </div>
                
            </div>
        </div>
    );
};

export default Profile;
