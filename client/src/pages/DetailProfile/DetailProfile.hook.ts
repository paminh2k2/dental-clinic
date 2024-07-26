import { Form, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SERVICES_API_URL = 'http://localhost:3001/services';
const PROFILES_API_URL = 'http://localhost:3001/profiles';

interface ServiceType {
    _id?: string;
    service: string;
    price: {
        min: number;
        max: number;
    };
    note: string;
}

interface DataType {
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
        id: number;
        date: string;
        tooth: string;
        schedule: string;
        amount: number;
        price: number;
        discount: number;
        total: number;
        paid: number;
        unpaid: number;
    }[];
}

export const useDetailProfile = (id: string) => {
    const records = [
        'Chảy máu nướu khi đánh răng',
        'HA ........',
        'Tiểu đường',
        'Bệnh bao tử ( dạ dày)',
        'Suyễn',
        'Bệnh lao',
        'Có dị ứng thuốc nào không?',
        'Có đang uống thuốc điều trị bệnh gì không?',
        'Phái nữ: có đang mang thai không?'
    ];

    const currencyFormatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0
    });

    const navigate = useNavigate();

    const [form] = Form.useForm();
    const [data, setData] = useState<DataType | undefined>(undefined);
    const [history, setHistory] = useState<DataType['schedules']>([]);
    const [ isVisible, setIsVisible ] = useState(false);
    const [ isVisiblePay, setIsVisiblePay ] = useState(false)
    const [services, setServices] = useState<ServiceType[]>([]);
    const [selectedService, setSelectedService] = useState<ServiceType | null>(null);
    const [year, count] = id.split('.').map(Number);
    const [ curID, setCurID ] = useState(0)
   

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${PROFILES_API_URL}/byCode`, {
                    params: { year, count }
                });
                setData(response.data);
                setHistory(response.data.schedules);
            } catch (error) {
                console.error('Failed to fetch profile:', error);
            }
        };

        const fetchServices = async () => {
            try {
                const res = await axios.get(SERVICES_API_URL);
                setServices(res.data);
            } catch (error) {
                message.error('Error fetching services. Please try again!');
            }
        };
        fetchData();
        fetchServices();
    }, [year, count, history]);

    const handleBack = () => {
        navigate('/profiles');
    };

    const handleUpdateRecords = async () => {
        try {
            const updatedRecords = form.getFieldValue('record');
            const res = await axios.get(`${PROFILES_API_URL}/byCode`, {
                params: { year, count }
            });
            res.data.record = updatedRecords;
            const newProfile = { ...res.data };
            await axios.put(`${PROFILES_API_URL}/${newProfile._id}`, newProfile);
            message.success('Cập nhật thành công!');
        } catch (error: any) {
            console.error('Cập nhật thất bại', error);
            if (error.response && error.response.data) {
                message.error(`Cập nhật thất bại: ${error.response.data.message}`);
            } else {
                message.error('Cập nhật thất bại. Vui lòng kiểm tra lại dữ liệu!');
            }
        }
    };
    //Modal Schedule
    const showModal = () => {
        setIsVisible(true);
    };

    const handleCancel = () => {
        form.resetFields();
        setIsVisible(false);
        setSelectedService(null);
    };

    const handleChangeService = (value: string) => {
        const service = services.find(item => item.service === value);
        form.setFieldsValue({ price: service?.price.min });
        setSelectedService(service || null);
    };

    const handleAddSchedule = async () => {
        try {
            const values = await form.validateFields();
            const amountTooth = (values.tooth.match(/,/g) || []).length + 1;
            const total = amountTooth * (selectedService?.price.min || 0) - values.discount;

            if (!data) {
                throw new Error('Profile data is not available');
            }

            const newProfile = {
                ...data,
                schedules: [
                    ...history,
                    {
                        ...values,
                        id:data.schedules.length + 1,
                        amount: amountTooth,
                        total,
                        paid: 0,
                        unpaid: total
                    }
                ]
            };

            await axios.put(`${PROFILES_API_URL}/${data._id}`, newProfile);
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
                message.error('Thêm thất bại. Vui lòng kiểm tra lại dữ liệu!');
            }
        }
    };
    //Modal Pay
    const handleCancelPay = () => {
        setIsVisiblePay(false)
    }

    const onOpenPay = (schedule: any) => {
        setIsVisiblePay(true)
        setCurID(schedule.id)
    }

    const onPay = async () => {
        try {
            const paid = await form.validateFields();
            history[curID-1].paid = paid
            history[curID-1].unpaid = history[curID-1].total - paid
            const newProfile = {
                ...data,
                schedules: [...history]
            }
            await axios.put(`${PROFILES_API_URL}/${data?._id}`, newProfile);
            message.success('Thêm thành công');
            setHistory(newProfile.schedules);
            form.resetFields();
            setIsVisiblePay(false);
        } catch (error: any) {
            message.error('Cập nhật thất bại!', error.message);
        }
    }
    
    return {
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
    };
};
