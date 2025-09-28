import React, { useEffect, useState } from "react";
import TextBox from "./TextBox";
import useDebounce from "~/hooks/useDebounce";

interface UniqueIdGeneratorProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: boolean;
  helperText?: string;
  label?: string;
  required?: boolean;
}

const UniqueIdGenerator: React.FC<UniqueIdGeneratorProps> = ({
  value,
  onChange,
  onBlur,
  error = false,
  helperText = "Enter a prefix (e.g. PMK) to generate a unique ID",
  label = "ID (Enter prefix e.g. PMK)",
  required = false,
}) => {
  const [prefix, setPrefix] = useState(value?.split("-")[0] || "");
  const debouncedPrefix = useDebounce(prefix, 1000);

  // Generate unique ID whenever the debounced prefix changes
  useEffect(() => {
    if (debouncedPrefix) {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      // Format: PREFIX-YYYYMMDD-HHMMSS
      const uniqueId = `${debouncedPrefix}-${year}${month}${day}-${hours}${minutes}${seconds}`;
      onChange(uniqueId.toUpperCase());
    }
  }, [debouncedPrefix, onChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPrefix = e.target.value;
    setPrefix(newPrefix);
    if (!newPrefix) {
      onChange("");
    }
  };

  return (
    <TextBox
      label={label}
      onChange={handleChange}
      onBlur={onBlur}
      // Show prefix in input field for better UX
      value={prefix}
      error={error}
      helperText={helperText}
      required={required}
      addonAfter={
        value && value !== prefix ? (
          <span className="text-xs text-gray-500">{value}</span>
        ) : null
      }
    />
  );
};

export default UniqueIdGenerator;
