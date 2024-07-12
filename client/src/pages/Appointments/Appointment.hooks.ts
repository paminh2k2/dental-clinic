import dayjs, {Dayjs} from 'dayjs'
import { useState } from 'react'
import { initalData } from './data'
import { Form, message, Button } from 'antd'
import { title } from 'process'

export const useAppointments = () => {
    const [data, setData] = useState(initalData)
    const [isVisible, setIsVisible] = useState(false)
    const [ isEdit , setIsEdit ] = useState(false)
    const [ editingKey, setEditingKey ] = useState('')
    const [form] = Form.useForm()

    const showModal = () => {
        setIsVisible(true)
    }

    const handleCancel = () => {
        setIsVisible(false)
        form.resetFields()
    }

    const handleAdd = () => {
        form.validateFields()
            .then( values => {
                const date: Dayjs = values.date
                const time: Dayjs = values.time

                const newAppointment = {
                    key: (data.length + 1).toString(),
                    name: values.name,
                    date: date,
                    time: time,
                    services: values.services
                }

                setData([...data, newAppointment])
                message.success('Add appointment successfully')
                setIsVisible(false)
                form.resetFields()
            })
            .catch(info => {
                message.error('Please fill all required fields')
            })
    }

    const handleDelete = ( key: string ) => {
        const newData = data.filter( item => item.key !== key )
        setData( newData )
        message.success('Appointment deleted successfully!')
    }

    const handleEdit = (record: any) => {
        setIsEdit(true);
        setEditingKey(record.key);
        setIsVisible(true);
        form.setFieldsValue({
            name: record.name,
            date: dayjs(record.date),
            time: dayjs(record.time),
            services: record.services
        });
    };

    return {
        data,
        isVisible,
        isEdit,
        editingKey,
        form,
        showModal,
        handleCancel,
        handleAdd,
        handleDelete,
        handleEdit,
    }
}