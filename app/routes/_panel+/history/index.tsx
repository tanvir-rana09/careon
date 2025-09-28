// pages/History.jsx
import { Table, Tag, Card, Input, Select, DatePicker, Button } from 'antd';
import { SearchOutlined, DownloadOutlined } from '@ant-design/icons';
import { useState } from 'react';

const History = () => {
  const [searchText, setSearchText] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const historyData = [
    {
      key: '1',
      action: 'User Login',
      user: 'john.smith@company.com',
      timestamp: '2024-01-15 14:30:25',
      ip: '192.168.1.100',
      status: 'success',
      details: 'Successful login from Chrome browser'
    },
    {
      key: '2',
      action: 'Agent Training Started',
      user: 'system',
      timestamp: '2024-01-15 14:25:10',
      ip: 'System',
      status: 'info',
      details: 'Training model: Voice Recognition v2.1'
    },
    {
      key: '3',
      action: 'Failed Login Attempt',
      user: 'unknown@attempt.com',
      timestamp: '2024-01-15 14:20:45',
      ip: '103.145.22.18',
      status: 'failed',
      details: 'Invalid credentials provided'
    }
  ];

  const columns = [
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      sorter: (a, b) => a.action.localeCompare(b.action),
    },
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp',
      sorter: (a, b) => new Date(a.timestamp) - new Date(b.timestamp),
    },
    {
      title: 'IP Address',
      dataIndex: 'ip',
      key: 'ip',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'success' ? 'green' : status === 'info' ? 'blue' : 'red'}>
          {status.toUpperCase()}
        </Tag>
      ),
      filters: [
        { text: 'Success', value: 'success' },
        { text: 'Info', value: 'info' },
        { text: 'Failed', value: 'failed' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Details',
      dataIndex: 'details',
      key: 'details',
    },
  ];

  const filteredData = historyData.filter(item =>
    item.action.toLowerCase().includes(searchText.toLowerCase()) &&
    (typeFilter === 'all' || item.status === typeFilter)
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">System History & Logs</h1>
        <Button icon={<DownloadOutlined />}>Export Logs</Button>
      </div>

      <Card>
        <div className="flex gap-4 mb-4 flex-wrap">
          <Input
            placeholder="Search actions..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-64"
          />
          <Select
            placeholder="Filter by type"
            value={typeFilter}
            onChange={setTypeFilter}
            className="w-40"
            options={[
              { value: 'all', label: 'All Types' },
              { value: 'success', label: 'Success' },
              { value: 'info', label: 'Info' },
              { value: 'failed', label: 'Failed' },
            ]}
          />
          <DatePicker.RangePicker />
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
    </div>
  );
};

export default History;