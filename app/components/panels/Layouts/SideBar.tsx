import { Layout, Menu, Button } from "antd";
import { useNavigate, useLocation, Link } from "react-router-dom"; // Add this import
import {
    DashboardOutlined,
    RocketOutlined,
    LogoutOutlined,
    HistoryOutlined,
    FileTextOutlined,
    UserOutlined,
    PhoneOutlined,
    SettingOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

const ModernAdminSidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Map menu keys to routes
    const getSelectedKey = () => {
        const path = location.pathname;
        if (path === "/dashboard") return "dashboard";
        if (path === "/system-train") return "system-train";
        if (path === "/transcription-records") return "transcription-records";
        if (path === "/agent") return "agent";
        if (path === "/phone-number") return "phone-number";
        if (path === "/history") return "history";
        if (path === "/settings") return "settings";
        return "dashboard"; // default
    };

    const menuItems = [
        {
            key: "dashboard",
            icon: <DashboardOutlined />,
            label: "Dashboard",
        },
        {
            key: "system-train",
            icon: <RocketOutlined />,
            label: "System Train",
        },
        {
            key: "transcription-records",
            icon: <FileTextOutlined />,
            label: "Transcription Records",
        },
        {
            key: "agent",
            icon: <UserOutlined />,
            label: "Agent",
        },
        {
            key: "phone-number",
            icon: <PhoneOutlined />,
            label: "Phone Numbers",
        },
        {
            key: "history",
            icon: <HistoryOutlined />,
            label: "History",
        },
        {
            key: "settings",
            icon: <SettingOutlined />,
            label: "Settings",
        },
    ];

    const handleMenuClick = ({ key }) => {
        // Navigate to corresponding route
        switch (key) {
            case "dashboard":
                navigate("/dashboard");
                break;
            case "system-train":
                navigate("/system-train");
                break;
            case "transcription-records":
                navigate("/transcription-records");
                break;
            case "agent":
                navigate("/agent");
                break;
            case "phone-number":
                navigate("/phone-number");
                break;
            case "history":
                navigate("/history");
                break;
            case "settings":
                navigate("/settings");
                break;
            default:
                navigate("/dashboard");
        }
    };

    const handleLogout = () => {
        // Add your logout logic here
        console.log("Logout clicked");
        // Example: navigate("/login");
    };

    return (
        <div className="flex h-screen">
            <Sider
                trigger={null}
                width={320}
                className="relative transition-all duration-300 ease-in-out bg-white scrollbar-thin scrollbar-thumb-black scrollbar-track-white"
                style={{
                    background: "white",
                    height: "100vh",
                    overflow: "auto",
                }}
            >
                <div className="h-16 p-1 flex items-center justify-center ">
                    <img className="h-full" src="/images/logo.png" alt="Logo" />
                </div>
                
                <div className="flex-1 overflow-auto">
                    <Menu
                        mode="inline"
                        selectedKeys={[getSelectedKey()]} // Use selectedKeys instead of defaultSelectedKeys
                        items={menuItems}
                        theme="light"
                        onClick={handleMenuClick} // Add click handler
                    />
                </div>

                {/* Logout Button */}
                <div className="p-1 border-t border-gray-200 text-center absolute bottom-0 w-full">
                 Copyright &copy; 2025 CareOn V 2.1 <br />
                 Product by <Link to={'https://www.hsblco.com'} target="_blank" rel="noopener noreferrer">HSBLCO LLC</Link>
                </div>
            </Sider>
        </div>
    );
};

export default ModernAdminSidebar;