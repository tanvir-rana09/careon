import { Icon } from "@iconify/react";
import type { TreeSelectProps } from "antd";
import { Button, Flex, Space, TreeSelect } from "antd";
import React from "react";
import FormLabel from "./FormLabel";
import HelperText from "./HelperText";

type IProps = {
    label?: string;
    labelColor?: string;
    helperText?: string;
    helperTextColor?: string;
    error?: boolean;
    required?: boolean;
    addShow?: boolean;
    addClick?: () => void;
    customPrefix?: React.ReactNode;
    customSuffix?: React.ReactNode;
} & TreeSelectProps;

const TreeBox: React.FC<IProps> = ({
    label,
    labelColor = "black",
    helperText,
    helperTextColor = "red",
    error = false,
    required = false,
    addShow = false,
    addClick = () => {},
    customPrefix,
    customSuffix,
    ...props
}) => {
    return (
        <Flex vertical gap={2} className="w-full">
            {label && (
                <FormLabel
                    label={label}
                    error={error}
                    style={{ color: labelColor }}
                    required={required}
                />
            )}

            <Space.Compact className="w-full">
                {customSuffix}
                <TreeSelect
                    showSearch
                    className="w-full"
                    dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                    treeDefaultExpandAll
                    {...(error && { status: "error" })}
                    {...props}
                />
                {addShow && (
                    <Button
                        type="primary"
                        icon={
                            <Icon
                                icon="ic:outline-plus"
                                fontSize={22}
                                className="mt-1"
                            />
                        }
                        onClick={addClick}
                    />
                )}
                {customPrefix}
            </Space.Compact>
            {helperText && (
                <HelperText
                    text={helperText}
                    error={error}
                    style={{ color: helperTextColor }}
                />
            )}
        </Flex>
    );
};

export default TreeBox;
