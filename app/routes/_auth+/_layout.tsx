import { Outlet } from "@remix-run/react";
import { Card, Typography } from "antd";

const AuthLayout = () => {
    return (
        <div className="w-full min-h-screen bg-no-repeat bg-cover bg-center" >
            <div className="w-full min-h-screen p-6 md:p-8 flex flex-col items-center justify-center bg-gray-100">
                <Card className="w-full max-w-md md:max-w-lg">
                    <div className="mb-6 text-center">
                        <div>
                            <img
                                src="/public/images/logo.png"
                                alt="Careon Logo"
                                className="mx-auto mb-4 h-12 md:h-16"
                            />
                        </div>
                        <Typography.Text className="!text-base md:!text-xl block mb-1">
                            Welcome to Careon Dashboard
                        </Typography.Text>
                        <Typography.Text className="!text-sm md:!text-base">
                            Please sign in to continue
                        </Typography.Text>
                    </div>
                    <Outlet />
                </Card>
            </div>
        </div>
    );
};

export default AuthLayout;
