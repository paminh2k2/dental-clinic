import { Form, message } from 'antd';
import axios from "axios";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:3001/profiles';

interface ProfileType {
  _id:string
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
    paid: number;
    unpaid: number;
  }[]
}

export const useProfilesList = () => {
  const [data, setData] = useState<ProfileType[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [form] = Form.useForm<ProfileType>(); // Specify form values type
  const [id, setId] = useState<string>('');

  const navigate = useNavigate()

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
      const newProfile = {
        fullname: values.fullname,
        yearofbirth: (values.yearofbirth ? values.yearofbirth : ''),
        sex: values.sex,
        job: (values.job ? values.job : ''),
        phone: (values.phone ? values.phone : ''),
        address: (values.address ? values.address : ''),
        code: newCode
      }
      console.log(newProfile)
      // Add Profile
      await axios.post(API_URL,newProfile)
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
    const profileId = record.code.year + '.' + record.code.count;
    setId(profileId);
    navigate(`/profiles/${profileId}`);
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
