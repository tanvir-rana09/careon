import { Table, Button, Tag, Space, Card, Input, Checkbox } from 'antd';
import { SearchOutlined, DownloadOutlined, ReloadOutlined, MenuOutlined, RiseOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';

const TranscriptionRecords = () => {
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const transcriptionData = [
    {
      key: '1',
      id: 'e3b24b07...',
      audioFile: 'call_001.wav',
      assistant: 'Transient Assistant',
      assistantId: '1cecede...',
      duration: '5m 23s',
      language: 'English',
      status: 'completed',
      confidence: 95,
      date: 'Sep 28, 2025, 03:41',
      cost: '$0.00',
      type: 'Web',
      endReason: 'Assistant Did Not Receiv...',
      successEval: null
    },
    {
      key: '2',
      id: 'f5ef5fc1...',
      audioFile: 'call_002.wav',
      assistant: 'Bank-customer-service',
      assistantId: '1cecede...',
      duration: '24s',
      language: 'Spanish',
      status: 'failed',
      confidence: 78,
      date: 'Sep 27, 2025, 15:59',
      cost: '$0.02',
      type: 'Web',
      endReason: 'Customer Ended Call',
      successEval: 'fail'
    },
    {
      key: '3',
      id: 'bbbc1017...',
      audioFile: 'call_003.wav',
      assistant: 'Tanisha',
      assistantId: '5b8a9bac...',
      duration: '1m 0s',
      language: 'English',
      status: 'completed',
      confidence: 98,
      date: 'Sep 26, 2025, 17:07',
      cost: '$0.07',
      type: 'Web',
      endReason: 'Assistant Ended Call',
      successEval: 'pass'
    },
    {
      key: '4',
      id: '06d1788d...',
      audioFile: 'call_004.wav',
      assistant: 'Tanisha',
      assistantId: '5b8a9bac...',
      duration: '18s',
      language: 'English',
      status: 'completed',
      confidence: 96,
      date: 'Sep 26, 2025, 17:05',
      cost: '$0.02',
      type: 'Web',
      endReason: 'Assistant Ended Call',
      successEval: 'pass'
    },
    {
      key: '5',
      id: '184dc367...',
      audioFile: 'call_005.wav',
      assistant: 'Bank-customer-service',
      assistantId: '1cecede...',
      duration: '',
      language: 'English',
      status: 'processing',
      confidence: 0,
      date: 'Sep 26, 2025, 10:55',
      cost: '$0.00',
      type: 'Web',
      endReason: 'Assistant Did Not Receiv...',
      successEval: null
    }
  ];

  const columns = [
    {
      title: 'CALL ID',
      dataIndex: 'id',
      key: 'id',
      width: 150,
    },
    {
      title: 'ASSISTANT',
      dataIndex: 'assistant',
      key: 'assistant',
      width: 200,
      render: (text, record) => (
        <div>
          <div className="font-medium">{text}</div>
          <div className="text-gray-400 text-xs">{record.assistantId}</div>
        </div>
      ),
    },
    {
      title: 'ASSISTANT PHONE NUMBER',
      key: 'assistantPhone',
      width: 180,
      render: () => '-',
    },
    {
      title: 'CUSTOMER PHONE NUMBER',
      key: 'customerPhone',
      width: 180,
      render: () => '-',
    },
    {
      title: 'TYPE',
      dataIndex: 'type',
      key: 'type',
      width: 100,
      render: (type) => (
        <Tag color="purple" icon={<span style={{ fontSize: '10px' }}>●</span>}>
          {type}
        </Tag>
      ),
    },
    {
      title: 'ENDED REASON',
      dataIndex: 'endReason',
      key: 'endReason',
      width: 200,
      render: (reason) => {
        let color = 'default';
        if (reason.includes('Customer Ended')) color = 'cyan';
        else if (reason.includes('Assistant Ended')) color = 'blue';
        else if (reason.includes('Did Not Receiv')) color = 'red';
        
        return <Tag color={color}>{reason}</Tag>;
      },
    },
    {
      title: 'SUCCESS EVALUATION',
      dataIndex: 'successEval',
      key: 'successEval',
      render: (evaluation) => {
        if (!evaluation) return null;
        return (
          <Tag color={evaluation === 'pass' ? 'green' : 'red'}>
            {evaluation === 'pass' ? 'Pass' : 'Fail'}
          </Tag>
        );
      },
    },
    {
      title: 'START TIME',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'DURATION',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: 'COST',
      dataIndex: 'cost',
      key: 'cost',
    },
  ];

  const filteredData = transcriptionData.filter(item =>
    item.audioFile.toLowerCase().includes(searchText.toLowerCase()) &&
    (statusFilter === 'all' || item.status === statusFilter)
  );

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys) => {
      setSelectedRowKeys(selectedKeys);
    },
  };

  const filterButtons = [
    'Date and Time',
    'Cost',
    'Call Type',
    'Assistant',
    'Transient Assistant Name',
    'Assistant Phone Number',
    'Customer Phone Number',
    'Call ID',
    'Success Evaluation',
    'Ended Reason',
    'Metadata',
    'Structured Outputs',
    'Assistant Override Variable Values'
  ];

  return (
    <div >
      {/* Top Filter Tabs */}
      <Space size="middle" style={{ marginBottom: '16px' }}>
        <Button type="primary" icon={<MenuOutlined />}>
          All Calls <Tag style={{ marginLeft: 8 }}>201</Tag>
        </Button>
        <Button icon={<RiseOutlined />}>
          Transferred <Tag style={{ marginLeft: 8 }}>61</Tag>
        </Button>
        <Button icon={<CheckCircleOutlined />}>
          Successful <Tag style={{ marginLeft: 8 }}>25</Tag>
        </Button>
        <Button icon={<CloseCircleOutlined />}>
          Failed <Tag style={{ marginLeft: 8 }}>6</Tag>
        </Button>
      </Space>

      <div style={{ color: '#8c8c8c', fontSize: '12px', marginBottom: '16px' }}>
        Quick filters show counts for currently loaded results only.
      </div>

      {/* Filter Pills */}
      <Space size={[8, 8]} wrap style={{ marginBottom: '16px' }}>
        {filterButtons.map((filter, idx) => (
          <Button key={idx} size="small" style={{ borderRadius: '16px' }}>
            ⊗ {filter}
          </Button>
        ))}
      </Space>

      {/* Action Buttons */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginBottom: '16px' }}>
        <Button icon={<ReloadOutlined />}>Refresh</Button>
        <Button icon={<DownloadOutlined />}>Export CSV</Button>
      </div>

      <Card >
        <Table 
          columns={columns} 
          dataSource={filteredData}
          rowSelection={rowSelection}
          pagination={{ 
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `${range[0]}-${range[1]} of ${total} items`
          }}
          scroll={{ x: 1500 }}
          size="middle"
        />
      </Card>
    </div>
  );
};

export default TranscriptionRecords;