import { Avatar, Button, Flex, Popover, Typography } from "antd";
import { Link, useNavigate } from "@remix-run/react";
import Cookies from "js-cookie";
import { FRONTEND_LINKS } from "~/constants/links";
import { images } from "~/constants/themes";
const CompanyLogo = () => {
    const router = useNavigate();
    const logoutHandler = () => {
        Cookies.remove("authToken");
        Cookies.remove("permissions");
        Cookies.remove("tenant_id");
        router(FRONTEND_LINKS.auth.login, { replace: true });
    };
    return (
        <Flex gap={5} className="pr-5" align="center">
           

            <Popover
                content={
                    <Flex vertical gap="small">
                        <Link to="/account">
                            <Button className="w-full">My Account</Button>
                        </Link>
                        <Link to="/account/security">
                            <Button className="w-full">Changed Password</Button>
                        </Link>
                        <Button
                            className="w-full"
                            color="danger"
                            variant="solid"
                            onClick={logoutHandler}
                        >
                            Logout
                        </Button>
                    </Flex>
                }
                title="My Account"
                placement="bottomRight"
            >
                <Flex align="center" gap={5}>
                    <Flex align="end" vertical >
                        <Typography.Text strong className="hidden md:inline-block text-base font-semibold">
                            Admin
                        </Typography.Text>
                        <Typography.Text className="hidden md:inline-block -mt-1">
                            test@gmail.com
                        </Typography.Text>
                    </Flex>
                    <Button
                        variant="filled"
                        shape="circle"
                        color="default"
                        size="large"
                        icon={<Avatar src={images.avatar} />}
                    />
                </Flex>
            </Popover>
        </Flex>
    );
};

export default CompanyLogo;
