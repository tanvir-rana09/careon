import { Table, Button, Tag, Space, Card, Input, Select, Switch, Modal, DatePicker } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, PhoneOutlined } from '@ant-design/icons';
import { useState } from 'react';

const PhoneNumbers = () => {
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ number: '', addedDate: '', status: 'active' });
  const [errors, setErrors] = useState({});

  const [phoneData, setPhoneData] = useState([
    {
      key: '1',
      number: '+1 (555) 123-4567',
      status: 'active',
      addedDate: '2024-01-10'
    },
    {
      key: '2',
      number: '+1 (555) 987-6543',
      status: 'active',
      addedDate: '2024-01-12'
    },
    {
      key: '3',
      number: '+44 20 7946 0958',
      status: 'inactive',
      addedDate: '2024-01-08'
    }
  ]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setFormData({ number: '', addedDate: '', status: 'active' });
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.number) {
      newErrors.number = 'Please input phone number!';
    } else if (!/^\+?[\d\s()-]+$/.test(formData.number)) {
      newErrors.number = 'Please enter a valid phone number!';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOk = () => {
    if (validateForm()) {
      const newPhone = {
        key: String(phoneData.length + 1),
        number: formData.number,
        status: formData.status || 'active',
        addedDate: formData.addedDate || new Date().toISOString().split('T')[0]
      };
      setPhoneData([...phoneData, newPhone]);
      setIsModalOpen(false);
      setFormData({ number: '', addedDate: '', status: 'active' });
      setErrors({});
    }
  };

  const handleDelete = (key) => {
    setPhoneData(phoneData.filter(item => item.key !== key));
  };

  const handleStatusChange = (key, checked) => {
    setPhoneData(phoneData.map(item => 
      item.key === key ? { ...item, status: checked ? 'active' : 'inactive' } : item
    ));
  };

  const columns = [
    {
      title: 'Phone Number',
      dataIndex: 'number',
      key: 'number',
      render: (number) => (
        <Space>
          <PhoneOutlined style={{ color: '#1890ff' }} />
          <span style={{ fontFamily: 'monospace' }}>{number}</span>
        </Space>
      ),
      sorter: (a, b) => a.number.localeCompare(b.number),
    },
    {
      title: 'Added Date',
      dataIndex: 'addedDate',
      key: 'addedDate',
      sorter: (a, b) => new Date(a.addedDate) - new Date(b.addedDate),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => (
        <Space>
          <Switch 
            checked={status === 'active'} 
            onChange={(checked) => handleStatusChange(record.key, checked)}
          />
          <Tag color={status === 'active' ? 'green' : 'red'}>
            {status.toUpperCase()}
          </Tag>
        </Space>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} size="small">Edit</Button>
          <Button 
            icon={<DeleteOutlined />} 
            size="small" 
            danger
            onClick={() => handleDelete(record.key)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const filteredData = phoneData.filter(item =>
    item.number.toLowerCase().includes(searchText.toLowerCase()) &&
    (statusFilter === 'all' || item.status === statusFilter)
  );

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Phone Numbers Management</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
          Add Number
        </Button>
      </div>

      <Card>
        <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
          <Input
            placeholder="Search phone numbers..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: '256px' }}
          />
          <Select
            placeholder="Filter by status"
            value={statusFilter}
            onChange={setStatusFilter}
            style={{ width: '160px' }}
            options={[
              { value: 'all', label: 'All Status' },
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' },
            ]}
          />
        </div>

        <Table 
          columns={columns} 
          dataSource={filteredData}
          pagination={{ 
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `Showing ${range[0]}-${range[1]} of ${total} items`
          }}
        />
      </Card>

      <Modal
        title="Add New Phone Number"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Add Number"
        cancelText="Cancel"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
              Phone Number <span style={{ color: 'red' }}>*</span>
            </label>
            <Input
              prefix={<PhoneOutlined />}
              placeholder="+1 (555) 123-4567"
              value={formData.number}
              onChange={(e) => setFormData({ ...formData, number: e.target.value })}
              status={errors.number ? 'error' : ''}
            />
            {errors.number && (
              <div style={{ color: '#ff4d4f', fontSize: '12px', marginTop: '4px' }}>
                {errors.number}
              </div>
            )}
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
              Added Date
            </label>
            <DatePicker
              style={{ width: '100%' }}
              onChange={(date, dateString) => setFormData({ ...formData, addedDate: dateString })}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
              Status
            </label>
            <Select
              style={{ width: '100%' }}
              value={formData.status}
              onChange={(value) => setFormData({ ...formData, status: value })}
              options={[
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' },
              ]}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PhoneNumbers;