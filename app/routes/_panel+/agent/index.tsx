import { Collapse, Input, Button, Radio, Space, Select, Card } from 'antd';
import { CopyOutlined, UpOutlined, ThunderboltOutlined, MessageOutlined, AudioOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { Panel } = Collapse;
const { TextArea } = Input;

const CollapsibleSettings = () => {
  const [mode, setMode] = useState('chat');
  const [theme, setTheme] = useState('dark');
  const [position, setPosition] = useState('bottom-right');
  const [borderRadius, setBorderRadius] = useState('large');
  const [size, setSize] = useState('full');
  const [bgColor, setBgColor] = useState('#000000');
  const [accentColor, setAccentColor] = useState('#14B8A6');
  const [buttonColor, setButtonColor] = useState('#000000');
  const [textColor, setTextColor] = useState('#FFFFFF');

  const embedCode = `<script widget
  assistant-id="asst-2M-51T-eeb"-a8b52-aa5d4a8842b"
  assistant-id="1cecede-fbb8-4fc8-9081-dc839386df7e"
  mode="chat"
  title=""
  theme-color="#000000"
  accent-color="#14B8A6">
</script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
  };

  return (
    <div style={{ 
      minHeight: '100vh'
    }}>
      <div >
        <Collapse 
        bordered={false}
          defaultActiveKey={['1', '2', '3', '4']}
          expandIconPosition="end"
          style={{ 
            backgroundColor: 'transparent',
          }}
        >
          {/* Widget Embed Section */}
          <Panel 
            header={
              <Space>
                <ThunderboltOutlined style={{ color: '#1890ff' }} />
                <span style={{ fontWeight: 500 }}>Widget Embed</span>
              </Space>
            }
            key="1"
            style={{
              backgroundColor: '#fff',
              marginBottom: '16px',
              borderRadius: '2px',
            }}
          >
            <div>
              <div style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
                  Add the following snippet to the pages where you want the conversation widget to be.
                </div>
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px', fontWeight: 500 }}>
                  Embed Code
                </div>
              </div>
              
              <div style={{ position: 'relative' }}>
                <TextArea
                  value={embedCode}
                  readOnly
                  autoSize={{ minRows: 6, maxRows: 6 }}
                  style={{
                    backgroundColor: '#f5f5f5',
                    fontFamily: 'monospace',
                    fontSize: '11px',
                    resize: 'none',
                  }}
                />
                <Button
                  type="link"
                  icon={<CopyOutlined />}
                  onClick={handleCopy}
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    color: '#1890ff',
                    fontSize: '12px',
                  }}
                >
                  Copy
                </Button>
              </div>
            </div>
          </Panel>

          {/* Mode Section */}
          <Panel 
            header={
              <Space>
                <ThunderboltOutlined style={{ color: '#1890ff' }} />
                <span style={{ fontWeight: 500 }}>Mode</span>
              </Space>
            }
            key="2"
            style={{
              backgroundColor: '#fff',
              marginBottom: '16px',
              borderRadius: '2px',
            }}
          >
            <div>
              <div style={{ fontSize: '12px', color: '#666', marginBottom: '16px' }}>
                Configure what mode will this widget support
              </div>
              
              <Space size={16} style={{ width: '100%' }}>
                <Card
                  hoverable
                  onClick={() => setMode('chat')}
                  onKeyDown={(e) => e.key === 'Enter' && setMode('chat')}
                  tabIndex={0}
                  role="button"
                  aria-pressed={mode === 'chat'}
                  style={{
                    flex: 1,
                    backgroundColor: mode === 'chat' ? '#e6f7ff' : '#fff',
                    border: `2px solid ${mode === 'chat' ? '#1890ff' : '#d9d9d9'}`,
                    cursor: 'pointer',
                  }}
                  bodyStyle={{ padding: '16px' }}
                >
                  <Space direction="vertical" size={4}>
                    <Space>
                      <MessageOutlined style={{ fontSize: '16px', color: '#1890ff' }} />
                      <span style={{ fontWeight: 500 }}>Chat</span>
                    </Space>
                    <div style={{ fontSize: '11px', color: '#666' }}>
                      Users will text with the widget
                    </div>
                  </Space>
                </Card>

                <Card
                  hoverable
                  onClick={() => setMode('voice')}
                  onKeyDown={(e) => e.key === 'Enter' && setMode('voice')}
                  tabIndex={0}
                  role="button"
                  aria-pressed={mode === 'voice'}
                  style={{
                    flex: 1,
                    backgroundColor: mode === 'voice' ? '#e6f7ff' : '#fff',
                    border: `2px solid ${mode === 'voice' ? '#1890ff' : '#d9d9d9'}`,
                    cursor: 'pointer',
                  }}
                  bodyStyle={{ padding: '16px' }}
                >
                  <Space direction="vertical" size={4}>
                    <Space>
                      <AudioOutlined style={{ fontSize: '16px', color: '#1890ff' }} />
                      <span style={{ fontWeight: 500 }}>Voice</span>
                    </Space>
                    <div style={{ fontSize: '11px', color: '#666' }}>
                      Users will speak with the widget
                    </div>
                  </Space>
                </Card>
              </Space>
            </div>
          </Panel>

          {/* Appearance Section */}
          <Panel 
            header={
              <Space>
                <ThunderboltOutlined style={{ color: '#1890ff' }} />
                <span style={{ fontWeight: 500 }}>Appearance</span>
              </Space>
            }
            key="3"
            style={{
              backgroundColor: '#fff',
              marginBottom: '16px',
              borderRadius: '2px',
            }}
          >
            <div>
              <div style={{ fontSize: '12px', color: '#666', marginBottom: '16px' }}>
                Customize how the widget looks.
              </div>

              {/* Theme */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '13px', marginBottom: '8px', fontWeight: 500 }}>
                  Theme
                </div>
                <Select
                  value={theme}
                  onChange={setTheme}
                  style={{ width: '100%' }}
                  options={[
                    { value: 'dark', label: '🌙 Dark' },
                    { value: 'light', label: '☀️ Light' },
                  ]}
                />
                <div style={{ fontSize: '11px', color: '#999', marginTop: '4px' }}>
                  Switches theme and automatically adjust CTA button colors
                </div>
              </div>

              {/* Colors */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                <div>
                  <div style={{ fontSize: '13px', marginBottom: '8px', fontWeight: 500 }}>
                    Background Color
                  </div>
                  <Space.Compact style={{ width: '100%' }}>
                    <input
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      style={{ width: '40px', height: '32px', border: '1px solid #d9d9d9', cursor: 'pointer', borderRadius: '4px 0 0 4px' }}
                    />
                    <Input
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      style={{ flex: 1 }}
                    />
                  </Space.Compact>
                </div>

                <div>
                  <div style={{ fontSize: '13px', marginBottom: '8px', fontWeight: 500 }}>
                    Accent Color
                  </div>
                  <Space.Compact style={{ width: '100%' }}>
                    <input
                      type="color"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      style={{ width: '40px', height: '32px', border: '1px solid #d9d9d9', cursor: 'pointer', borderRadius: '4px 0 0 4px' }}
                    />
                    <Input
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      style={{ flex: 1 }}
                    />
                  </Space.Compact>
                </div>

                <div>
                  <div style={{ fontSize: '13px', marginBottom: '8px', fontWeight: 500 }}>
                    CTA Button Color
                  </div>
                  <Space.Compact style={{ width: '100%' }}>
                    <input
                      type="color"
                      value={buttonColor}
                      onChange={(e) => setButtonColor(e.target.value)}
                      style={{ width: '40px', height: '32px', border: '1px solid #d9d9d9', cursor: 'pointer', borderRadius: '4px 0 0 4px' }}
                    />
                    <Input
                      value={buttonColor}
                      onChange={(e) => setButtonColor(e.target.value)}
                      style={{ flex: 1 }}
                    />
                  </Space.Compact>
                </div>

                <div>
                  <div style={{ fontSize: '13px', marginBottom: '8px', fontWeight: 500 }}>
                    CTA Text Color
                  </div>
                  <Space.Compact style={{ width: '100%' }}>
                    <input
                      type="color"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      style={{ width: '40px', height: '32px', border: '1px solid #d9d9d9', cursor: 'pointer', borderRadius: '4px 0 0 4px' }}
                    />
                    <Input
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      style={{ flex: 1 }}
                    />
                  </Space.Compact>
                </div>
              </div>
            </div>
          </Panel>

          {/* Layout Section */}
          <Panel 
            header={
              <Space>
                <ThunderboltOutlined style={{ color: '#1890ff' }} />
                <span style={{ fontWeight: 500 }}>Layout</span>
              </Space>
            }
            key="4"
            style={{
              backgroundColor: '#fff',
              borderRadius: '2px',
            }}
          >
            <div>
              {/* Position */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '13px', marginBottom: '8px', fontWeight: 500 }}>
                  Position
                </div>
                <Select
                  value={position}
                  onChange={setPosition}
                  style={{ width: '100%' }}
                  options={[
                    { value: 'bottom-right', label: 'Bottom Right' },
                    { value: 'bottom-left', label: 'Bottom Left' },
                    { value: 'top-right', label: 'Top Right' },
                    { value: 'top-left', label: 'Top Left' },
                  ]}
                />
              </div>

              {/* Border Radius */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '13px', marginBottom: '8px', fontWeight: 500 }}>
                  Border Radius
                </div>
                <Radio.Group 
                  value={borderRadius} 
                  onChange={(e) => setBorderRadius(e.target.value)}
                  style={{ width: '100%' }}
                >
                  <Space style={{ width: '100%' }} size={8}>
                    {['none', 'small', 'medium', 'large'].map((radius) => (
                      <Radio.Button 
                        key={radius} 
                        value={radius}
                        style={{ 
                          flex: 1, 
                          textAlign: 'center',
                          textTransform: 'capitalize'
                        }}
                      >
                        <div>
                          <div style={{ fontSize: '16px', marginBottom: '4px' }}>
                            {radius === 'none' && '⬜'}
                            {radius === 'small' && '▢'}
                            {radius === 'medium' && '◻'}
                            {radius === 'large' && '◯'}
                          </div>
                          {radius}
                        </div>
                      </Radio.Button>
                    ))}
                  </Space>
                </Radio.Group>
              </div>

              {/* Size */}
              <div>
                <div style={{ fontSize: '13px', marginBottom: '8px', fontWeight: 500 }}>
                  Size
                </div>
                <div style={{ fontSize: '11px', color: '#999', marginBottom: '8px' }}>
                  Height, max-width needs to follow mode. Chat and Hybrid modes will use Compact size instead.
                </div>
                <Radio.Group 
                  value={size} 
                  onChange={(e) => setSize(e.target.value)}
                  style={{ width: '100%' }}
                >
                  <Space style={{ width: '100%' }} size={8}>
                    {['tiny', 'compact', 'full'].map((sizeOption) => (
                      <Radio.Button 
                        key={sizeOption} 
                        value={sizeOption}
                        style={{ 
                          flex: 1, 
                          textAlign: 'center',
                          textTransform: 'capitalize'
                        }}
                      >
                        {sizeOption}
                      </Radio.Button>
                    ))}
                  </Space>
                </Radio.Group>
              </div>
            </div>
          </Panel>
        </Collapse>
      </div>
    </div>
  );
};

export default CollapsibleSettings;