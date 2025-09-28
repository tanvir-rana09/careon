// pages/Dashboard.jsx
import { Card, Row, Col, Statistic, Table, Tag, Progress } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, UserOutlined, PhoneOutlined, FileTextOutlined, RocketOutlined } from '@ant-design/icons';

const Dashboard = () => {
  const recentActivities = [
    {
      key: '1',
      action: 'New transcription',
      user: 'John Doe',
      time: '2 min ago',
      status: 'completed'
    },
    {
      key: '2',
      action: 'Agent training',
      user: 'System',
      time: '5 min ago',
      status: 'processing'
    },
    {
      key: '3',
      action: 'Phone number added',
      user: 'Jane Smith',
      time: '10 min ago',
      status: 'completed'
    }
  ];

  const columns = [
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    },
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'completed' ? 'green' : 'blue'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      
      {/* Statistics Cards */}
      <Row gutter={16} className="mb-6">
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Agents"
              value={28}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#3f8600' }}
              suffix={<ArrowUpOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Active Calls"
              value={12}
              prefix={<PhoneOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Transcriptions"
              value={1.234}
              prefix={<FileTextOutlined />}
              precision={2}
              valueStyle={{ color: '#1890ff' }}
              suffix="k"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Training Progress"
              value={75}
              prefix={<RocketOutlined />}
              suffix="%"
            />
            <Progress percent={75} size="small" />
          </Card>
        </Col>
      </Row>

      {/* Recent Activities */}
      <Card title="Recent Activities" className="mb-6">
        <Table 
          dataSource={recentActivities} 
          columns={columns} 
          pagination={{ pageSize: 5 }}
          size="small"
        />
      </Card>

      {/* Quick Stats */}
      <Row gutter={16}>
        <Col span={12}>
          <Card title="System Health">
            <Progress percent={90} status="active" />
            <Progress percent={75} status="active" />
            <Progress percent={60} status="active" />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Performance Metrics">
            <div className="space-y-4">
              <div>
                <span>Response Time: </span>
                <Progress percent={85} />
              </div>
              <div>
                <span>Accuracy: </span>
                <Progress percent={92} />
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;