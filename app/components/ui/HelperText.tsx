import { Typography } from "antd";
import { TextProps } from "antd/es/typography/Text";
import { FC } from "react";

type IProps = {
    text: string;
    error?: boolean;
} & TextProps;

const HelperText: FC<IProps> = ({ text = "", error = false, ...props }) => {
    return (
        <Typography.Text
            className="!text-xs block"
            {...(error && { type: "danger" })}
            {...props}
        >
            {text}
        </Typography.Text>
    );
};

export default HelperText;
