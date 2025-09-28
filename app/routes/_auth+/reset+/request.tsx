import { Icon } from "@iconify/react";
import { Link, useNavigate } from "@remix-run/react";
import { Button, Typography } from "antd";
import TextBox from "~/components/ui/TextBox";
import { FRONTEND_LINKS } from "~/constants/links";

const Request = () => {
    const router = useNavigate();

    return (
        <form className="flex flex-col gap-2">
            <div className="text-center mb-2">
                <Typography.Text className="block !text-xl">
                    Forgot Password?
                </Typography.Text>
                <Typography.Text className="block !text-gray-500">
                    No worries, we will send you reset instructions.
                </Typography.Text>
            </div>
            <TextBox label="User ID / Email / Phone" />
            <Button
                type="primary"
                onClick={() => router(FRONTEND_LINKS.auth.reset.verify)}
                className="mb-1"
            >
                Reset password
            </Button>
            <div className="text-center">
                <Link to="/login" className="inline-flex">
                    <Icon icon="si:arrow-left-duotone" fontSize={22} />
                    Back to log in
                </Link>
            </div>
        </form>
    );
};

export default Request;
