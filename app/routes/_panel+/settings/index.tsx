// pages/Settings.jsx
import { Card, Form, Input, Button, Switch, Select, Divider, notification } from 'antd';
import { SaveOutlined } from '@ant-design/icons';

const Settings = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Settings saved:', values);
    notification.success({
      message: 'Settings Saved',
      description: 'Your settings have been successfully updated.',
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">System Settings</h1>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          notifications: true,
          autoSave: false,
          language: 'en',
          timezone: 'UTC-5'
        }}
      >
        <Card title="General Settings" className="mb-6">
          <div className="grid grid-cols-2 gap-6">
            <Form.Item
              label="System Name"
              name="systemName"
              rules={[{ required: true, message: 'Please input system name!' }]}
            >
              <Input placeholder="Enter system name" />
            </Form.Item>

            <Form.Item
              label="Timezone"
              name="timezone"
            >
              <Select
                options={[
                  { value: 'UTC-5', label: 'EST (UTC-5)' },
                  { value: 'UTC-8', label: 'PST (UTC-8)' },
                  { value: 'UTC+0', label: 'GMT (UTC+0)' },
                ]}
              />
            </Form.Item>

            <Form.Item
              label="Default Language"
              name="language"
            >
              <Select
                options={[
                  { value: 'en', label: 'English' },
                  { value: 'es', label: 'Spanish' },
                  { value: 'fr', label: 'French' },
                ]}
              />
            </Form.Item>

            <Form.Item
              label="API Key"
              name="apiKey"
            >
              <Input.Password placeholder="Enter API key" />
            </Form.Item>
          </div>
        </Card>

        <Card title="Notification Settings" className="mb-6">
          <Form.Item
            name="notifications"
            valuePropName="checked"
            label="Enable Notifications"
          >
            <Switch />
          </Form.Item>

          <Form.Item
            name="emailNotifications"
            valuePropName="checked"
            label="Email Notifications"
          >
            <Switch />
          </Form.Item>

          <Form.Item
            name="soundNotifications"
            valuePropName="checked"
            label="Sound Alerts"
          >
            <Switch />
          </Form.Item>
        </Card>

        <Card title="System Preferences" className="mb-6">
          <Form.Item
            name="autoSave"
            valuePropName="checked"
            label="Auto-save Changes"
          >
            <Switch />
          </Form.Item>

          <Form.Item
            name="backupInterval"
            label="Backup Interval"
          >
            <Select
              options={[
                { value: 'daily', label: 'Daily' },
                { value: 'weekly', label: 'Weekly' },
                { value: 'monthly', label: 'Monthly' },
              ]}
            />
          </Form.Item>

          <Form.Item
            name="sessionTimeout"
            label="Session Timeout (minutes)"
          >
            <Input type="number" min={1} max={480} />
          </Form.Item>
        </Card>

        <Divider />

        <div className="flex justify-end">
          <Button type="primary" htmlType="submit" icon={<SaveOutlined />} size="large">
            Save Settings
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Settings;