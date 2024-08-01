import { Form, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const API_URL = 'http://localhost:3001/services';

interface DataType {
    _id?: string;
    service: string;
    price: {
        min: number;
        max: number;
    };
    note: string;
}

export const useServices = () => {
    const [data, setData] = useState<DataType[]>([]);
    const [isVisible, setIsVisible] = useState(false);
    const [editingService, setEditingService] = useState<DataType | null>(null);
    const [form] = Form.useForm<DataType>();

    const currencyFormatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0
    });

    const fetchServices = async () => {
        try {
            const response = await axios.get(API_URL);
            setData(response.data);
        } catch (error) {
            console.error('Failed to fetch services: ', error);
            message.error('Error fetching services. Please try again.');
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const showModal = () => {
        setIsVisible(true);
    };

    const handleAddOrUpdateService = async () => {
        try {
            const values = await form.validateFields();
            const newService = { ...values, note: (values.note ? values.note : '')};
            console.log(newService);

            if (editingService) {
                // Update service
                await axios.put(`${API_URL}/${editingService._id}`, newService);
                message.success('Service updated successfully');
            } else {
                // Add service
                await axios.post(API_URL, newService);
                message.success('Service added successfully');
            }
            
            await fetchServices();
            setIsVisible(false);
            form.resetFields();
            setEditingService(null);
        } catch (error: any) {
            console.error('Failed to add/update service:', error);
            if (error.response && error.response.data) {
                message.error(`Failed to add/update service: ${error.response.data.message}`);
            } else {
                message.error('Failed to add/update service. Please check the input data.');
            }
        }
    };

    const handleCancel = () => {
        form.resetFields();
        setIsVisible(false);
    };

    const handleEditService = (service: DataType) => {
        setEditingService(service);
        form.setFieldsValue(service);
        showModal();
    };

    const handleDeleteService = async (service: DataType) => {
        try {
            await axios.delete(`${API_URL}/${service._id}`);
            setData(data.filter(item => item._id !== service._id));
            message.success('Service deleted successfully');
        } catch (error) {
            console.error('Failed to delete service:', error);
            message.error('Failed to delete service. Please try again.');
        }
    };

    return {
        data,
        isVisible,
        form,
        currencyFormatter,
        showModal,
        handleAddOrUpdateService,
        handleCancel,
        handleEditService,
        handleDeleteService
    };
};
