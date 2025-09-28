import { Checkbox, CheckboxProps } from "antd";
import { FC } from "react";

type IProps = {
    label?: string;
} & CheckboxProps;

const CheckBox: FC<IProps> = ({ label = "", ...props }) => {
    if (label) {
        return <Checkbox {...props}>{label}</Checkbox>;
    }

    return <Checkbox {...props} />;
};

export default CheckBox;
