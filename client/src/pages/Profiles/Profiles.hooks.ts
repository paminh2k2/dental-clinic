import { useState, useEffect } from 'react';
import { Form, message } from 'antd';
import axios from "axios";

const API_URL = 'http://localhost:3001/profiles';

interface ProfileType {
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

export const useProfiles = () => {
  const [data, setData] = useState<ProfileType[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [form] = Form.useForm<ProfileType>(); // Specify form values type
  const [id, setId] = useState<string>('');



  useEffect(() => {
    const fetchData = async () => {
      try {
        const profiles = await axios.get(API_URL)
        setData(profiles.data);
      } catch (err) {
        console.error('Failed to fetch profiles:', err);
      }
    };
    fetchData();
  }, []);

  const showModal = () => {
    setIsVisible(true);
  };

  const handleCancel = () => {
    setIsVisible(false);
    form.resetFields();
  };

  const handleAddProfile = async () => {
    try {
      const currentYear = ( new Date().getFullYear() ) % 100
      const values = await form.validateFields();
      const profiles = await axios.get(API_URL);
      const yearProfiles = profiles.data.filter(
        (profile: ProfileType) => profile.code.year === currentYear
      )

      const count = yearProfiles.length + 1
      const newCode = {year:currentYear, count: count}
      const newProfile = {...values,code: newCode}
      // Add Profile
      const response = await axios.post(API_URL,newProfile)
      console.log(response)
      // Update Profiles
      const updatedProfiles = await axios.get(API_URL)
      setData(updatedProfiles.data);
      message.success('Profile added successfully');
      setIsVisible(false);
      form.resetFields();
    } catch (error) {
      message.error('Failed to add profile');
    }
  };

  const handleRowClick = (record: ProfileType) => {
    setId((record.code.year+ '.' + record.code.count));
  };

  const handleBack = () => {
    setId('')
  }

  return {
    data,
    form,
    isVisible,
    showModal,
    handleCancel,
    handleAddProfile,
    handleRowClick,
    handleBack,
    id,
  };
};
