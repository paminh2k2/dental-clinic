import { Form, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const SERVICES_API_URL = 'http://localhost:3001/services'
const PROFILE_API_URL = 'http://localhost:3001/profiles';

interface ServiceType {
    _id?: string;
    service: string;
    price: {
        min: number;
        max: number;
    };
    note: string;
}

interface ProfileProps {
    _id: string
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
        tooth: string;
        schedule: string;
        amount: number;
        price: number;
        discount: number;
        total: number;
    }[]
}

const initRecord = [
    'Chảy máu nướu khi đánh răng',
    'HA ........',
    'Tiểu đường',
    'Bệnh bao tử ( dạ dày)',
    'Suyễn',
    'Bệnh lao',
    'Có dị ứng thuốc nào không?',
    'Có đang uống thuốc điều trị bệnh gì không?',
    'Phái nữ: có đang mang thai không?'
]

export const useProfile = ({ _id, code, fullname, yearofbirth, sex, job, phone, address, record, schedules }: ProfileProps) => {
    const [records, setRecords] = useState<string[]>(initRecord);
    const [isVisible, setIsVisible] = useState(false);
    const [services, setServices] = useState<ServiceType[]>([]);
    const [history, setHistory] = useState(schedules);
    const [selectedService, setSelectedService] = useState<ServiceType | null>();
    const [form] = Form.useForm();

    const currencyFormatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0
    });

    const handleChangeService = (value: string) => {
        const service = services.find(item => item.service === value);
        form.setFieldsValue({ price: service?.price.min });
        setSelectedService(service);
    };

    const fetchServices = async () => {
        try {
            const res = await axios.get(SERVICES_API_URL);
            setServices(res.data);
        } catch (error) {
            message.error('Error fetching services. Please try again!');
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const handleOpen = () => {
        setIsVisible(true);
    };

    const handleCancel = () => {
        form.resetFields();
        setIsVisible(false);
        setSelectedService(null);
    };

    const handleUpdateRecord = async () =>{
        try {
            const records = form.getFieldValue('record')
            const newProfile = {
                _id,
                fullname,
                yearofbirth,
                address,
                code,
                job,
                sex,
                record: records,
                schedules: [...history]
            }
            await axios.put(`${PROFILE_API_URL}/${_id}`, newProfile);
            message.success('Cập nhật thành công!');
        } catch (error: any) {
            console.error('Cập nhật thất bại', error);
            if (error.response && error.response.data) {
                message.error(`Cập nhật thất bại: ${error.response.data.message}`);
            } else {
                message.error('Cập nhật thất bại. Vui lòng kiểm tra lại dữ liệu!');
            }
        }
    }

    const handleAddSchedule = async () => {
        try {
            const values = await form.validateFields();
            const day = new Date().getDate();
            const month = new Date().getMonth() + 1; // Corrected to get the correct month
            const year = new Date().getFullYear();
            const date = `${day}-${month}-${year}`;
            const amount = (values.tooth.match(/,/g) || []).length + 1;
            const total = amount * values.price - values.discount;
            const newProfile = {
                _id,
                fullname,
                yearofbirth,
                address,
                code,
                job,
                sex,
                record: values.record,
                schedules: [
                    ...history,
                    {
                        ...values,
                        amount: amount,
                        total: total,
                        date: date,
                    }
                ]
            };
            await axios.put(`${PROFILE_API_URL}/${_id}`, newProfile);
            message.success('Thêm thành công');
            setHistory(newProfile.schedules);
            form.resetFields();
            setIsVisible(false);
            setSelectedService(null);
        } catch (error: any) {
            console.error('Thêm thất bại:', error);
            if (error.response && error.response.data) {
                message.error(`Thêm thất bại: ${error.response.data.message}`);
            } else {
                message.error('Thêm thất bại. Vui lòng kiểm tra lại dữ li.');
            }
        }
    };

    return {
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
    };
};
