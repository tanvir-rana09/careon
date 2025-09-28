import { Typography } from "antd";
import { TextProps } from "antd/es/typography/Text";
import { FC } from "react";

type IProps = {
  label: string;
  error?: boolean;
  required?: boolean;
} & TextProps;

const FormLabel: FC<IProps> = ({
  label,
  error = false,
  required = false,
  ...props
}) => {
  return (
    <Typography.Text
      className="!text-sm font-medium block"
      {...(error && { type: "danger" })}
      {...props}
    >
      {label} {required ? <span className="text-red-500">*</span> : ""}
    </Typography.Text>
  );
};

export default FormLabel;
