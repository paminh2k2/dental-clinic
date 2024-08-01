import { Form, message } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';

const SERVICES_API_URL = 'http://localhost:3001/services';
const APPOINTMENT_API_URL = 'http://localhost:3001/appointments';

interface ServiceType {
    _id?: string;
    service: string;
    price: {
        min: number;
        max: number;
    };
    note: string;
}

interface AppointmentType {
    _id: string
    fullname: string
    date: string
    time: string
    services: string[]
}

export const useAppointments = () => {
    const [form] = Form.useForm()
    const [services, setServices] = useState<ServiceType[]>([]);
    const [data, setData] = useState<AppointmentType[]>()
    const [isVisibleAdd, setIsVisibleAdd] = useState(false)
    const [isVisibleEdit, setIsVisibleEdit] = useState(false)
    const [ editingKey, setEditingKey ] = useState('')
    const [ appointmentSelected, setAppointmentSelected ] = useState<AppointmentType>()
    useEffect(() => {

        const fetchData = async () => {
            try {
                const res = await axios.get(APPOINTMENT_API_URL)
                setData(res.data)
            } catch (error) {
                message.error('Error fetching appointment. Please try again!')
            }
        }

        const fetchServices = async () => {
            try {
                const res = await axios.get(SERVICES_API_URL)
                setServices(res.data)
            } catch (error) {
                message.error('Error fetching services. Please try again!')
            }
        }
        fetchData()
        fetchServices()
    }, [data])
    //Show modal
    const showModalAdd = () => {
        setIsVisibleAdd(true)
    }

    const showModalEdit = (record: any) => {
        setIsVisibleEdit(true)
        setAppointmentSelected(record)
        setEditingKey(record.key);
        setIsVisibleEdit(true);
        form.setFieldsValue({
            date: record.date,
            time: record.time,
            services: record.services
        });
    }
    // Cancel modal
    const handleCancelAdd = () => {
        setIsVisibleAdd(false)
        form.resetFields()
    }

    const handleCancelEdit = () => {
        setIsVisibleEdit(false)
        form.resetFields()
    }
    // Add modal
    const handleAdd = async () => {
        try {
            const values =await form.validateFields()
            const newAppointment = {
                ...values
            }
            await axios.post(APPOINTMENT_API_URL, newAppointment)
            message.success('Thêm thành công');
            form.resetFields()
            setIsVisibleAdd(false)
        } catch (error) {
            console.error('Thêm thất bại:', error)
        }
        
    }

    // Edit modal
    const handleEdit = async () => {
        try {
            const values = await form.validateFields()
            const editAppointment = {
                ...values
            }
            await axios.put(`${APPOINTMENT_API_URL}/${appointmentSelected?._id}`, editAppointment)
            message.success('Chỉnh sửa thành công')
            form.resetFields()
            setIsVisibleEdit(false)
        } catch (error) {
            console.error('Chỉnh sửa thất bại:', error)
        }
    };
    // Delete modal
    const handleDelete = async (record: any) => {
        try {
            await axios.delete(`${APPOINTMENT_API_URL}/${record._id}`)
            const res = await axios.get(APPOINTMENT_API_URL)
            setData(res.data)
        } catch (error: any) {
            message.error('Xóa thất bại:', error)
        }
    }

    return {
        form,
        services,
        data,
        isVisibleAdd,
        isVisibleEdit,
        editingKey,
        appointmentSelected,
        showModalAdd,
        showModalEdit,
        handleCancelAdd,
        handleCancelEdit,
        handleAdd,
        handleEdit,
        handleDelete,
    }
}