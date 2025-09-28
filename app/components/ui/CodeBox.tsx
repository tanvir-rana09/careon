import { Flex, Input } from "antd";
import { OTPProps } from "antd/es/input/OTP";
import { FC } from "react";
import FormLabel from "./FormLabel";
import HelperText from "./HelperText";

type IProps = {
    label?: string;
    helperText?: string;
} & OTPProps;

const CodeBox: FC<IProps> = ({ label = "", helperText, ...props }) => {
    return (
        <Flex vertical gap={2}>
            {label && <FormLabel label={label} />}
            <Input.OTP {...props} />
            {helperText && <HelperText text={helperText} />}
        </Flex>
    );
};

export default CodeBox;
