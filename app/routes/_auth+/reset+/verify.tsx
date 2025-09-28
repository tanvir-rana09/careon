import { useNavigate } from "@remix-run/react";
import { Button, Typography } from "antd";
import CodeBox from "~/components/ui/CodeBox";
import { FRONTEND_LINKS } from "~/constants/links";

const Verify = () => {
    const router = useNavigate();

    return (
        <form className="flex flex-col gap-2">
            <div className="text-center mb-2">
                <Typography.Text className="block !text-xl">
                    OTP Verification
                </Typography.Text>
                <Typography.Text className="block !text-gray-500">
                    We have sent the OTP code to your email address.
                </Typography.Text>
            </div>

            <CodeBox length={4} />
            <Button
                type="primary"
                onClick={() => router(FRONTEND_LINKS.auth.reset.password)}
            >
                Confirm
            </Button>
        </form>
    );
};

export default Verify;
