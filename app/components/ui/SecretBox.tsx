import type { InputProps } from "antd";
import { Flex, Input } from "antd";
import React from "react";
import { Controller } from "react-hook-form";
import FormLabel from "./FormLabel";
import HelperText from "./HelperText";

type IProps = {
    control: any;
    name: string;
    rules?: any;
    label?: string;
    labelColor?: string;
    helperText?: string;
    helperTextColor?: string;
    error?: boolean;
    required?: boolean;
} & Omit<InputProps, "name">;

const SecretBox: React.FC<IProps> = ({
    control,
    name,
    rules,
    label,
    labelColor = "black",
    helperText = "",
    helperTextColor = "red",
    error = false,
    required = false,
    ...props
}) => {
    return control ? (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field, fieldState }) => (
                <Flex vertical gap={2}>
                    {label && (
                        <FormLabel
                            label={label}
                            error={error || !!fieldState.error}
                            style={{ color: labelColor }}
                            required={required}
                        />
                    )}
                    <Input.Password
                        {...field}
                        {...((error || fieldState.error) && {
                            status: "error",
                        })}
                        {...props}
                    />
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
        <Flex vertical gap={2}>
            {label && (
                <FormLabel
                    label={label}
                    error={error}
                    style={{ color: labelColor }}
                    required={required}
                />
            )}
            <Input.Password {...(error && { status: "error" })} {...props} />
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

export default SecretBox;
