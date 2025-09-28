// pages/MyAccount.jsx
import { Card, Form, Input, Button, Upload, Avatar, Divider, notification, Switch, Select } from 'antd';
import { SaveOutlined, UploadOutlined, UserOutlined, MailOutlined, PhoneOutlined, LockOutlined } from '@ant-design/icons';
import { useState } from 'react';

const MyAccount = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('/images/avatar-default.png');

  const userData = {
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@company.com',
    phone: '+1 (555) 123-4567',
    position: 'System Administrator',
    department: 'IT',
    joinDate: '2023-01-15',
    lastLogin: '2024-01-15 14:30:25'
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Profile updated:', values);
      notification.success({
        message: 'Profile Updated',
        description: 'Your profile has been successfully updated.',
      });
    } catch (error) {
      notification.error({
        message: 'Update Failed',
        description: 'There was an error updating your profile.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = (info) => {
    if (info.file.status === 'done') {
      // Simulate avatar upload
      const url = URL.createObjectURL(info.file.originFileObj);
      setAvatarUrl(url);
      notification.success({
        message: 'Avatar Updated',
        description: 'Your profile picture has been updated.',
      });
    }
  };

  const uploadProps = {
    name: 'avatar',
    listType: 'picture',
    showUploadList: false,
    beforeUpload: (file) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        notification.error({
          message: 'Invalid File',
          description: 'You can only upload JPG/PNG files!',
        });
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        notification.error({
          message: 'File Too Large',
          description: 'Image must be smaller than 2MB!',
        });
      }
      return isJpgOrPng && isLt2M;
    },
    onChange: handleAvatarChange,
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Account</h1>
        <Button 
          type="primary" 
          icon={<SaveOutlined />} 
          loading={loading}
          onClick={() => form.submit()}
        >
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Picture Section */}
        <Card title="Profile Picture" className="lg:col-span-1">
          <div className="flex flex-col items-center space-y-4">
            <Avatar 
              size={120} 
              src={avatarUrl} 
              icon={<UserOutlined />}
              className="border-4 border-blue-100"
            />
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>Upload New Photo</Button>
            </Upload>
            <p className="text-gray-500 text-sm text-center">
              Recommended: Square JPG or PNG, max 2MB
            </p>
          </div>
        </Card>

        {/* Personal Information Section */}
        <Card title="Personal Information" className="lg:col-span-2">
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={userData}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[{ required: true, message: 'Please input your first name!' }]}
              >
                <Input 
                  prefix={<UserOutlined className="text-gray-400" />} 
                  placeholder="First Name" 
                />
              </Form.Item>

              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[{ required: true, message: 'Please input your last name!' }]}
              >
                <Input 
                  prefix={<UserOutlined className="text-gray-400" />} 
                  placeholder="Last Name" 
                />
              </Form.Item>

              <Form.Item
                label="Email Address"
                name="email"
                rules={[
                  { required: true, message: 'Please input your email!' },
                  { type: 'email', message: 'Please enter a valid email!' }
                ]}
              >
                <Input 
                  prefix={<MailOutlined className="text-gray-400" />} 
                  placeholder="Email Address" 
                  type="email"
                />
              </Form.Item>

              <Form.Item
                label="Phone Number"
                name="phone"
              >
                <Input 
                  prefix={<PhoneOutlined className="text-gray-400" />} 
                  placeholder="Phone Number" 
                />
              </Form.Item>

              <Form.Item
                label="Position"
                name="position"
              >
                <Input placeholder="Your Position" />
              </Form.Item>

              <Form.Item
                label="Department"
                name="department"
              >
                <Select
                  options={[
                    { value: 'IT', label: 'IT' },
                    { value: 'Sales', label: 'Sales' },
                    { value: 'Support', label: 'Support' },
                    { value: 'Marketing', label: 'Marketing' },
                    { value: 'HR', label: 'HR' },
                  ]}
                />
              </Form.Item>
            </div>
          </Form>
        </Card>

        {/* Account Settings Section */}
        <Card title="Account Settings" className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-4">Security & Privacy</h3>
              <Form layout="vertical">
                <Form.Item
                  label="Two-Factor Authentication"
                  name="twoFactor"
                  valuePropName="checked"
                >
                  <Switch checkedChildren="On" unCheckedChildren="Off" />
                </Form.Item>

                <Form.Item
                  label="Login Notifications"
                  name="loginNotifications"
                  valuePropName="checked"
                >
                  <Switch checkedChildren="On" unCheckedChildren="Off" />
                </Form.Item>

                <Form.Item
                  label="Privacy Mode"
                  name="privacyMode"
                  valuePropName="checked"
                >
                  <Switch checkedChildren="On" unCheckedChildren="Off" />
                </Form.Item>
              </Form>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Preferences</h3>
              <Form layout="vertical">
                <Form.Item
                  label="Language"
                  name="language"
                >
                  <Select
                    options={[
                      { value: 'en', label: 'English' },
                      { value: 'es', label: 'Spanish' },
                      { value: 'fr', label: 'French' },
                      { value: 'de', label: 'German' },
                    ]}
                  />
                </Form.Item>

                <Form.Item
                  label="Timezone"
                  name="timezone"
                >
                  <Select
                    options={[
                      { value: 'est', label: 'Eastern Time (EST)' },
                      { value: 'pst', label: 'Pacific Time (PST)' },
                      { value: 'gmt', label: 'Greenwich Mean Time (GMT)' },
                      { value: 'cet', label: 'Central European Time (CET)' },
                    ]}
                  />
                </Form.Item>

                <Form.Item
                  label="Email Frequency"
                  name="emailFrequency"
                >
                  <Select
                    options={[
                      { value: 'realtime', label: 'Real-time' },
                      { value: 'daily', label: 'Daily Digest' },
                      { value: 'weekly', label: 'Weekly Summary' },
                    ]}
                  />
                </Form.Item>
              </Form>
            </div>
          </div>
        </Card>

        {/* Account Information Section */}
        <Card title="Account Information" className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-gray-600 text-sm">Member Since</label>
              <p className="font-medium">{userData.joinDate}</p>
            </div>

            <div className="space-y-2">
              <label className="text-gray-600 text-sm">Last Login</label>
              <p className="font-medium">{userData.lastLogin}</p>
            </div>

            <div className="space-y-2">
              <label className="text-gray-600 text-sm">Account Status</label>
              <p className="font-medium text-green-600">Active</p>
            </div>

            <div className="space-y-2">
              <label className="text-gray-600 text-sm">Role</label>
              <p className="font-medium">Administrator</p>
            </div>
          </div>

          <Divider />

          <div className="flex gap-4">
            <Button icon={<LockOutlined />}>Change Password</Button>
            <Button type="dashed">Download My Data</Button>
            <Button danger>Deactivate Account</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MyAccount;