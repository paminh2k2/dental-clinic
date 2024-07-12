import { Form, message } from "antd";
import axios from "axios";
import { setsEqual } from "chart.js/dist/helpers/helpers.core";
import { useEffect, useState } from "react"

const SERVICES_API_URL = 'http://localhost:3001/services'

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

interface ServiceType {
    value: string,
    label: string
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

export const useProfile = ( { code, fullname, yearofbirth, sex, job, phone, address,record, schedules }: ProfileProps) => {
    const [records, setRecords] = useState<string[]>(initRecord)
    const [ isVisible, setIsVisible ] = useState(false)
    const [ services, setServices ] = useState<ServiceType[]>()
    const [ form ] = Form.useForm()

    const fetchServices = async () => {
        try {
            const res = await axios.get(SERVICES_API_URL)
            setServices(res.data.map((item: any) => {
                return {value: item.service, label: item.service}
            }))
        } catch (error) {
            message.error('Error fetching services. Please try again!')
        }
    }

    useEffect(()=> {
        fetchServices()
    }, [])

    const handleOpen = () => {
        setIsVisible(true)
    }


    // Turn off modal
    const handleCancel = () => {
        form.resetFields()
        setIsVisible(false)
    }

    const handleAddSchedule = () => {
        setIsVisible(false)
    }

    return {
        records,
        isVisible,
        services,
        form,
        handleOpen,
        handleCancel,
        handleAddSchedule
    }
}
