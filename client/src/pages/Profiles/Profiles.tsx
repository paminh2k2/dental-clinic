import React, { useState } from 'react';
import { Button, Form, Input, Layout, Modal, Select, Table, message } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import Profile from '~/components/Profile/Profile';
import { useProfiles } from './Profiles.hooks';
import { ArrowLeftOutlined } from '@ant-design/icons';
const { Column } = Table;

interface ProfileType {
  code: {year: number, count: number};
  fullname: string;
  yearofbirth: string;
  sex:string;
  job: string;
  phone: string;
  address: string;
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

const Profiles: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const {
    data,
    form,
    isVisible,
    showModal,
    handleRowClick,
    handleAddProfile,
    handleCancel,
    handleBack,
    id,
  } = useProfiles();

  const filteredProfiles = data.filter(profile =>
    profile.fullname.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const profile = data.filter(pf => (pf.code.year + '.' + pf.code.count) === id)

  return (
    <Layout.Content className='py-3 px-6 mx-3'>
      {id ? (
        <div className='mt-1 bg-white rounded-lg h-[44rem] overflow-y-auto p-3'>
          <Button icon={<ArrowLeftOutlined />} onClick={handleBack}/>
          
          <Profile { ...profile[0]} />
        </div>
      ) : (
      <div>
        <div className='flex justify-between'>
          <Input
            placeholder='Nhập tên khách hàng'
            className='w-80'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button icon={<PlusCircleOutlined />} type='primary' onClick={showModal}>
            Add Profile
          </Button>
        </div>
        <div className='mt-2 bg-white rounded-lg h-[41rem] overflow-y-auto'>
              <Table
                virtual
                pagination={false}
                scroll={{ y: 600, x: 1080 }}
                dataSource={filteredProfiles}
                rowKey={(record: ProfileType) => (record.code.year + (record.code.count< 10 ? '.0' :  '.') + record.code.count)!} // _id as unique key
                onRow={(record: ProfileType) => ({
                  onClick: () => handleRowClick(record),
                })}
              >
                <Column key='code' title='Mã Hồ sơ' dataIndex='code' render={(code) => {
                  return (<p>{code.year +(code.count< 10 ? '.0' :  '.') + code.count}</p>)
                }}/>
                <Column key='fullname' title='Họ và tên' dataIndex='fullname' />
                <Column key='yearofbirth' title='Năm sinh' dataIndex='yearofbirth' />
                <Column 
                  key='sex' 
                  title='Giới tính' 
                  dataIndex='sex' 
                  render={(sex)=> {
                    if(sex ==='male') {
                      return <p>Nam</p>
                    } else {
                      return <p>Nữ</p>
                    }
                  }
                  }
                />
                <Column key='job' title='Nghề nghiệp' dataIndex='job' />
                <Column key='phone' title='Số điện thoại' dataIndex='phone' />
                <Column key='address' title='Địa chỉ' dataIndex='address' />
              </Table> 
        </div>
        <Modal
          title='Tạo hồ sơ bệnh nhân'
          visible={isVisible}
          onCancel={handleCancel}
          onOk={handleAddProfile}
        >
          <Form
            form={form} 
            layout='vertical' 
            requiredMark='optional'
          >
            <Form.Item
              key='fullname'
              name='fullname'
              label='Họ và tên'
              rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
            >
              <Input placeholder="Nhập họ và tên" />
            </Form.Item>
            <Form.Item
              key='yearofbirth'
              name='yearofbirth'
              label='Năm sinh'
              rules={[{ required: true, message: "Vui lòng chọn năm sinh!" }]}
            >
              <Input placeholder='Nhập năm sinh' />
            </Form.Item>
            <Form.Item
              key='sex'
              name='sex'
              label='Giới tính'
              rules={[{ required: true, message: "Vui lòng chọn giới tính!" }]}
            >
              <Select
                placeholder='Vui long chọn giới tính'
                options={[
                  {value:'male', label: 'Nam'},
                  {value:'fmale', label: 'Nữ'},
                ]}
              />
            </Form.Item>
            <Form.Item
              key='job'
              name='job'
              label='Nghề nghiệp'
              rules={[{ required: true, message: "Vui lòng nhập nghề nghiệp!" }]}
            >
              <Input placeholder='Nhập nghề nghiệp'/>
            </Form.Item>
            <Form.Item
              key='phone'
              name='phone'
              label='Số điện thoại'
              rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
            >
              <Input placeholder='Nhập số điện thoại'/>
            </Form.Item>
            <Form.Item
              key='address'
              name='address'
              label='Địa chỉ'
              rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
            >
              <Input placeholder='Nhập địa chỉ'/>
            </Form.Item>
          </Form>
        </Modal>
      </div>

      )}
    </Layout.Content>
  );
};

export default Profiles