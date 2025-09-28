import type { SelectProps } from "antd";
import { Button, Flex, Select, Space } from "antd";
import React, { FC } from "react";
import { Controller } from "react-hook-form";
import FormLabel from "./FormLabel";
import HelperText from "./HelperText";
import { Icon } from "@iconify/react";

type IProps = {
    control: any;
    name: string;
    rules?: object;
    label?: string;
    labelColor?: string;
    helperText?: string;
    helperTextColor?: string;
    error?: boolean;
    required?: boolean;
    addShow?: boolean;
    disabled?: boolean;
    addClick?: () => void;
    customPrefix?: React.ReactNode;
    customSuffix?: React.ReactNode;
} & Omit<SelectProps, "name">;

const SelectBox: FC<IProps> = ({
    control,
    name,
    rules,
    label,
    labelColor = "black",
    helperText = "",
    helperTextColor = "red",
    error = false,
    required = false,
    addShow = false,
    disabled = false,
    addClick = () => {},
    customPrefix,
    customSuffix,
    ...props
}) => {
    return control ? (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field, fieldState }) => (
                <Flex vertical gap={2} className="w-full">
                    {label && (
                        <FormLabel
                            label={label}
                            error={error || !!fieldState.error}
                            style={{ color: labelColor }}
                            required={required}
                        />
                    )}
                    <Space.Compact className="w-full">
                        {customSuffix}
                        <Select
                            {...field}
                            showSearch
                            optionFilterProp="label"
                            disabled={disabled}
                            className="w-full"
                            {...((error || fieldState.error) && {
                                status: "error",
                            })}
                            {...props}
                            onChange={(value) => field.onChange(value)}
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
                                disabled={disabled}
                                onClick={addClick}
                            />
                        )}
                        {customPrefix}
                    </Space.Compact>

                    {(helperText || fieldState.error) && (
                        <HelperText
                            text={fieldState.error?.message || helperText}
                            error={error || !!fieldState.error}
                            style={{ color: helperTextColor }}
                        />
                    )}
                </Flex>
            )}
        />
    ) : (
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
                <Select
                    showSearch
                    optionFilterProp="label"
                    disabled={disabled}
                    className="w-full"
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
                        disabled={disabled}
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

export default SelectBox;
