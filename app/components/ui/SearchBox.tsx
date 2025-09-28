import { Input, InputProps } from "antd";
import { FC } from "react";

type IProps = InputProps;

const SearchBox: FC<IProps> = ({ ...props }) => {
    return (
        <Input
            placeholder="Search..."
            style={{ width: 200 }}
            allowClear
            {...props}
        />
    );
};

export default SearchBox;
