import { Flex, Input } from "antd";
import { TextAreaProps } from "antd/es/input";
import React from "react";
import { Controller, Control, RegisterOptions } from "react-hook-form";
import FormLabel from "./FormLabel";
import HelperText from "./HelperText";

const { TextArea } = Input;

type IProps = {
  name: string;
  control: Control<any>; // react-hook-form control
  rules?: RegisterOptions;
  label?: string;
  labelColor?: string;
  helperText?: string;
  helperTextColor?: string;
  vertical?: boolean;
  error?: boolean;
} & TextAreaProps;

const TextAreaBox: React.FC<IProps> = ({
  name,
  control,
  rules,
  vertical = true,
  label,
  labelColor = "black",
  helperText,
  helperTextColor = "red",
  error = false,
  ...props
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <Flex vertical={vertical} gap={2}>
          {label && (
            <FormLabel
              label={label}
              error={!!fieldState.error || error}
              style={{ color: labelColor }}
            />
          )}
          <TextArea
            rows={4}
            {...field}
            {...props}
            status={fieldState.error || error ? "error" : ""}
          />
          {helperText && (
            <HelperText
              text={helperText}
              error={!!fieldState.error || error}
              style={{ color: helperTextColor }}
            />
          )}
        </Flex>
      )}
    />
  );
};

export default TextAreaBox;
