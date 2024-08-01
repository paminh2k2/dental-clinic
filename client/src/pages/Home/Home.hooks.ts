import { Form, message } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';

const APPOINTMENTS_API_URL =  'http://localhost:3001/appointments';
const SERVICES_API_URL =  'http://localhost:3001/services';

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
    fullname: string;
    date: string;
    time: string;
    services: string[]
}

export const useHome = () => {
    const [form] = Form.useForm()
    const [ data, setData] = useState<DataType[]>([])
    const [ services, setServices ] = useState<ServiceType[]>([])
    const [isVisible, setIsVisible] = useState(false)
    const [ appointmentSelected, setAppointmentSelected ] = useState<DataType>()

    useEffect(() => {
        const fecthData = async () => {
            const today = new Date()
            const todayString = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;
            try {
                const res = await axios.get(APPOINTMENTS_API_URL)
                setData(res.data.filter((item: DataType) => (item.date === todayString)))
            } catch (error) {
                message.error('Error fetching appointments. Please try again')
            }
        }

        const fetchServices = async () => {
            try {
                const res = await axios.get(SERVICES_API_URL)
                setServices(res.data)
            } catch (error) {
                message.error('Error fetching services. Please try again')
            }
        }
        fecthData()
        fetchServices()
    }, [data])

    const showModal = (record: any) => {
        setIsVisible(true)
        setAppointmentSelected(record)
        form.setFieldsValue({
            date: record.date,
            time: record.time,
            services: record.services
        });
    }

    const handleCancel = () => {
        setIsVisible(false)
        form.resetFields()
    }

    const handleCompleted = async ( record: any ) => {
        try {
            await axios.delete(`${APPOINTMENTS_API_URL}/${record._id}`)
            const res = await axios.get(APPOINTMENTS_API_URL)
            setData(res.data)
        } catch (error: any) {
            message.error('Hành động thất bại:', error)
        }
    }

    const handleEdit = async () => {
        try {
            const values = await form.validateFields()
            const editAppointment = {
                ...values
            }
            await axios.put(`${APPOINTMENTS_API_URL}/${appointmentSelected?._id}`, editAppointment)
            message.success('Chỉnh sửa thành công')
            form.resetFields()
            setIsVisible(false)
        } catch (error) {
            console.error('Chỉnh sửa thất bại:', error)
        }
    };

    return {
        data,
        services,
        form,
        isVisible,
        appointmentSelected,
        showModal,
        handleCancel,
        handleCompleted,
        handleEdit,
    }
}