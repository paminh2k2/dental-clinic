import React from 'react';
import { useDetailProfile } from './DetailProfile.hook';
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
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

const DetailProfile: React.FC<ProfileProps> = ({ code, fullname, yearofbirth, sex, job, phone, address,record, schedules }) => {
    const { handleBack} = useDetailProfile()
    return (
        <div className='px-4 py-2'>
            <div className='flex'>
                <Button icon={<ArrowLeftOutlined />} onClick={handleBack}/>
                <p className='col-span-1 text-lg font-medium'>{code.year + (code.count< 10 ? '.0' :  '.') + code.count} - {fullname}</p>
            </div>
            <div className='grid grid-cols-4 mt-2 text-lg'>
                <span>Năm sinh: {yearofbirth}</span>
                <span>Giới tính: {sex==='male'? 'Nam' : 'Nữ'}</span>
                <span>Nghề nghiệp: {job}</span>
                <span>Số điện thoại: {phone}</span>
            </div>
            <p className='text-lg'>Địa chỉ: {address}</p>
            <p>ĐÁNH GIÁ MỘT SỐ BỆNH TRẠNG</p>
            
        </div>
    );
};

export default DetailProfile;
