import { Flex, Radio } from "antd";
import HelperText from "./HelperText";
import { FC } from "react";
import FormLabel from "./FormLabel";
import type { RadioProps } from "antd";

type IProps = {
  label?: string;
  labelColor?: string;
  helperText?: string;
  helperTextColor?: string;
  vertical?: boolean;
  error?: boolean;
  required?: boolean;
} & RadioProps;

const RadioBox: FC<IProps> = ({
  label,
  labelColor,
  helperText,
  helperTextColor,
  error,
  required,
  ...props
}) => {
  return (
    <Flex gap={2}>
      {label && (
        <FormLabel
          label={label}
          error={error}
          style={{ color: labelColor }}
          required={required}
        />
      )}
      {/* <Input
        onFocus={(e) => e.target.select()}
        {...(error && { status: "error" })}
        {...props}
      /> */}

      <Radio.Group
        {...props}
        options={[
          { value: 1, label: "Option A" },
          { value: 2, label: "Option B" },
          { value: 3, label: "Option C" },
        ]}
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

export default RadioBox;
