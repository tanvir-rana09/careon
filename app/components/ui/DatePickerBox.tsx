import type { DatePickerProps } from "antd";
import { DatePicker, Flex } from "antd";
import { FC } from "react";
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
} & Omit<DatePickerProps, "name">;

const DatePickerBox: FC<IProps> = ({
  control,
  name,
  rules,
  label = "",
  labelColor = "black",
  helperText = "",
  helperTextColor = "red",
  error = false,
  required = false,
  ...props
}) => {
  return (
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
          <DatePicker
            {...field}
            {...((error || fieldState.error) && { status: "error" })}
            {...props}
            onChange={(date, dateString) => field.onChange(dateString)}
            value={field.value ? (field.value as any) : null}
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
  );
};

export default DatePickerBox;
