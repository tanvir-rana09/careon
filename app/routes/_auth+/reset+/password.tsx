import { useNavigate } from "@remix-run/react";
import { Button, Typography } from "antd";
import SecretBox from "~/components/ui/SecretBox";
import { FRONTEND_LINKS } from "~/constants/links";

const Password = () => {
    const router = useNavigate();

    return (
        <form className="flex flex-col gap-2">
            <div className="text-center mb-2">
                <Typography.Text className="block !text-xl">
                    Set a new Password
                </Typography.Text>
                <Typography.Text className="block !text-gray-500">
                    Password must have 6 letters
                </Typography.Text>
            </div>
            <SecretBox label="Password" />
            <SecretBox label="Confirm Password" />
            <Button
                type="primary"
                onClick={() => router(FRONTEND_LINKS.auth.login)}
            >
                Reset password
            </Button>
        </form>
    );
};

export default Password;
