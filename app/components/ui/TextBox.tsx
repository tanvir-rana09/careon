import type { InputProps } from "antd";
import { Flex, Input } from "antd";
import React from "react";
import { Control, Controller } from "react-hook-form";
import FormLabel from "./FormLabel";
import HelperText from "./HelperText";

type IProps = {
    control: Control<any>;
    name: string;
    rules?: object;
    label?: string;
    labelColor?: string;
    helperText?: string;
    helperTextColor?: string;
    vertical?: boolean;
    error?: boolean;
    required?: boolean;
} & Omit<InputProps, "name">;

const TextBox: React.FC<IProps> = ({
    control,
    name,
    rules,
    vertical = true,
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
                <Flex vertical={vertical} gap={2}>
                    {label && (
                        <FormLabel
                            label={label}
                            error={error || !!fieldState.error}
                            style={{ color: labelColor }}
                            required={required}
                        />
                    )}
                    <Input
                        {...field}
                        onFocus={(e) => e.target.select()}
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
        <Flex vertical={vertical} gap={2}>
            {label && (
                <FormLabel
                    label={label}
                    error={error}
                    style={{ color: labelColor }}
                    required={required}
                />
            )}
            <Input
                onFocus={(e) => e.target.select()}
                {...(error && { status: "error" })}
                {...props}
            />
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

export default TextBox;
